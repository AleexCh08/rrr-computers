import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/layout/Footer';
import Modal from '../components/ui/Modal';
import api from '../services/api';

export default function Register() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      await api.post('usuarios/registro/', {
        username: formData.email, 
        email: formData.email,
        password: formData.password,
        first_name: formData.name
      });
      
      setShowModal(true);
    } catch (err) {
      console.error("Detalle del error al registrar:", err.response?.data || err.message);
      
      if (err.response?.data && typeof err.response.data === 'object') {
        const firstErrorKey = Object.keys(err.response.data)[0];
        const firstErrorMessage = err.response.data[firstErrorKey][0];
        
        if (firstErrorKey === 'username') {
          setError(`Error con el correo: ${firstErrorMessage}`);
        } else {
          setError(`Error en ${firstErrorKey}: ${firstErrorMessage}`);
        }
      } else {
        setError('Error de conexión. ¿Está encendido el servidor de Django?');
      }
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate('/login'); // Redirige al login tras registrarse
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50vh', backgroundColor: 'var(--primary-dark)', zIndex: -1 }}></div>
      <div style={{ position: 'absolute', top: '50vh', left: 0, right: 0, height: '50vh', backgroundColor: '#fff', zIndex: -1 }}></div>

      <header style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '1px' }}><h2>RRR<span style={{ fontSize: '1rem', fontWeight: '300' }}>COMPUTERS</span></h2></div>
        </Link>
      </header>

      <main style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: '#eeeeee', padding: '40px 50px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', width: '100%', maxWidth: '480px', textAlign: 'center', border: '1px solid #eaeaea' }}
        >
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-dark)', marginBottom: '30px' }}>Crear una Cuenta</h1>
          
          {error && (
            <div style={{ color: '#d9534f', backgroundColor: '#fde0e3', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontWeight: '600' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>Nombre Completo</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" placeholder="Tu nombre" style={{ textAlign: 'center' }} />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>Correo</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" placeholder="Correo Electrónico" style={{ textAlign: 'center' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>Contraseña</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required className="form-input" placeholder="Contraseña" style={{ textAlign: 'center' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333' }}>Confirmar Contraseña</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="form-input" placeholder="Confirmar Contraseña" style={{ textAlign: 'center' }} />
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '15px', padding: '12px 30px', fontSize: '1.1rem', backgroundColor: '#4CAF50', alignSelf: 'center' }}>
              Crear Cuenta
            </button>
          </form>

          <div style={{ marginTop: '25px', fontSize: '1.05rem', fontWeight: '600' }}>
            <span style={{ color: 'var(--text-dark)' }}>¿Ya tienes Cuenta? </span>
            <Link to="/login" style={{ color: '#5A7D9A', textDecoration: 'none' }}>Iniciar Sesión</Link>
          </div>
        </motion.div>
      </main>

      <Footer />

      <Modal isOpen={showModal} onClose={handleClose} title="¡Cuenta Creada!">
        <p style={{ fontSize: '1.15rem', marginBottom: '35px', fontWeight: '600', color: '#333' }}>
          Tu cuenta ha sido registrada con éxito. Ya puedes iniciar sesión.
        </p>
      </Modal>
    </div>
  );
}