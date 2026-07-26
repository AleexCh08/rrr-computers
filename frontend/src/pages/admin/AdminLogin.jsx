import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../../components/layout/Footer';
import Modal from '../../components/ui/Modal';
import api from '../../services/api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const response = await api.post('token/', {
        username: username,
        password: password
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      setShowModal(true);
    } catch (err) {
      console.error('Detalle del error:', err.response?.data);
      
      if (!err.response) {
        setError('Error de conexión con el servidor. Revisa tu consola.');
      } else if (err.response.status === 401) {
        setError('El usuario o la contraseña no coinciden en la base de datos.');
      } else {
        setError('Credenciales incorrectas o no autorizadas.');
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate('/admin/dashboard'); 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50vh', backgroundColor: 'var(--primary-dark)', zIndex: -1 }}></div>
      <div style={{ position: 'absolute', top: '50vh', left: 0, right: 0, height: '50vh', backgroundColor: '#fff', zIndex: -1 }}></div>

      <header style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '1px' }}><h2>RRR<span style={{ fontSize: '1rem', fontWeight: '300' }}>COMPUTERS</span></h2></div>
        </Link>
        
        <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>
          Cliente login
        </Link>
      </header>

      <main style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: '#eeeeee', padding: '50px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', width: '100%', maxWidth: '450px', textAlign: 'center', border: '1px solid #eaeaea' }}
        >
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-dark)', marginBottom: '30px' }}>Iniciar Sesión</h1>
          
          {error && (
            <div style={{ color: '#d9534f', backgroundColor: '#fde0e3', padding: '10px', borderRadius: '5px', marginBottom: '20px', fontWeight: '600' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Usuario Admin</label>
              <input 
                type="text" 
                required 
                className="form-input" 
                placeholder="Ingrese su Usuario" 
                style={{ textAlign: 'center', backgroundColor: '#fff' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Contraseña</label>
              <input 
                type="password" 
                required 
                className="form-input" 
                placeholder="Contraseña" 
                style={{ textAlign: 'center', backgroundColor: '#fff' }} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '10px', padding: '12px', fontSize: '1.1rem', backgroundColor: '#4CAF50', alignSelf: 'center', width: 'auto', paddingLeft: '30px', paddingRight: '30px' }}>
              Iniciar Sesión
            </button>
          </form>
        </motion.div>
      </main>

      <Footer />

      <Modal isOpen={showModal} onClose={handleClose} title="Bienvenido Administrador">
        <p style={{ fontSize: '1.15rem', marginBottom: '35px', fontWeight: '600', color: '#333' }}>
          Has iniciado sesión correctamente.
        </p>
      </Modal>
    </div>
  );
}