import { useState, useEffect } from 'react';
import { FiSearch, FiEye, FiEdit, FiXCircle } from 'react-icons/fi';
import AdminNavbar from '../../components/admin/AdminNavbar';
import api from '../../services/api';

export default function AdminOrders() {
  const [alertMessage, setAlertMessage] = useState(null);
  const [orders, setOrders] = useState([]);

  const triggerAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await api.get('ordenes/');
        setOrders(response.data);
      } catch (error) {
        console.error("Error al cargar las órdenes del sistema:", error);
      }
    };
    fetchAllOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Procesando': return { bg: '#fff3cd', color: '#856404' }; 
      case 'Ensamblando': return { bg: '#cce5ff', color: '#004085' }; 
      case 'Enviado': return { bg: '#e2d9f3', color: '#4a148c' }; 
      case 'Entregado': return { bg: '#d4edda', color: '#155724' }; 
      case 'Cancelado': return { bg: '#f8d7da', color: '#721c24' }; 
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

          <div style={{ border: '1px solid #eaeaea', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 120px 2fr 1fr 150px 150px', backgroundColor: '#5A7D9A', color: 'white', fontWeight: '600', padding: '15px', textAlign: 'center' }}>
              <div>ID</div>
              <div>Fecha</div>
              <div style={{ textAlign: 'left', paddingLeft: '10px' }}>Cliente</div>
              <div>Total</div>
              <div>Estado</div>
              <div>Acciones</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {orders.length === 0 ? (
                <div style={{ padding: '30px', textAlign: 'center', color: '#666' }}>No hay órdenes registradas en el sistema.</div>
              ) : (
                orders.map((order, index) => {
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
                      {/* ACTUALIZADO: Parseo de la fecha real de la BD */}
                      <div style={{ color: '#666', fontSize: '0.9rem' }}>{new Date(order.created_at).toLocaleDateString()}</div>
                      {/* ACTUALIZADO: Uso de client_name del modelo de Django */}
                      <div style={{ textAlign: 'left', paddingLeft: '10px', fontWeight: '500', color: '#333' }}>{order.client_name}</div>
                      <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>${order.total}</div>
                      
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
                })
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}