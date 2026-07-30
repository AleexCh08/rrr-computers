import { useState, useEffect } from 'react';
import { FiSearch, FiEye, FiEdit, FiXCircle } from 'react-icons/fi';
import AdminNavbar from '../../components/admin/AdminNavbar';
import Modal from '../../components/ui/Modal';
import api from '../../services/api';

export default function AdminOrders() {
  const [alertMessage, setAlertMessage] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

  const triggerAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await api.get(`ordenes/?page=${currentPage}&search=${activeSearch}`);
        setOrders(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10));
      } catch (error) {
        console.error("Error al cargar las órdenes del sistema:", error);
      }
    };
    fetchAllOrders();
  }, [currentPage, activeSearch]);

  const handleSearch = () => {
    setCurrentPage(1); 
    setActiveSearch(searchInput);
  };

  const handleStatusChange = async (id, statusToUpdate) => {
    try {
      await api.patch(`ordenes/${id}/`, { status: statusToUpdate });
      setOrders(orders.map(order => 
        order.id === id ? { ...order, status: statusToUpdate } : order
      ));
      
      triggerAlert(`Orden #${id} actualizada exitosamente a: ${statusToUpdate}`);
      setShowStatusModal(false); 
    } catch (error) {
      console.error("Error al actualizar la orden:", error);
      triggerAlert("Error de conexión. No se pudo actualizar el estado.");
    }
  };

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
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  style={{ padding: '10px 15px 10px 40px', border: '1px solid #ccc', borderRadius: '4px', width: '280px', fontSize: '1rem' }}
                />
              </div>
              <button onClick={handleSearch} className="btn-primary" style={{ backgroundColor: '#4CAF50', padding: '10px 25px' }}>
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
                      <div style={{ color: '#666', fontSize: '0.9rem' }}>{new Date(order.created_at).toLocaleDateString()}</div>
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
                        <button 
                          onClick={() => { setSelectedOrder(order); setShowViewModal(true); }} 
                          title="Ver Detalles" 
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5A7D9A' }}
                        >
                          <FiEye size={20} />
                        </button>
                        
                        <button 
                          onClick={() => { setSelectedOrder(order); setNewStatus(order.status); setShowStatusModal(true); }} 
                          title="Cambiar Estado" 
                          disabled={order.status === 'Cancelado'}
                          style={{ background: 'none', border: 'none', cursor: order.status === 'Cancelado' ? 'not-allowed' : 'pointer', color: '#4CAF50', opacity: order.status === 'Cancelado' ? 0.4 : 1 }}
                        >
                          <FiEdit size={20} />
                        </button>

                        <button 
                          onClick={() => { 
                            if (window.confirm(`¿Estás seguro de que deseas cancelar la Orden #${order.id}?`)) {
                              handleStatusChange(order.id, 'Cancelado');
                            }
                          }} 
                          title="Cancelar Orden" 
                          disabled={order.status === 'Cancelado' || order.status === 'Entregado'}
                          style={{ background: 'none', border: 'none', cursor: (order.status === 'Cancelado' || order.status === 'Entregado') ? 'not-allowed' : 'pointer', color: '#d9534f', opacity: (order.status === 'Cancelado' || order.status === 'Entregado') ? 0.4 : 1 }}
                        >
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
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            {totalPages > 1 && (
              <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{ padding: '8px 16px', background: currentPage === 1 ? '#f5f5f5' : 'white', border: 'none', borderRight: '1px solid #ddd', color: currentPage === 1 ? '#aaa' : '#4CAF50', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: '600' }}
                >
                  Anterior
                </button>
                
                <div style={{ padding: '8px 16px', background: 'white', borderRight: '1px solid #ddd', color: '#333', fontWeight: 'bold' }}>
                  Página {currentPage} de {totalPages}
                </div>

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  style={{ padding: '8px 16px', background: currentPage === totalPages ? '#f5f5f5' : 'white', border: 'none', color: currentPage === totalPages ? '#aaa' : '#4CAF50', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: '600' }}
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
      </main>

      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title={`Detalles de la Orden #${selectedOrder?.id}`}>
        {selectedOrder && (
          <div style={{ textAlign: 'left', color: '#333', fontSize: '1.05rem', lineHeight: '1.6' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div>
                <p style={{ margin: '0 0 5px 0' }}><strong>Cliente:</strong> {selectedOrder.client_name}</p>
                <p style={{ margin: 0 }}><strong>Fecha:</strong> {new Date(selectedOrder.created_at).toLocaleString()}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  backgroundColor: getStatusStyle(selectedOrder.status).bg, 
                  color: getStatusStyle(selectedOrder.status).color, 
                  padding: '6px 15px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '700',
                  display: 'inline-block'
                }}>
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />
            
            <h4 style={{ margin: '0 0 15px 0', color: 'var(--text-dark)', fontSize: '1.1rem' }}>Artículos Comprados:</h4>
            
            <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', border: '1px solid #eaeaea', maxHeight: '250px', overflowY: 'auto', marginBottom: '20px' }}>
              {selectedOrder.items && selectedOrder.items.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: idx !== selectedOrder.items.length - 1 ? '1px solid #eee' : 'none', paddingBottom: idx !== selectedOrder.items.length - 1 ? '10px' : '0' }}>
                      <div style={{ color: '#444' }}>
                        <strong style={{ color: 'var(--text-dark)' }}>{item.quantity}x</strong> {item.product_name}
                      </div>
                      <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
                        ${parseFloat(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ margin: 0, color: '#888', fontStyle: 'italic', textAlign: 'center' }}>
                  No se encontraron detalles de piezas para esta orden.
                </p>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '15px' }}>
              <span>Total a Pagar:</span>
              <span>${selectedOrder.total}</span>
            </div>
            
          </div>
        )}
      </Modal>

      <Modal isOpen={showStatusModal} onClose={() => setShowStatusModal(false)} title={`Cambiar Estado - Orden #${selectedOrder?.id}`}>
        {selectedOrder && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                Nuevo Estado Logístico:
              </label>
              <select 
                value={newStatus} 
                onChange={(e) => setNewStatus(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem', backgroundColor: '#fff' }}
              >
                <option value="Procesando">Procesando (Pago recibido)</option>
                <option value="Ensamblando">Ensamblando (Preparando equipos)</option>
                <option value="Enviado">Enviado (En camino al cliente)</option>
                <option value="Entregado">Entregado (Finalizado)</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
            
            <button 
              onClick={() => handleStatusChange(selectedOrder.id, newStatus)}
              className="btn-primary"
              style={{ width: '50%', padding: '12px', backgroundColor: '#5A7D9A', fontSize: '1.05rem', display: 'flex', justifyContent: 'center', margin: '0 auto 15px auto' }}
            >
              Guardar Cambios
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}