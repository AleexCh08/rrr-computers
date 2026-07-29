import { useState, useEffect } from 'react';
import { FiDollarSign, FiShoppingBag, FiInbox, FiAlertTriangle, FiArrowUpRight, FiClock, FiMail } from 'react-icons/fi';
import AdminNavbar from '../../components/admin/AdminNavbar';
import Modal from '../../components/ui/Modal';
import api from '../../services/api';

export default function AdminDashboard() {
  const [pendingDonations, setPendingDonations] = useState(0);
  const [stockAlerts, setStockAlerts] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [totalMessages, setTotalMessages] = useState(0);
  const [activeOrders, setActiveOrders] = useState(0); 
  const [showActivityModal, setShowActivityModal] = useState(false);
  
  // NUEVO: Estados dinámicos para el dinero y el gráfico
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [dynamicChart, setDynamicChart] = useState([]);

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      // 1. Arquitectura a prueba de fallos: Variables independientes
      let fetchedDonations = [], fetchedInventory = [], fetchedReturns = [], fetchedOrders = [], fetchedUsers = [], fetchedMessages = [];

      // Si una falla, las demás siguen funcionando
      try { const res = await api.get('inventario/donaciones/'); fetchedDonations = res.data; } catch(e) { console.warn("Error donaciones"); }
      try { const res = await api.get('inventario/componentes/'); fetchedInventory = res.data; } catch(e) { console.warn("Error inventario"); }
      try { const res = await api.get('devoluciones/'); fetchedReturns = res.data; } catch(e) { console.warn("Error devoluciones"); }
      try { const res = await api.get('ordenes/'); fetchedOrders = res.data; } catch(e) { console.warn("Error órdenes"); }
      try { const res = await api.get('usuarios/admin-users/'); fetchedUsers = res.data; } catch(e) { console.warn("Error usuarios"); }
      try { const res = await api.get('usuarios/admin-mensajes/'); fetchedMessages = res.data; } catch(e) { console.warn("Error mensajes"); }

      // 2. Asignación de KPIs básicos
      setPendingDonations(fetchedDonations.filter(d => d.status === 'Pendiente').length);
      setStockAlerts(fetchedInventory.filter(comp => comp.stock <= 5).length);
      setTotalMessages(fetchedMessages.filter(m => !m.is_read).length);
      setActiveOrders(fetchedOrders.filter(o => o.status !== 'Entregado' && o.status !== 'Cancelado').length);

      // 3. NUEVO: Cálculo Dinámico de Ingresos del Mes Actual
      const now = new Date();
      const currentMonthOrders = fetchedOrders.filter(o => {
        const oDate = new Date(o.created_at);
        return o.status !== 'Cancelado' && oDate.getMonth() === now.getMonth() && oDate.getFullYear() === now.getFullYear();
      });
      const monthTotal = currentMonthOrders.reduce((acc, order) => acc + parseFloat(order.total), 0);
      setMonthlyIncome(monthTotal);

      // 4. NUEVO: Lógica del Gráfico (Últimos 7 meses)
      const monthsLabel = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const chartData = [];
      
      // Construimos el esqueleto de los últimos 7 meses hacia atrás
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        chartData.push({ monthIndex: d.getMonth(), year: d.getFullYear(), label: monthsLabel[d.getMonth()], value: 0 });
      }

      // Sumamos el dinero de las órdenes en su mes correspondiente
      fetchedOrders.forEach(o => {
        if (o.status !== 'Cancelado') {
          const od = new Date(o.created_at);
          const target = chartData.find(c => c.monthIndex === od.getMonth() && c.year === od.getFullYear());
          if (target) target.value += parseFloat(o.total);
        }
      });
      
      // Calculamos la barra más alta para que la altura en CSS sea proporcional (Máx 200px)
      const maxVal = Math.max(...chartData.map(c => c.value), 100); 
      const finalChart = chartData.map(c => ({
        month: c.label,
        rawValue: c.value,
        height: (c.value / maxVal) * 200 
      }));
      setDynamicChart(finalChart);

      // 5. Actividad Reciente Unificada
      const acts = [];
      fetchedDonations.forEach(d => acts.push({ id: `don-${d.id}`, text: `Donación: ${d.item_name} (${d.status})`, time: d.created_at.split('T')[0], timestamp: new Date(d.created_at).getTime() }));
      fetchedReturns.forEach(r => acts.push({ id: `ret-${r.id}`, text: `Devolución: DEV-00${r.id} (${r.status})`, time: r.created_at.split('T')[0], timestamp: new Date(r.created_at).getTime() }));
      fetchedUsers.forEach(u => acts.push({ id: `usr-${u.id}`, text: `Nuevo usuario: ${u.first_name || u.username}`, time: u.date_joined ? u.date_joined.split('T')[0] : 'Reciente', timestamp: u.date_joined ? new Date(u.date_joined).getTime() : Date.now() }));
      fetchedMessages.forEach(m => acts.push({ id: `msg-${m.id}`, text: `Mensaje de ${m.name}`, time: m.created_at.split('T')[0], timestamp: new Date(m.created_at).getTime() }));
      fetchedOrders.forEach(o => acts.push({ id: `ord-${o.id}`, text: `Orden de ${o.client_name} ($${o.total})`, time: o.created_at.split('T')[0], timestamp: new Date(o.created_at).getTime() }));

      setRecentActivity(acts.sort((a, b) => b.timestamp - a.timestamp).slice(0, 20));
    };

    fetchDashboardMetrics();
  }, []);

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AdminNavbar />

      <main style={{ flexGrow: 1, padding: '40px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-dark)', margin: 0 }}>Dashboard</h1>
          <p style={{ color: '#666', marginTop: '5px', fontSize: '1.05rem' }}>Resumen general de RRR Computers</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          
          <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '50%', color: '#4CAF50', display: 'flex' }}>
              <FiDollarSign size={28} />
            </div>
            <div>
              <p style={{ margin: 0, color: '#666', fontSize: '0.95rem', fontWeight: '600' }}>Ingresos del Mes</p>
              {/* ACTUALIZADO: Muestra el dinero real calculado */}
              <h3 style={{ margin: '5px 0 0 0', fontSize: '1.8rem', color: 'var(--text-dark)' }}>
                ${monthlyIncome.toFixed(2)}
              </h3>
            </div>
          </div>

          <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '50%', color: '#1976d2', display: 'flex' }}>
              <FiShoppingBag size={28} />
            </div>
            <div>
              <p style={{ margin: 0, color: '#666', fontSize: '0.95rem', fontWeight: '600' }}>Órdenes Activas</p>
              <h3 style={{ margin: '5px 0 0 0', fontSize: '1.8rem', color: 'var(--text-dark)' }}>{activeOrders}</h3>
            </div>
          </div>

          <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '50%', color: '#f57f17', display: 'flex' }}>
              <FiInbox size={28} />
            </div>
            <div>
              <p style={{ margin: 0, color: '#666', fontSize: '0.95rem', fontWeight: '600' }}>Donaciones Pendientes</p>
              <h3 style={{ margin: '5px 0 0 0', fontSize: '1.8rem', color: 'var(--text-dark)' }}>{pendingDonations}</h3>
            </div>
          </div>

          <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ backgroundColor: '#fde0e3', padding: '15px', borderRadius: '50%', color: '#d32f2f', display: 'flex' }}>
              <FiAlertTriangle size={28} />
            </div>
            <div>
              <p style={{ margin: 0, color: '#666', fontSize: '0.95rem', fontWeight: '600' }}>Alertas de Stock</p>
              <h3 style={{ margin: '5px 0 0 0', fontSize: '1.8rem', color: 'var(--text-dark)' }}>{stockAlerts}</h3>
            </div>
          </div>

          <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ backgroundColor: '#e2d9f3', padding: '15px', borderRadius: '50%', color: '#4a148c', display: 'flex' }}>
              <FiMail size={28} />
            </div>
            <div>
              <p style={{ margin: 0, color: '#666', fontSize: '0.95rem', fontWeight: '600' }}>Mensajes Sin Leer</p>
              <h3 style={{ margin: '5px 0 0 0', fontSize: '1.8rem', color: 'var(--text-dark)' }}>{totalMessages}</h3>
            </div>
          </div>

        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          
          {/* ACTUALIZADO: Se eliminaron los divs anidados que dañaban el CSS del gráfico */}
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--text-dark)', margin: 0 }}>Resumen de Ingresos (Últimos 7 meses)</h2>
            </div>
            
            <div style={{ height: '250px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: '20px', borderBottom: '1px solid #eee' }}>
              {dynamicChart.map((data, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40px' }} title={`$${data.rawValue.toFixed(2)}`}>
                  <div style={{ 
                    height: `${data.height}px`, // Altura calculada matemáticamente
                    width: '100%', 
                    backgroundColor: 'var(--primary-dark)', 
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.5s ease-out'
                  }}></div>
                  <span style={{ marginTop: '10px', fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--text-dark)', margin: 0, marginBottom: '25px' }}>Actividad Reciente</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {recentActivity.length === 0 ? (
                <p style={{ color: '#888', textAlign: 'center', fontSize: '0.95rem' }}>No hay actividad para mostrar.</p>
              ) : (
                recentActivity.slice(0, 4).map((activity) => (
                  <div key={activity.id} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', borderBottom: '1px solid #f0f0f0', paddingBottom: '15px' }}>
                    <div style={{ marginTop: '3px', color: '#888' }}>
                      <FiClock size={18} />
                    </div>
                    <div>
                      <p style={{ margin: 0, color: 'var(--text-dark)', fontWeight: '500', fontSize: '0.95rem' }}>{activity.text}</p>
                      <span style={{ fontSize: '0.8rem', color: '#999', fontWeight: '600' }}>{activity.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {recentActivity.length > 4 && (
              <button onClick={() => setShowActivityModal(true)} style={{ display: 'block', margin: '15px auto 0', width: '50%', padding: '10px', background: '#4CAF50', border: '1px solid #ddd', borderRadius: '4px', color: '#ffffff', fontWeight: '600', cursor: 'pointer' }}>
                Ver todo ({recentActivity.length})
              </button>
            )}
          </div>

        </div>
      </main>
      
      <Modal isOpen={showActivityModal} onClose={() => setShowActivityModal(false)} title="Historial de Actividad">
        <p style={{ textAlign: 'center', color: '#888', fontSize: '0.85rem', margin: '-20px 0 20px 0' }}>
          (Últimos 20 movimientos)
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '60vh', overflowY: 'auto', paddingRight: '10px' }}>
          {recentActivity.map((activity) => (
            <div key={`modal-${activity.id}`} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', borderBottom: '1px solid #f0f0f0', paddingBottom: '15px' }}>
              <div style={{ marginTop: '3px', color: '#888' }}>
                <FiClock size={18} />
              </div>
              <div>
                <p style={{ margin: 0, color: 'var(--text-dark)', fontWeight: '500', fontSize: '1rem' }}>{activity.text}</p>
                <span style={{ fontSize: '0.85rem', color: '#999', fontWeight: '600' }}>{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}