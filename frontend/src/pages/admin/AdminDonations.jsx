import { useState, useEffect } from 'react';
import { FiCheck, FiX, FiSearch, FiEye } from 'react-icons/fi';
import AdminNavbar from '../../components/admin/AdminNavbar';
import api from '../../services/api';
import Modal from '../../components/ui/Modal';

export default function AdminDonations() {
  const [alertMessage, setAlertMessage] = useState(null);

  const triggerAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [donations, setDonations] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await api.get(`inventario/donaciones/?page=${currentPage}&search=${activeSearch}`);
        setDonations(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10));
      } catch (error) {
        console.error("Error al cargar donaciones:", error);
      }
    };
    fetchDonations();
  }, [currentPage, activeSearch]);

  const handleSearch = () => {
    setCurrentPage(1); 
    setActiveSearch(searchInput);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`inventario/donaciones/${id}/`, { status: newStatus });
      setDonations(donations.map(don => 
        don.id === id ? { ...don, status: newStatus } : don
      ));
      
      triggerAlert(`Donación marcada como ${newStatus}`);
    } catch (error) {
      console.error("Error al actualizar la donación:", error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pendiente': return { bg: '#fff3cd', color: '#856404' }; 
      case 'Aprobado': return { bg: '#d1ecf1', color: '#0c5460' };  
      case 'Recibido': return { bg: '#d4edda', color: '#155724' };  
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
            <h1 style={{ fontSize: '2rem', color: 'var(--text-dark)', margin: 0 }}>Gestión de Donaciones</h1>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ position: 'relative' }}>
                <FiSearch style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#888' }} />
                <input 
                  type="text" 
                  placeholder="Buscar donante o pieza"
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
            <div style={{ display: 'grid', gridTemplateColumns: '120px 2fr 2fr 1.5fr 150px 150px', backgroundColor: '#5A7D9A', color: 'white', fontWeight: '600', padding: '15px', textAlign: 'center' }}>
              <div>Fecha</div>
              <div style={{ textAlign: 'left', paddingLeft: '10px' }}>Donante</div>
              <div style={{ textAlign: 'left' }}>Componente / Equipo</div>
              <div>Condición</div>
              <div>Estado</div>
              <div>Acciones</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {donations.length === 0 ? (
                <div style={{ padding: '30px', textAlign: 'center', color: '#666' }}>No hay donaciones registradas en el sistema.</div>
              ) : (
                donations.map((item, index) => {
                  const statusStyle = getStatusStyle(item.status);
                  
                  return (
                    <div 
                      key={item.id} 
                      style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '120px 2fr 2fr 1.5fr 150px 150px', 
                        backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white', 
                        padding: '12px 15px', 
                        textAlign: 'center', 
                        alignItems: 'center',
                        borderBottom: '1px solid #eaeaea'
                      }}
                    >
                      <div style={{ color: '#666', fontSize: '0.9rem' }}>{item.created_at.split('T')[0]}</div>
                      <div style={{ textAlign: 'left', paddingLeft: '10px', fontWeight: '600', color: '#333' }}>{item.donor_name}</div>
                      <div style={{ textAlign: 'left', color: '#444' }}>{item.item_name}</div>
                      <div style={{ color: '#555', fontSize: '0.9rem' }}>{item.condition}</div>
                      
                      <div>
                        <span style={{ 
                          backgroundColor: statusStyle.bg, 
                          color: statusStyle.color, 
                          padding: '5px 12px', 
                          borderRadius: '20px', 
                          fontSize: '0.85rem', 
                          fontWeight: '700' 
                        }}>
                          {item.status}
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <button onClick={() => { setSelectedDonation(item); setShowModal(true); }} title="Ver Detalles" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5A7D9A' }}>
                          <FiEye size={20} />
                        </button>
                        
                        <button 
                          onClick={() => handleStatusChange(item.id, 'Aprobado')} 
                          disabled={item.status !== 'Pendiente'}
                          title="Aprobar" 
                          style={{ 
                            background: 'none', 
                            border: 'none', 
                            cursor: item.status !== 'Pendiente' ? 'not-allowed' : 'pointer', 
                            color: '#4CAF50', 
                            opacity: item.status !== 'Pendiente' ? 0.3 : 1 
                          }}
                        >
                          <FiCheck size={20} />
                        </button>
                        <button 
                          onClick={() => handleStatusChange(item.id, 'Rechazado')} 
                          disabled={item.status !== 'Pendiente'}
                          title="Rechazar" 
                          style={{ 
                            background: 'none', 
                            border: 'none', 
                            cursor: item.status !== 'Pendiente' ? 'not-allowed' : 'pointer', 
                            color: '#d9534f', 
                            opacity: item.status !== 'Pendiente' ? 0.3 : 1 
                          }}
                        >
                          <FiX size={20} />
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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Detalles Completos de la Donación">
        {selectedDonation && (
          <div style={{ textAlign: 'left', color: '#333', fontSize: '1.05rem', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
              <h4 style={{ color: '#5A7D9A', marginBottom: '10px' }}>Datos del Donante</h4>
              <p><strong>Nombre:</strong> {selectedDonation.donor_name}</p>
              <p><strong>Email:</strong> {selectedDonation.email}</p>
              <p><strong>Teléfono:</strong> {selectedDonation.phone}</p>
              <p><strong>Dirección:</strong> {selectedDonation.address}</p>
            </div>
            
            <div>
              <h4 style={{ color: '#5A7D9A', marginBottom: '10px' }}>Detalles del Componente</h4>
              <p><strong>Pieza:</strong> {selectedDonation.item_name}</p>
              <p><strong>Condición Declarada:</strong> {selectedDonation.condition}</p>
              <p><strong>Fecha de Solicitud:</strong> {selectedDonation.created_at.split('T')[0]}</p>
              
              <div style={{ marginTop: '15px', marginBottom: '15px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Descripción y Notas:</p>
                <p style={{ fontSize: '0.95rem' }}>{selectedDonation.description || 'Sin comentarios adicionales.'}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}