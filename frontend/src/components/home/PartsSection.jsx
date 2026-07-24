import { motion } from 'framer-motion';
import ProductCard from '../ui/ProductCard';
import ProductCarousel from '../ui/ProductCarousel';

import imgFuente from '../../assets/fuente.png';
import imgTeclado from '../../assets/teclado.png';

const partsData = [
  { image: imgFuente, price: "5", title: "Fuente", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { image: imgTeclado, price: "15", title: "Teclado", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { image: imgFuente, price: "80", title: "Fuente", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { image: imgTeclado, price: "10", title: "Teclado", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
];

export default function PartsSection() {
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
            {partsData.map((part) => (
              <ProductCard 
                key={part.id} 
                image={part.image} 
                price={part.price}
                title={part.title} 
                description={part.description} 
              />
            ))}
          </ProductCarousel>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <button className="btn-primary">Ver más</button>
        </div>
      </div>
    </motion.section>
  );
}