import { useState, useEffect } from 'react';
import { FiUser, FiPackage, FiHeart, FiSettings, FiLogOut } from 'react-icons/fi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import api from '../services/api';

export default function MyAccount() {
  const [activeTab, setActiveTab] = useState('orders');

  const [alertMessage, setAlertMessage] = useState(null);
  const [user, setUser] = useState({ name: '', email: '', phone: '', address: '' });
  const [myOrders, setMyOrders] = useState([]);
  const [myDonations, setMyDonations] = useState([]);

  const triggerAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('usuarios/perfil/');
        setUser({
          name: response.data.first_name || response.data.username,
          email: response.data.email,
          phone: response.data.phone && response.data.phone !== 'No registrado' ? response.data.phone : '',
          address: response.data.address && response.data.address !== 'No registrada' ? response.data.address : ''
        });

        const donacionesRes = await api.get('inventario/donaciones/mis_donaciones/');
        setMyDonations(donacionesRes.data.results);

        const ordersRes = await api.get('ordenes/');
        setMyOrders(ordersRes.data.results);
        
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        if (error.response?.status === 401) {
          window.location.href = '/login'; 
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Procesando': return '#f57f17'; 
      case 'Pendiente': return '#f57f17'; 
      case 'Entregado': return '#2e7d32'; 
      default: return '#555';
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      await api.patch('usuarios/perfil/', {
        first_name: user.name,
        phone: user.phone,
        address: user.address
      });
      triggerAlert('¡Cambios guardados con éxito!');
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      triggerAlert('Error al intentar guardar los cambios.');
    }
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main className="container" style={{ flexGrow: 1, padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        <h1 style={{ fontSize: '2.2rem', color: 'var(--text-dark)', marginBottom: '30px' }}>Mi Cuenta</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px', alignItems: 'start' }}>
          
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea', overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #eee', textAlign: 'center' }}>
              <div style={{ width: '70px', height: '70px', backgroundColor: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', color: '#64748b' }}>
                <FiUser size={30} />
              </div>
              <h3 style={{ margin: '0 0 5px 0', color: 'var(--text-dark)' }}>{user.name}</h3>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{user.email}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button 
                onClick={() => setActiveTab('orders')}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 20px', background: activeTab === 'orders' ? '#f4f6f8' : 'white', border: 'none', borderLeft: activeTab === 'orders' ? '4px solid var(--accent-green)' : '4px solid transparent', cursor: 'pointer', textAlign: 'left', fontWeight: activeTab === 'orders' ? '700' : '500', color: activeTab === 'orders' ? 'var(--text-dark)' : '#555' }}
              >
                <FiPackage size={18} /> Mis Órdenes
              </button>
              
              <button 
                onClick={() => setActiveTab('donations')}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 20px', background: activeTab === 'donations' ? '#f4f6f8' : 'white', border: 'none', borderLeft: activeTab === 'donations' ? '4px solid var(--accent-green)' : '4px solid transparent', cursor: 'pointer', textAlign: 'left', fontWeight: activeTab === 'donations' ? '700' : '500', color: activeTab === 'donations' ? 'var(--text-dark)' : '#555' }}
              >
                <FiHeart size={18} /> Mis Donaciones
              </button>

              <button 
                onClick={() => setActiveTab('settings')}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 20px', background: activeTab === 'settings' ? '#f4f6f8' : 'white', border: 'none', borderLeft: activeTab === 'settings' ? '4px solid var(--accent-green)' : '4px solid transparent', cursor: 'pointer', textAlign: 'left', fontWeight: activeTab === 'settings' ? '700' : '500', color: activeTab === 'settings' ? 'var(--text-dark)' : '#555' }}
              >
                <FiSettings size={18} /> Ajustes de Perfil
              </button>

              <button 
                onClick={handleLogout}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 20px', background: 'white', border: 'none', borderLeft: '4px solid transparent', cursor: 'pointer', textAlign: 'left', fontWeight: '500', color: '#d9534f', borderTop: '1px solid #eee' }}
              >
                <FiLogOut size={18} /> Cerrar Sesión
              </button>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
            
            {activeTab === 'orders' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>Historial de Órdenes</h2>
                {myOrders.map(order => (
                  <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #eaeaea', borderRadius: '6px', marginBottom: '15px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', color: 'var(--text-dark)', fontSize: '1.1rem' }}>Orden #{order.id}</h4>
                      <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Realizada el {new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <h4 style={{ margin: '0 0 5px 0', color: 'var(--text-dark)', fontSize: '1.1rem' }}>${order.total}</h4>
                      <span style={{ color: getStatusColor(order.status), fontWeight: '700', fontSize: '0.9rem' }}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'donations' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>Mis Donaciones</h2>
                {myDonations.length === 0 ? (
                  <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px dashed #ccc' }}>
                    <p style={{ color: '#666', fontSize: '1.1rem', margin: 0 }}>No has realizado ninguna donación aún.</p>
                  </div>
                ) : (
                  myDonations.map(donation => (
                    <div key={donation.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #eaeaea', borderRadius: '6px', marginBottom: '15px' }}>
                      <div>
                        <h4 style={{ margin: '0 0 5px 0', color: 'var(--text-dark)', fontSize: '1.1rem' }}>{donation.item_name}</h4>
                        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Registrada el {donation.created_at.split('T')[0]}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 5px 0', color: '#888', fontSize: '0.85rem' }}>ID: DON-00{donation.id}</p>
                        <span style={{ color: getStatusColor(donation.status), fontWeight: '700', fontSize: '0.9rem' }}>{donation.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>Ajustes de Perfil</h2>
                {alertMessage && (
                  <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '12px 20px', borderRadius: '4px', marginBottom: '20px', fontWeight: '600', borderLeft: '4px solid #28a745' }}>
                    {alertMessage}
                  </div>
                )}

                <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Nombre Completo</label>
                      <input type="text" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} className="form-input" />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Teléfono</label>
                      <input type="text" value={user.phone} onChange={(e) => setUser({...user, phone: e.target.value})} className="form-input" placeholder="Ej. 0414-1234567" />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Correo Electrónico</label>
                    <input type="email" value={user.email} className="form-input" disabled style={{ backgroundColor: '#f5f5f5', color: '#888' }} />
                    <small style={{ color: '#888', marginTop: '5px', display: 'block' }}>El correo no se puede cambiar por seguridad.</small>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Dirección de Envío Principal</label>
                    <textarea value={user.address} onChange={(e) => setUser({...user, address: e.target.value})} className="form-textarea" rows="3" placeholder="Indica tu dirección completa..."></textarea>
                  </div>

                  <button type="submit" className="btn-primary" style={{ padding: '12px 25px', backgroundColor: '#4CAF50', alignSelf: 'flex-start' }}>
                    Guardar Cambios
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}