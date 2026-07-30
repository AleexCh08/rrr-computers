import { useState, useEffect } from 'react';
import { FiMail, FiTrash2 } from 'react-icons/fi';
import AdminNavbar from '../../components/admin/AdminNavbar';
import api from '../../services/api';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const triggerAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`usuarios/admin-mensajes/?page=${currentPage}`);
        setMessages(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10));
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
      }
    };
    fetchMessages();
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(1); 
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.patch(`usuarios/admin-mensajes/${id}/`, { is_read: true });
      setMessages(messages.map(msg => msg.id === id ? { ...msg, is_read: true } : msg));
    } catch (error) {
      triggerAlert("Error al actualizar el estado del mensaje.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este mensaje de forma permanente?")) {
      try {
        await api.delete(`usuarios/admin-mensajes/${id}/`);
        setMessages(messages.filter(msg => msg.id !== id));
        triggerAlert("Mensaje eliminado con éxito.");
      } catch (error) {
        triggerAlert("Error al intentar eliminar el mensaje.");
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AdminNavbar />

      <main style={{ flexGrow: 1, padding: '40px' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '2rem', color: 'var(--text-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '15px' }}>
              <FiMail color="var(--accent-green)" /> Bandeja de Entrada
            </h1>
          </div>

          {alertMessage && (
            <div style={{ backgroundColor: '#ebebeb', borderLeft: '5px solid #4CAF50', padding: '12px 20px', marginBottom: '25px', color: '#111', fontWeight: '600' }}>
              {alertMessage}
            </div>
          )}

          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px', color: '#666', border: '1px dashed #ccc', borderRadius: '8px' }}>
              No hay mensajes nuevos en la bandeja de entrada.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ 
                  border: msg.is_read ? '1px solid #eaeaea' : '2px solid var(--accent-green)', 
                  borderRadius: '8px', 
                  padding: '20px', 
                  backgroundColor: msg.is_read ? '#f9f9f9' : 'white', 
                  display: 'flex', flexDirection: 'column', gap: '15px' 
                }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', color: 'var(--text-dark)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {msg.name} 
                        {!msg.is_read && <span style={{ backgroundColor: 'var(--accent-green)', color: 'white', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px' }}>NUEVO</span>}
                      </h3>
                      <a href={`mailto:${msg.email}`} style={{ color: '#5A7D9A', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}>{msg.email}</a>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                      <span style={{ fontSize: '0.85rem', color: '#888', fontWeight: '600' }}>
                        {new Date(msg.created_at).toLocaleDateString('es-VE')} a las {new Date(msg.created_at).toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      
                      <div style={{ display: 'flex', gap: '15px' }}>
                        {!msg.is_read && (
                          <button onClick={() => handleMarkAsRead(msg.id)} style={{ background: 'none', border: 'none', color: 'var(--accent-green)', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>
                            Marcar como Leído
                          </button>
                        )}
                        <button onClick={() => handleDelete(msg.id)} style={{ background: 'none', border: 'none', color: '#d9534f', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600', fontSize: '0.9rem' }}>
                          <FiTrash2 /> Borrar
                        </button>
                      </div>
                    </div>
                  </div>

                  <p style={{ margin: 0, color: '#333', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
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
    </div>
  );
}