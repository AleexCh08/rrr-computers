import { FiDollarSign, FiShoppingBag, FiInbox, FiAlertTriangle, FiArrowUpRight, FiClock } from 'react-icons/fi';
import AdminNavbar from '../../components/admin/AdminNavbar';

export default function AdminDashboard() {
  // Datos simulados para el gráfico de barras
  const chartData = [
    { month: 'Ene', value: 40 },
    { month: 'Feb', value: 65 },
    { month: 'Mar', value: 55 },
    { month: 'Abr', value: 80 },
    { month: 'May', value: 95 },
    { month: 'Jun', value: 70 },
    { month: 'Jul', value: 100 },
  ];

  // Datos simulados para la actividad reciente
  const recentActivity = [
    { id: 1, type: 'Orden', text: 'Nueva orden #1026 recibida', time: 'Hace 10 min' },
    { id: 2, type: 'Donación', text: 'Donación de Monitor Dell aprobada', time: 'Hace 2 horas' },
    { id: 3, type: 'Inventario', text: 'Stock crítico: Nvidia 2060 (0 unidades)', time: 'Hace 4 horas' },
    { id: 4, type: 'Orden', text: 'Orden #1024 marcada como Enviada', time: 'Ayer' },
  ];

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AdminNavbar />

      <main style={{ flexGrow: 1, padding: '40px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-dark)', margin: 0 }}>Dashboard</h1>
          <p style={{ color: '#666', marginTop: '5px', fontSize: '1.05rem' }}>Resumen general de RRR Computers</p>
        </div>

        {/* Tarjetas de Métricas (KPIs) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          
          {/* Tarjeta 1 */}
          <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '50%', color: '#4CAF50', display: 'flex' }}>
              <FiDollarSign size={28} />
            </div>
            <div>
              <p style={{ margin: 0, color: '#666', fontSize: '0.95rem', fontWeight: '600' }}>Ingresos del Mes</p>
              <h3 style={{ margin: '5px 0 0 0', fontSize: '1.8rem', color: 'var(--text-dark)' }}>$2,450</h3>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '50%', color: '#1976d2', display: 'flex' }}>
              <FiShoppingBag size={28} />
            </div>
            <div>
              <p style={{ margin: 0, color: '#666', fontSize: '0.95rem', fontWeight: '600' }}>Órdenes Activas</p>
              <h3 style={{ margin: '5px 0 0 0', fontSize: '1.8rem', color: 'var(--text-dark)' }}>12</h3>
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '50%', color: '#f57f17', display: 'flex' }}>
              <FiInbox size={28} />
            </div>
            <div>
              <p style={{ margin: 0, color: '#666', fontSize: '0.95rem', fontWeight: '600' }}>Donaciones Pendientes</p>
              <h3 style={{ margin: '5px 0 0 0', fontSize: '1.8rem', color: 'var(--text-dark)' }}>5</h3>
            </div>
          </div>

          {/* Tarjeta 4 */}
          <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ backgroundColor: '#fde0e3', padding: '15px', borderRadius: '50%', color: '#d32f2f', display: 'flex' }}>
              <FiAlertTriangle size={28} />
            </div>
            <div>
              <p style={{ margin: 0, color: '#666', fontSize: '0.95rem', fontWeight: '600' }}>Alertas de Stock</p>
              <h3 style={{ margin: '5px 0 0 0', fontSize: '1.8rem', color: 'var(--text-dark)' }}>3</h3>
            </div>
          </div>

        </div>

        {/* Sección de Gráfico y Actividad */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          
          {/* Gráfico Simulado */}
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--text-dark)', margin: 0 }}>Resumen de Ingresos</h2>
              <span style={{ color: '#4CAF50', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}><FiArrowUpRight /> +15%</span>
            </div>
            
            {/* Contenedor de barras CSS */}
            <div style={{ height: '250px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: '20px', borderBottom: '1px solid #eee' }}>
              {chartData.map((data, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40px' }}>
                  <div style={{ 
                    height: `${(data.value / 100) * 200}px`, 
                    width: '100%', 
                    backgroundColor: 'var(--primary-dark)', 
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.3s ease'
                  }}></div>
                  <span style={{ marginTop: '10px', fontSize: '0.85rem', color: '#666', fontWeight: '600' }}>{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actividad Reciente */}
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--text-dark)', margin: 0, marginBottom: '25px' }}>Actividad Reciente</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {recentActivity.map((activity) => (
                <div key={activity.id} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', borderBottom: '1px solid #f0f0f0', paddingBottom: '15px' }}>
                  <div style={{ marginTop: '3px', color: '#888' }}>
                    <FiClock size={18} />
                  </div>
                  <div>
                    <p style={{ margin: 0, color: 'var(--text-dark)', fontWeight: '500', fontSize: '0.95rem' }}>{activity.text}</p>
                    <span style={{ fontSize: '0.8rem', color: '#999', fontWeight: '600' }}>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button style={{ width: '100%', marginTop: '15px', padding: '10px', background: 'transparent', border: '1px solid #ddd', borderRadius: '4px', color: '#5A7D9A', fontWeight: '600', cursor: 'pointer' }}>
              Ver todo
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}