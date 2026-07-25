import { useState } from 'react';
import { FiSearch, FiShield, FiLock, FiUnlock, FiEdit2 } from 'react-icons/fi';
import AdminNavbar from '../../components/admin/AdminNavbar';

export default function AdminUsers() {
  const [alertMessage, setAlertMessage] = useState(null);

  const triggerAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  // Datos simulados de usuarios
  const [users, setUsers] = useState([
    { id: 'USR-001', name: 'Admin Principal', email: 'admin@rrrcomputers.com', role: 'Administrador', status: 'Activo', date: '2025-01-15' },
    { id: 'USR-002', name: 'Carlos Pérez', email: 'carlos@mail.com', role: 'Cliente', status: 'Activo', date: '2026-03-10' },
    { id: 'USR-003', name: 'Ana Gómez', email: 'ana.gomez@mail.com', role: 'Cliente', status: 'Activo', date: '2026-05-22' },
    { id: 'USR-004', name: 'Usuario Sospechoso', email: 'spam123@mail.com', role: 'Cliente', status: 'Bloqueado', date: '2026-07-01' },
    { id: 'USR-005', name: 'Luis Silva', email: 'luis.s@mail.com', role: 'Cliente', status: 'Inactivo', date: '2025-11-05' },
  ]);

  // Función para estilos de estado y rol
  const getBadgeStyle = (type, value) => {
    if (type === 'role') {
      return value === 'Administrador' 
        ? { bg: '#e2d9f3', color: '#4a148c' } // Morado para Admin
        : { bg: '#e2e8f0', color: '#475569' }; // Gris para Cliente
    }
    
    if (type === 'status') {
      switch (value) {
        case 'Activo': return { bg: '#d4edda', color: '#155724' }; // Verde
        case 'Bloqueado': return { bg: '#f8d7da', color: '#721c24' }; // Rojo
        case 'Inactivo': return { bg: '#fff3cd', color: '#856404' }; // Amarillo
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
            <div style={{ display: 'grid', gridTemplateColumns: '100px 2fr 2fr 1.5fr 1.5fr 150px', backgroundColor: '#5A7D9A', color: 'white', fontWeight: '600', padding: '15px', textAlign: 'center' }}>
              <div>ID</div>
              <div style={{ textAlign: 'left', paddingLeft: '10px' }}>Nombre</div>
              <div style={{ textAlign: 'left' }}>Correo Electrónico</div>
              <div>Rol</div>
              <div>Estado</div>
              <div>Acciones</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {users.map((user, index) => {
                const roleStyle = getBadgeStyle('role', user.role);
                const statusStyle = getBadgeStyle('status', user.status);
                
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
                    <div style={{ textAlign: 'left', paddingLeft: '10px', fontWeight: '600', color: '#333' }}>{user.name}</div>
                    <div style={{ textAlign: 'left', color: '#555', fontSize: '0.95rem' }}>{user.email}</div>
                    
                    {/* Badge de Rol */}
                    <div>
                      <span style={{ 
                        backgroundColor: roleStyle.bg, 
                        color: roleStyle.color, 
                        padding: '4px 10px', 
                        borderRadius: '20px', 
                        fontSize: '0.8rem', 
                        fontWeight: '700',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        {user.role === 'Administrador' && <FiShield />}
                        {user.role}
                      </span>
                    </div>

                    {/* Badge de Estado */}
                    <div>
                      <span style={{ 
                        backgroundColor: statusStyle.bg, 
                        color: statusStyle.color, 
                        padding: '4px 10px', 
                        borderRadius: '20px', 
                        fontSize: '0.8rem', 
                        fontWeight: '700' 
                      }}>
                        {user.status}
                      </span>
                    </div>
                    
                    {/* Botones de Acción */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                      <button onClick={() => triggerAlert(`Editando usuario ${user.name}`)} title="Editar Usuario" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5A7D9A' }}>
                        <FiEdit2 size={20} />
                      </button>
                      
                      {user.status === 'Bloqueado' ? (
                        <button onClick={() => triggerAlert(`Usuario ${user.name} desbloqueado`)} title="Desbloquear" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4CAF50' }}>
                          <FiUnlock size={20} />
                        </button>
                      ) : (
                        <button onClick={() => triggerAlert(`Usuario ${user.name} bloqueado`)} title="Bloquear" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d9534f' }}>
                          <FiLock size={20} />
                        </button>
                      )}
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