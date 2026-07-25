import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ReturnForm from '../components/returns/ReturnForm';

export default function Returns() {
  return (
    <div className="page-container" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '400px', backgroundColor: 'var(--primary-dark)', zIndex: -1 }}></div>
      
      <main style={{ flexGrow: 1, padding: '60px 20px', display: 'flex', justifyContent: 'center' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ 
            background: 'white', 
            width: '100%', 
            maxWidth: '900px', 
            padding: '50px 60px', 
            borderRadius: '12px', 
            boxShadow: '0 12px 35px rgba(0,0,0,0.15)',
            border: '1px solid #eaeaea'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '15px', color: 'var(--text-dark)', lineHeight: '1.2' }}>
              ¿Problemas Con Tus Componentes?<br />Solicita Una Devolución
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#444' }}>Completa el siguiente formulario para procesar tu devolución</p>
          </div>

          <ReturnForm />
          
        </motion.div>
        
      </main>
      <Footer />
    </div>
  );
}