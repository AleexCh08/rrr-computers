import { useState } from 'react';
import { FiSearch, FiEye, FiEdit, FiXCircle } from 'react-icons/fi';
import AdminNavbar from '../../components/admin/AdminNavbar';

export default function AdminOrders() {
  // Estado para la alerta visual
  const [alertMessage, setAlertMessage] = useState(null);

  const triggerAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  // Datos simulados de órdenes
  const [orders, setOrders] = useState([
    { id: '1026', date: '2026-07-25', client: 'Carlos Pérez', total: 450, status: 'Procesando' },
    { id: '1025', date: '2026-07-24', client: 'Ana Gómez', total: 120, status: 'Ensamblando' },
    { id: '1024', date: '2026-07-22', client: 'Luis Silva', total: 85, status: 'Enviado' },
    { id: '1023', date: '2026-07-20', client: 'María López', total: 210, status: 'Entregado' },
    { id: '1022', date: '2026-07-19', client: 'Javier Roca', total: 60, status: 'Cancelado' },
  ]);

  // Función para determinar el color del badge según el estado logístico
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Procesando': return { bg: '#fff3cd', color: '#856404' }; // Amarillo
      case 'Ensamblando': return { bg: '#cce5ff', color: '#004085' }; // Azul
      case 'Enviado': return { bg: '#e2d9f3', color: '#4a148c' }; // Morado
      case 'Entregado': return { bg: '#d4edda', color: '#155724' }; // Verde
      case 'Cancelado': return { bg: '#f8d7da', color: '#721c24' }; // Rojo
      default: return { bg: '#e2e8f0', color: '#475569' };
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AdminNavbar />

      <main style={{ flexGrow: 1, padding: '40px' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '2rem', color: 'var(--text-dark)', margin: 0 }}>Gestión de Órdenes</h1>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ position: 'relative' }}>
                <FiSearch style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#888' }} />
                <input 
                  type="text" 
                  placeholder="Buscar por ID o cliente" 
                  style={{ padding: '10px 15px 10px 40px', border: '1px solid #ccc', borderRadius: '4px', width: '280px', fontSize: '1rem' }}
                />
              </div>
              <button className="btn-primary" style={{ backgroundColor: '#4CAF50', padding: '10px 25px' }}>
                Buscar
              </button>
            </div>
          </div>

          {/* Alerta Visual */}
          {alertMessage && (
            <div style={{ 
              backgroundColor: '#ebebeb', 
              borderLeft: '5px solid #4CAF50', 
              padding: '12px 20px', 
              marginBottom: '25px', 
              color: '#111', 
              fontWeight: '600',
              fontSize: '1.05rem',
              display: 'inline-block',
              minWidth: '350px'
            }}>
              {alertMessage}
            </div>
          )}

          {/* Tabla de Datos */}
          <div style={{ border: '1px solid #eaeaea', borderRadius: '8px', overflow: 'hidden' }}>
            {/* Encabezado */}
            <div style={{ display: 'grid', gridTemplateColumns: '80px 120px 2fr 1fr 150px 150px', backgroundColor: '#5A7D9A', color: 'white', fontWeight: '600', padding: '15px', textAlign: 'center' }}>
              <div>ID</div>
              <div>Fecha</div>
              <div style={{ textAlign: 'left', paddingLeft: '10px' }}>Cliente</div>
              <div>Total</div>
              <div>Estado</div>
              <div>Acciones</div>
            </div>

            {/* Filas */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {orders.map((order, index) => {
                const statusStyle = getStatusStyle(order.status);
                
                return (
                  <div 
                    key={order.id} 
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '80px 120px 2fr 1fr 150px 150px', 
                      backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white', 
                      padding: '12px 15px', 
                      textAlign: 'center', 
                      alignItems: 'center',
                      borderBottom: '1px solid #eaeaea'
                    }}
                  >
                    <div style={{ fontWeight: '700', color: 'var(--text-dark)' }}>#{order.id}</div>
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>{order.date}</div>
                    <div style={{ textAlign: 'left', paddingLeft: '10px', fontWeight: '500', color: '#333' }}>{order.client}</div>
                    <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>${order.total}</div>
                    
                    {/* Badge de Estado */}
                    <div>
                      <span style={{ 
                        backgroundColor: statusStyle.bg, 
                        color: statusStyle.color, 
                        padding: '5px 12px', 
                        borderRadius: '20px', 
                        fontSize: '0.85rem', 
                        fontWeight: '700' 
                      }}>
                        {order.status}
                      </span>
                    </div>
                    
                    {/* Botones de Acción */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                      <button onClick={() => triggerAlert(`Visualizando detalles de la orden #${order.id}`)} title="Ver Detalles" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5A7D9A' }}>
                        <FiEye size={20} />
                      </button>
                      <button onClick={() => triggerAlert(`Actualizando estado de la orden #${order.id}`)} title="Cambiar Estado" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4CAF50' }}>
                        <FiEdit size={20} />
                      </button>
                      <button onClick={() => triggerAlert(`Orden #${order.id} cancelada`)} title="Cancelar Orden" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d9534f' }}>
                        <FiXCircle size={20} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}