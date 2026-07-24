import { motion } from 'framer-motion';
import { FaHandshakeAngle } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function CollaborateSection() {
  return (
    <section style={{ backgroundColor: 'var(--primary-dark)', color: 'white', padding: '80px 0' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container" 
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}
      >
        <div style={{ flex: 1,  alignItems: 'center', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Colabora</h2>
          <p style={{ marginBottom: '20px', fontSize: '1.1rem', color: '#ccc' }}>Si quieres trabajar con nosotros, contáctanos</p>
          <Link to="/donar">
            <button className="btn-primary">Ver más</button>
          </Link>        
        </div>
        
        <div style={{ flex: 2, borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '40px', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
            Si tienes equipos o componentes en desuso, deseas establecer una alianza o colaborar con nosotros, no dudes en contactarnos
          </p>
        </div>
        
        <div style={{ flex: 1, textAlign: 'center', fontSize: '120px', color: 'var(--accent-green)' }}>
          <FaHandshakeAngle />
        </div>
      </motion.div>
    </section>
  );
}