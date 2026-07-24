import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fondo oscuro desvanecido */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              zIndex: 999,
            }}
          />
          
          {/* Ventana del Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: '-50%' }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              backgroundColor: 'white',
              padding: '50px 60px',
              borderRadius: '8px',
              zIndex: 1000,
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              maxWidth: '600px',
              width: '90%'
            }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '25px', color: 'var(--text-dark)' }}>
              {title}
            </h2>
            
            {children}
            <button 
              onClick={onClose}
              className="btn-primary"
              style={{ padding: '12px 40px', fontSize: '1.1rem' }}
            >
              Cerrar
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}