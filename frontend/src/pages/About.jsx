import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function About() {
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
            padding: '50px 80px',
            borderRadius: '12px',
            boxShadow: '0 12px 35px rgba(0,0,0,0.15)',
            border: '1px solid #eaeaea'
          }}
        >
          <div style={{ fontSize: '0.9rem', marginBottom: '40px', color: '#666', fontWeight: '600' }}>
            <Link to="/" style={{ color: '#333' }}>Home</Link> <span style={{ margin: '0 8px', color: '#ccc' }}>&gt;</span> Nosotros
          </div>

          <h1 style={{ fontSize: '2.8rem', color: 'var(--text-dark)', marginBottom: '40px', textAlign: 'center' }}>Nosotros</h1>

          <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
            
            <div style={{ flex: '1 1 500px', fontSize: '1.25rem', color: '#333', lineHeight: '1.7' }}>
              <p style={{ marginBottom: '25px', textAlign: 'justify' }}>
                Somos estudiantes de la Universidad Central de Venezuela, que iniciaron este emprendimiento con el objetivo de darle una segunda vida a material electrónico que es desechado aunque siga siendo funcional, reparando y reciclando material electrónico, y reutilizando componentes.
              </p>
              <p style={{ textAlign: 'justify' }}>
                Con esto construimos equipos que puedan llegar a quienes lo necesiten a precios accesibles; todos los equipos presentados en esta tienda son reconstruidos por nosotros, a través de material recaudado, comerciado y/o donado.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ flex: '1 1 250px', display: 'flex', justifyContent: 'center' }}
            >
              <img
                src="/favicon.png"
                alt="RRR Computers Logo"
                style={{
                  width: '100%',
                  maxWidth: '280px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0px 15px 25px rgba(0,0,0,0.12))'
                }}
              />
            </motion.div>

          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}