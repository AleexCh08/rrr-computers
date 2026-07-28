import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../ui/ProductCard';
import ProductCarousel from '../ui/ProductCarousel';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import imgFuente from '../../assets/fuente.png';

export default function PartsSection() {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await api.get('inventario/componentes/');
        const availableParts = response.data.filter(item => item.category === 'Componente' && item.stock > 0);
        setComponents(availableParts);
      } catch (error) {
        console.error("Error al cargar los componentes para el Home:", error);
      }
    };
    fetchComponents();
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="container" 
      style={{ padding: '40px 0' }}
    >
      <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 12px 35px rgba(0,0,0,0.18)', border: '1px solid #d1d1d1' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Piezas</h2>
          <p style={{ marginBottom: '40px', color: '#555' }}>Si necesitas alguna pieza o componente en particular, revisa nuestro catálogo</p>
        </div>
        
        <div style={{ marginBottom: '40px' }}>
          <ProductCarousel>
            {components.length === 0 ? (
              <div style={{ width: '100%', textAlign: 'center', padding: '40px', color: '#666' }}>
                <p>Cargando piezas disponibles...</p>
              </div>
            ) : (
              components.map((part) => (
                <ProductCard 
                  key={part.id}
                  id={part.id} 
                  image={imgFuente} 
                  price={part.price}
                  title={part.name} 
                  description={part.description || 'Sin descripción detallada.'} 
                />
              ))
            )}
          </ProductCarousel>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <Link to="/catalogo">
            <button className="btn-primary">Ver más</button>
          </Link>          
        </div>
      </div>
    </motion.section>
  );
}