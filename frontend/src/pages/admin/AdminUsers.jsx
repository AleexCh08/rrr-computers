import { useState, useEffect } from 'react';
import { FiSearch, FiShield, FiLock, FiUnlock, FiEdit2 } from 'react-icons/fi';
import AdminNavbar from '../../components/admin/AdminNavbar';
import api from '../../services/api';
import Modal from '../../components/ui/Modal';

export default function AdminUsers() {
  const [alertMessage, setAlertMessage] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`usuarios/admin-users/?page=${currentPage}&search=${activeSearch}`);
        setUsers(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10));
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    fetchUsers();
  }, [currentPage, activeSearch]);

  const handleSearch = () => {
    setCurrentPage(1); 
    setActiveSearch(searchInput);
  };

  const handleToggleStatus = async (id, currentActiveState) => {
    const newStatus = !currentActiveState; 
    
    try {
      await api.patch(`usuarios/admin-users/${id}/`, { is_active: newStatus });
      
      setUsers(users.map(user => 
        user.id === id ? { ...user, is_active: newStatus } : user
      ));
      
      triggerAlert(`Usuario ${newStatus ? 'desbloqueado' : 'bloqueado'} con éxito.`);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      triggerAlert("Error al intentar cambiar el estado del usuario.");
    }
  };

  const getBadgeStyle = (type, value) => {
    if (type === 'role') {
      return value === 'Administrador' 
        ? { bg: '#e2d9f3', color: '#4a148c' } 
        : { bg: '#e2e8f0', color: '#475569' }; 
    }
    
    if (type === 'status') {
      switch (value) {
        case 'Activo': return { bg: '#d4edda', color: '#155724' }; 
        case 'Bloqueado': return { bg: '#f8d7da', color: '#721c24' }; 
        case 'Inactivo': return { bg: '#fff3cd', color: '#856404' }; 
        default: return { bg: '#e2e8f0', color: '#475569' };
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AdminNavbar />

      <main style={{ flexGrow: 1, padding: '40px' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '2rem', color: 'var(--text-dark)', margin: 0 }}>Gestión de Usuarios</h1>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ position: 'relative' }}>
                <FiSearch style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#888' }} />
                <input 
                  type="text" 
                  placeholder="Buscar por nombre o correo"
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
            <div style={{ display: 'grid', gridTemplateColumns: '100px 2fr 2fr 1.5fr 1.5fr 150px', backgroundColor: '#5A7D9A', color: 'white', fontWeight: '600', padding: '15px', textAlign: 'center' }}>
              <div>ID</div>
              <div style={{ textAlign: 'left', paddingLeft: '10px' }}>Nombre</div>
              <div style={{ textAlign: 'left' }}>Correo Electrónico</div>
              <div>Rol</div>
              <div>Estado</div>
              <div>Acciones</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {users.length === 0 ? (
                <div style={{ padding: '30px', textAlign: 'center', color: '#666' }}>No hay usuarios registradas en el sistema.</div>
              ) : (
                users.map((user, index) => {
                  const roleText = user.is_staff ? 'Administrador' : 'Cliente';
                  const statusText = user.is_active ? 'Activo' : 'Bloqueado';
                  
                  const roleStyle = getBadgeStyle('role', roleText);
                  const statusStyle = getBadgeStyle('status', statusText);
                  
                  return (
                    <div 
                      key={user.id} 
                      style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '100px 2fr 2fr 1.5fr 1.5fr 150px', 
                        backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white', 
                        padding: '12px 15px', 
                        textAlign: 'center', 
                        alignItems: 'center',
                        borderBottom: '1px solid #eaeaea'
                      }}
                    >
                      <div style={{ fontWeight: '700', color: 'var(--text-dark)', fontSize: '0.9rem' }}>{user.id}</div>
                      <div style={{ textAlign: 'left', paddingLeft: '10px', fontWeight: '600', color: '#333' }}>{user.first_name || user.username}</div>
                      <div style={{ textAlign: 'left', color: '#555', fontSize: '0.95rem' }}>{user.email}</div>
                      
                      <div>
                        <span style={{ 
                          backgroundColor: roleStyle.bg, 
                          color: roleStyle.color, 
                          padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '5px'
                        }}>
                          {user.is_staff && <FiShield />}
                          {roleText}
                        </span>
                      </div>

                      <div>
                        <span style={{ 
                          backgroundColor: statusStyle.bg, 
                          color: statusStyle.color, 
                          padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' 
                        }}>
                          {statusText}
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                        <button onClick={() => { setSelectedUser(user); setShowModal(true); }} title="Editar Usuario" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5A7D9A' }}>
                          <FiEdit2 size={20} />
                        </button>
                        {!user.is_active ? (
                          <button onClick={() => handleToggleStatus(user.id, user.is_active)} title="Desbloquear" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4CAF50' }}>
                            <FiUnlock size={20} />
                          </button>
                        ) : (
                          <button onClick={() => handleToggleStatus(user.id, user.is_active)} title="Bloquear" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d9534f' }}>
                            <FiLock size={20} />
                          </button>
                        )}
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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Datos del Perfil">
        {selectedUser && (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }} onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>Nombre Completo</label>
              <input type="text" defaultValue={selectedUser.first_name || selectedUser.username} className="form-input" />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>Correo Electrónico</label>
              <input type="email" defaultValue={selectedUser.email} className="form-input" disabled style={{ backgroundColor: '#f5f5f5', color: '#888' }} />
              <small style={{ color: '#888', display: 'block', marginTop: '4px' }}>El correo es el identificador principal y no se puede cambiar.</small>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>Teléfono</label>
              <input type="text" value={selectedUser.phone || "No registrado"} className="form-input" disabled style={{ backgroundColor: '#f9f9f9', cursor: 'not-allowed' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>Dirección de Envío Principal</label>
              <textarea value={selectedUser.address || "No registrada"} className="form-textarea" rows="3" disabled style={{ backgroundColor: '#f9f9f9', cursor: 'not-allowed' }}></textarea>
            </div>

            <div style={{ backgroundColor: '#e2e8f0', color: '#475569', padding: '10px', borderRadius: '4px', fontSize: '0.85rem', marginTop: '5px', marginBottom: '10px', textAlign: 'center' }}>
              <strong>Nota:</strong> Los datos personales del usuario son de solo lectura.
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}