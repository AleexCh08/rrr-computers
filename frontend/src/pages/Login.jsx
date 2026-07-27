import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/layout/Footer';
import Modal from '../components/ui/Modal';
import api from '../services/api';

export default function Login() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiamos errores

    try {
      const response = await api.post('token/', {
        username: email, 
        password: password
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      setShowModal(true);
    } catch (err) {
      console.error("Error de login:", err);
      setError('Correo o contraseña incorrectos.');
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate('/'); // Redirige al inicio tras loguearse
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50vh', backgroundColor: 'var(--primary-dark)', zIndex: -1 }}></div>
      <div style={{ position: 'absolute', top: '50vh', left: 0, right: 0, height: '50vh', backgroundColor: '#fff', zIndex: -1 }}></div>

      <header style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '1px' }}><h2>RRR<span style={{ fontSize: '1rem', fontWeight: '300' }}>COMPUTERS</span></h2></div>
        </Link>
        <Link to="/admin/login" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>
          Admin login
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
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Correo Electrónico</label>
              <input 
                type="email" 
                required 
                className="form-input" 
                placeholder="Ingrese su Correo" 
                style={{ textAlign: 'center' }} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Contraseña</label>
              <input 
                type="password" 
                required 
                className="form-input" 
                placeholder="Contraseña" 
                style={{ textAlign: 'center' }} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '10px', padding: '12px', fontSize: '1.1rem', backgroundColor: '#4CAF50', alignSelf: 'center', width: 'auto', paddingLeft: '30px', paddingRight: '30px' }}>
              Iniciar Sesión
            </button>
          </form>

          <div style={{ marginTop: '25px' }}>
            <Link to="/recuperar" style={{ color: '#5A7D9A', textDecoration: 'none', fontWeight: '600', display: 'block', marginBottom: '25px' }}>He olvidado mi contraseña</Link>
            
            <p style={{ fontWeight: '700', color: 'var(--text-dark)', marginBottom: '15px' }}>¿No tienes cuenta?</p>
            <Link to="/registro">
              <button className="btn-primary" style={{ padding: '10px 30px', backgroundColor: '#4CAF50', fontSize: '1rem' }}>Registrarse</button>
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />

      <Modal isOpen={showModal} onClose={handleClose} title="¡Bienvenido de vuelta!">
        <p style={{ fontSize: '1.15rem', marginBottom: '35px', fontWeight: '600', color: '#333' }}>
          Has iniciado sesión correctamente.
        </p>
      </Modal>
    </div>
  );
}