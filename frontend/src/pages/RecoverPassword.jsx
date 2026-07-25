import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/layout/Footer';
import Modal from '../components/ui/Modal';

export default function RecoverPassword() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    navigate('/login'); // Redirige al login tras solicitar recuperación
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
          style={{ background: '#eeeeee', padding: '50px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', width: '100%', maxWidth: '450px', textAlign: 'center', border: '1px solid #eaeaea' }}
        >
          <h1 style={{ fontSize: '2.2rem', color: 'var(--text-dark)', marginBottom: '30px' }}>Recuperar Contraseña</h1>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Introduce tu Email</label>
              <input type="email" required className="form-input" placeholder="Correo Electrónico" style={{ textAlign: 'center' }} />
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '10px', padding: '12px 25px', fontSize: '1.1rem', backgroundColor: '#4CAF50', alignSelf: 'center' }}>
              Recuperar Contraseña
            </button>
          </form>

          <div style={{ marginTop: '40px' }}>
            <Link to="/login" style={{ color: '#5A7D9A', textDecoration: 'none', fontWeight: '600', fontSize: '1.1rem' }}>Iniciar Sesión</Link>
          </div>
        </motion.div>
      </main>

      <Footer />

      <Modal isOpen={showModal} onClose={handleClose} title="Enlace Enviado">
        <p style={{ fontSize: '1.15rem', marginBottom: '35px', fontWeight: '600', color: '#333', lineHeight: '1.5' }}>
          Hemos enviado un enlace de recuperación a tu correo electrónico.<br/>Por favor, revisa tu bandeja de entrada.
        </p>
      </Modal>
    </div>
  );
}