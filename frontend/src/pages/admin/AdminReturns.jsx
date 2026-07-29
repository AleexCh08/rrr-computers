import { useState, useEffect } from 'react';
import { FiSearch, FiEye, FiCheck, FiX } from 'react-icons/fi';
import AdminNavbar from '../../components/admin/AdminNavbar';
import api from '../../services/api';
import Modal from '../../components/ui/Modal';

export default function AdminReturns() {
  const [alertMessage, setAlertMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [returns, setReturns] = useState([]);

  const triggerAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await api.get('devoluciones/');
        setReturns(response.data);
      } catch (error) {
        console.error("Error al cargar devoluciones:", error);
      }
    };
    fetchReturns();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`devoluciones/${id}/`, { status: newStatus });
      setReturns(returns.map(ret => 
        ret.id === id ? { ...ret, status: newStatus } : ret
      ));
      triggerAlert(`Devolución #${id} marcada como ${newStatus}`);
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  // Función para determinar el color del badge
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pendiente': return { bg: '#fff3cd', color: '#856404' }; 
      case 'Aprobado': return { bg: '#cce5ff', color: '#004085' }; 
      case 'Completado': return { bg: '#d4edda', color: '#155724' }; 
      case 'Rechazado': return { bg: '#f8d7da', color: '#721c24' }; 
      default: return { bg: '#e2e8f0', color: '#475569' };
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AdminNavbar />

      <main style={{ flexGrow: 1, padding: '40px' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '2rem', color: 'var(--text-dark)', margin: 0 }}>Gestión de Devoluciones</h1>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ position: 'relative' }}>
                <FiSearch style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#888' }} />
                <input type="text" placeholder="Buscar por ID o cliente" style={{ padding: '10px 15px 10px 40px', border: '1px solid #ccc', borderRadius: '4px', width: '300px', fontSize: '1rem' }} />
              </div>
              <button className="btn-primary" style={{ backgroundColor: '#4CAF50', padding: '10px 25px' }}>Buscar</button>
            </div>
          </div>

          {alertMessage && (
            <div style={{ backgroundColor: '#ebebeb', borderLeft: '5px solid #4CAF50', padding: '12px 20px', marginBottom: '25px', color: '#111', fontWeight: '600', fontSize: '1.05rem', display: 'inline-block' }}>
              {alertMessage}
            </div>
          )}

          <div style={{ border: '1px solid #eaeaea', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 100px 1.5fr 2fr 2fr 120px 120px', backgroundColor: '#5A7D9A', color: 'white', fontWeight: '600', padding: '15px', textAlign: 'center' }}>
              <div>Ticket</div>
              <div>Fecha</div>
              <div style={{ textAlign: 'left', paddingLeft: '10px' }}>Cliente</div>
              <div style={{ textAlign: 'left' }}>Componente</div>
              <div style={{ textAlign: 'left' }}>Falla Reportada</div>
              <div>Estado</div>
              <div>Acciones</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {returns.map((ret, index) => {
                const statusStyle = getStatusStyle(ret.status);
                
                return (
                  <div key={ret.id} style={{ display: 'grid', gridTemplateColumns: '100px 100px 1.5fr 2fr 2fr 120px 120px', backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white', padding: '12px 15px', textAlign: 'center', alignItems: 'center', borderBottom: '1px solid #eaeaea' }}>
                    <div style={{ fontWeight: '700', color: 'var(--text-dark)' }}>DEV-00{ret.id}</div>
                    <div style={{ color: '#666', fontSize: '0.85rem' }}>{ret.created_at.split('T')[0]}</div>
                    <div style={{ textAlign: 'left', paddingLeft: '10px', fontWeight: '500', color: '#333' }}>{ret.client_name}</div>
                    <div style={{ textAlign: 'left', color: '#444', fontSize: '0.95rem' }}>{ret.item_name}</div>
                    <div style={{ textAlign: 'left', color: '#666', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }} title={ret.reason}>
                      {ret.reason}
                    </div>
                    
                    <div>
                      <span style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, padding: '5px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' }}>
                        {ret.status}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button onClick={() => { setSelectedReturn(ret); setShowModal(true); }} title="Ver Detalles" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5A7D9A' }}>
                        <FiEye size={20} />
                      </button>
                      <button 
                        onClick={() => handleStatusChange(ret.id, 'Aprobado')} 
                        disabled={ret.status !== 'Pendiente'}
                        title="Aprobar" 
                        style={{ background: 'none', border: 'none', cursor: ret.status !== 'Pendiente' ? 'not-allowed' : 'pointer', color: '#4CAF50', opacity: ret.status !== 'Pendiente' ? 0.3 : 1 }}
                      >
                        <FiCheck size={20} />
                      </button>
                      <button 
                        onClick={() => handleStatusChange(ret.id, 'Rechazado')} 
                        disabled={ret.status !== 'Pendiente'}
                        title="Rechazar" 
                        style={{ background: 'none', border: 'none', cursor: ret.status !== 'Pendiente' ? 'not-allowed' : 'pointer', color: '#d9534f', opacity: ret.status !== 'Pendiente' ? 0.3 : 1 }}
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      {/* 5. Modal con detalles */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Detalles del Ticket">
        {selectedReturn && (
          <div style={{ textAlign: 'left', color: '#333', fontSize: '1.05rem', lineHeight: '1.8' }}>
            <h4 style={{ color: '#5A7D9A', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Ticket DEV-00{selectedReturn.id}</h4>
            <p><strong>Cliente:</strong> {selectedReturn.client_name}</p>
            <p><strong>Fecha:</strong> {selectedReturn.created_at.split('T')[0]}</p>
            <p><strong>Componente:</strong> {selectedReturn.item_name}</p>
            <div style={{ marginTop: '15px', backgroundColor: '#fdfdfd', padding: '15px', borderRadius: '5px', border: '1px solid #ddd' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '5px', color: '#d9534f' }}>Motivo de devolución:</p>
              <p style={{ fontSize: '0.95rem' }}>{selectedReturn.reason}</p>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}