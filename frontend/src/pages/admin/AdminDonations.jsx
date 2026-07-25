import { useState } from 'react';
import { FiCheck, FiX, FiSearch, FiEye } from 'react-icons/fi';
import AdminNavbar from '../../components/admin/AdminNavbar';

export default function AdminDonations() {
  // Estado para la alerta visual de acciones
  const [alertMessage, setAlertMessage] = useState(null);

  const triggerAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  // Datos simulados de solicitudes de donación
  const [donations, setDonations] = useState([
    { id: 1, date: '2026-07-20', donor: 'Carlos Pérez', item: 'Monitor Dell 24"', condition: 'Usado (Buen estado)', status: 'Pendiente' },
    { id: 2, date: '2026-07-22', donor: 'Ana Gómez', item: 'Teclado Mecánico', condition: 'Nuevo', status: 'Aprobado' },
    { id: 3, date: '2026-07-15', donor: 'Luis Silva', item: 'Laptop HP (Piezas)', condition: 'Dañado', status: 'Recibido' },
    { id: 4, date: '2026-07-24', donor: 'María López', item: 'Memoria RAM 8GB', condition: 'Usado (Buen estado)', status: 'Rechazado' },
  ]);

  // Función para determinar el color del badge de estado
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pendiente': return { bg: '#fff3cd', color: '#856404' }; // Amarillo
      case 'Aprobado': return { bg: '#d1ecf1', color: '#0c5460' };  // Azul claro
      case 'Recibido': return { bg: '#d4edda', color: '#155724' };  // Verde
      case 'Rechazado': return { bg: '#f8d7da', color: '#721c24' }; // Rojo
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
            <div style={{ display: 'grid', gridTemplateColumns: '120px 2fr 2fr 1.5fr 150px 150px', backgroundColor: '#5A7D9A', color: 'white', fontWeight: '600', padding: '15px', textAlign: 'center' }}>
              <div>Fecha</div>
              <div style={{ textAlign: 'left', paddingLeft: '10px' }}>Donante</div>
              <div style={{ textAlign: 'left' }}>Componente / Equipo</div>
              <div>Condición</div>
              <div>Estado</div>
              <div>Acciones</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {donations.map((item, index) => {
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
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>{item.date}</div>
                    <div style={{ textAlign: 'left', paddingLeft: '10px', fontWeight: '600', color: '#333' }}>{item.donor}</div>
                    <div style={{ textAlign: 'left', color: '#444' }}>{item.item}</div>
                    <div style={{ color: '#555', fontSize: '0.9rem' }}>{item.condition}</div>
                    
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
                        {item.status}
                      </span>
                    </div>
                    
                    {/* Botones de Acción */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <button onClick={() => triggerAlert('Mostrando detalles de la donación...')} title="Ver Detalles" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5A7D9A' }}>
                        <FiEye size={20} />
                      </button>
                      <button onClick={() => triggerAlert('Donación aprobada')} title="Aprobar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4CAF50' }}>
                        <FiCheck size={20} />
                      </button>
                      <button onClick={() => triggerAlert('Donación rechazada')} title="Rechazar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d9534f' }}>
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
    </div>
  );
}