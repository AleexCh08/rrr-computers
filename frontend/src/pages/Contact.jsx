import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Modal from '../components/ui/Modal';

export default function Contact() {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset(); // Limpia el formulario
    setShowModal(true); // Abre el modal de éxito
  };

  return (
    <div className="page-container" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      {/* Fondo azul superior */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '400px', backgroundColor: 'var(--primary-dark)', zIndex: -1 }}></div>

      <main style={{ flexGrow: 1, padding: '60px 20px', display: 'flex', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'white',
            width: '100%',
            maxWidth: '1000px',
            padding: '50px 60px',
            borderRadius: '12px',
            boxShadow: '0 12px 35px rgba(0,0,0,0.15)',
            border: '1px solid #eaeaea'
          }}
        >
          {/* Navegación Breadcrumb */}
          <div style={{ fontSize: '0.9rem', marginBottom: '30px', color: '#666', fontWeight: '600'}}>
            <Link to="/" style={{ color: '#333' }}>Home</Link> <span style={{ margin: '0 8px', color: '#ccc' }}>&gt;</span> Contacto
          </div>

          {/* Encabezado */}
          <div style={{ marginBottom: '50px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.8rem', marginBottom: '15px', color: 'var(--text-dark)' }}>Contacto</h1>
            <p style={{ fontSize: '1.2rem', color: '#333', maxWidth: '600px', lineHeight: '1.4', textAlign: 'center', margin: '0 auto' }}>
              Puedes contactarnos por el siguiente formulario, o mediante los siguientes medios
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
            
            {/* Columna Izquierda: Información */}
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '25px', color: 'var(--text-dark)' }}>Medios de contacto</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px', fontSize: '1.15rem', color: '#333' }}>
                <p><strong style={{ fontWeight: '700' }}>Correo electrónico:</strong> rrrcomputers@contact.com</p>
                <p><strong style={{ fontWeight: '700' }}>Número telefónico:</strong> (0212)4689325 - 8963652</p>
                <p><strong style={{ fontWeight: '700' }}>Instagram:</strong> @rrrcomputers</p>
              </div>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--text-dark)' }}>Dirección</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#444' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mi eros, auctor elementum malesuada eget, vehicula in ligula. Ut pulvinar lorem erat, ut auctor erat convallis in.
              </p>
            </div>

            {/* Columna Derecha: Formulario */}
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '25px', color: 'var(--text-dark)' }}>Formulario de contacto</h3>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" className="form-input" placeholder="Nombre y apellido" />
                <input type="email" className="form-input" placeholder="Email" />
                <textarea className="form-textarea" placeholder="Lorem ipsum" style={{ minHeight: '220px' }}></textarea>
                
                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 35px', marginTop: '10px', fontSize: '1.05rem' }}>
                  Enviar
                </button>
              </form>
            </div>
            
          </div>
        </motion.div>
      </main>
      
      <Footer />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="¡Tu formulario fue enviado con éxito!">
        <p style={{ fontSize: '1.15rem', marginBottom: '35px', fontWeight: '600', color: '#333', lineHeight: '1.5' }}>
          Nos pondremos en contacto contigo en<br />un plazo de 24-48 horas.
        </p>
      </Modal>

    </div>
  );
}