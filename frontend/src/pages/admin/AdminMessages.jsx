import { useState, useEffect } from 'react';
import { FiMail, FiTrash2 } from 'react-icons/fi';
import AdminNavbar from '../../components/admin/AdminNavbar';
import api from '../../services/api';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  const triggerAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  // 1. Cargar mensajes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get('usuarios/admin-mensajes/');
        setMessages(response.data);
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
      }
    };
    fetchMessages();
  }, []);

  // 2. Eliminar mensaje
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
                <div key={msg.id} style={{ border: '1px solid #eaeaea', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', color: 'var(--text-dark)', fontSize: '1.2rem' }}>{msg.name}</h3>
                      <a href={`mailto:${msg.email}`} style={{ color: '#5A7D9A', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}>{msg.email}</a>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                      <span style={{ fontSize: '0.85rem', color: '#888', fontWeight: '600' }}>
                        {msg.created_at.split('T')[0]} a las {msg.created_at.split('T')[1].substring(0,5)}
                      </span>
                      <button onClick={() => handleDelete(msg.id)} style={{ background: 'none', border: 'none', color: '#d9534f', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600' }}>
                        <FiTrash2 /> Borrar
                      </button>
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
      </main>
    </div>
  );
}