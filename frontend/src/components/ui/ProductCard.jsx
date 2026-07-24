import { motion } from 'framer-motion';
import { FiShoppingCart } from 'react-icons/fi';

export default function ProductCard({ image, price, title, description }) {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 8px 25px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.3 }}
      className="product-card" 
      style={{ 
        border: '1px solid #eaeaea', 
        padding: '15px', 
        borderRadius: '12px', 
        textAlign: 'center', 
        minWidth: '200px',
        maxWidth: '220px',
        flex: '0 0 auto',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer'
      }}
    >
      {/* Contenedor de imagen más pequeño y compacto */}
      <div style={{ backgroundColor: '#f4f4f4', borderRadius: '8px', padding: '10px', marginBottom: '12px', display: 'flex', justifyContent: 'center', width: '100%' }}>
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={image} 
          alt={title} 
          style={{ width: '100%', height: '120px', objectFit: 'contain' }} 
        />
      </div>
      
      {/* Textos centrados y reducidos a 2 líneas */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
        <div>
          <h1 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-dark)', textTransform: 'capitalize', margin: '0 0 6px 0' }}>{title}</h1>
          <p style={{ 
            fontSize: '0.8rem', 
            color: '#777', 
            lineHeight: '1.3', 
            marginBottom: '12px',
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden' 
          }}>
            {description}
          </p>
        </div>
        
        {/* Precio centrado y botón apilado debajo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', borderTop: '1px solid #eee', paddingTop: '12px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-dark)', margin: 0 }}>${price}</h3>
          
          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: 'var(--accent-green-hover)' }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              backgroundColor: 'var(--accent-green)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '20px', 
              padding: '6px 16px',
              fontSize: '0.85rem',
              fontWeight: '600',
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            <FiShoppingCart size={16} /> Agregar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}