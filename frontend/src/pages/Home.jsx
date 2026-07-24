import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MdRecycling } from 'react-icons/md';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PartsSection from '../components/home/PartsSection';
import CollaborateSection from '../components/home/CollaborateSection';
import ProductCard from '../components/ui/ProductCard';
import ProductCarousel from '../components/ui/ProductCarousel';

import imgPc from '../assets/foto-pc.png';

const catalogData = [
  { image: imgPc, price: "89", title: "Computadora 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { image: imgPc, price: "89", title: "Computadora 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { image: imgPc, price: "89", title: "Computadora 3", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { image: imgPc, price: "89", title: "Computadora 4", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
];

export default function Home() {
  return (
    <div className="home-page">
      <Navbar />
      
      {/* HERO SECTION ANIMADO */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ padding: '60px 20px', textAlign: 'center', position: 'relative', zIndex: 10 }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '65%', backgroundColor: 'var(--primary-dark)', zIndex: -1 }}></div>
        
        <div className="container" style={{ background: 'white', padding: '50px', borderRadius: '15px', boxShadow: '0 12px 35px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '60px', border: '1px solid #d1d1d1' }}>
            <h1 style={{ fontSize: '2.5rem', maxWidth: '650px', textAlign: 'center', lineHeight: '1.3' }}>
              Nuestro objetivo es Reparar, Reusar y Reciclar material electrónico, encontrándoles una segunda vida y utilidad
            </h1>
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              transition={{ duration: 0.3 }}
              style={{ fontSize: '140px', color: 'var(--accent-green)', cursor: 'pointer', display: 'flex' }}
            >
              <MdRecycling />
            </motion.div>
        </div>
      </motion.section>

      {/* CATÁLOGO SECTION */}
      <section className="container" style={{ padding: '40px 0' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 12px 35px rgba(0,0,0,0.18)', border: '1px solid #d1d1d1', display: 'flex', gap: '50px' }}>
          <div style={{ width: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem' }}>Catálogo</h2>
            <p style={{ margin: '20px 0', color: '#555', fontSize: '1.1rem' }}>Encuentra computadoras prediseñadas</p>
            <Link to="/catalogo">
              <button className="btn-primary">Ver más</button>
            </Link>        
          </div>
          <div style={{ width: '75%' }}>
             <ProductCarousel>
               {catalogData.map((product) => (
                 <ProductCard 
                   key={product.id} 
                   image={product.image} 
                   price={product.price} 
                   title={product.title} 
                   description={product.description} 
                 />
               ))}
             </ProductCarousel>
          </div>
        </div>
      </section>

      {/* PERSONALIZA SECTION */}
      <section style={{ backgroundColor: 'var(--primary-dark)', color: 'white', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '50px' }}>Personaliza</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginBottom: '50px' }}>
            <p style={{ fontSize: '1.1rem', color: '#ccc' }}>Diseña una computadora pensada en ti y tus necesidades</p>
            <p style={{ fontSize: '1.1rem', color: '#ccc' }}>Completa el formulario o contacta con nosotros para iniciar el proceso</p>
            <p style={{ fontSize: '1.1rem', color: '#ccc' }}>Ahorra costos comprando lo que necesitas</p>
          </div>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button className="btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>Ensambla tu Computadora</button>
            <button className="btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem', backgroundColor: '#4CAF50' }}>Sobre Nosotros</button>
          </div>
        </div>
      </section>

      <PartsSection />
      <CollaborateSection />
      <section style={{ backgroundColor: '#fff', textAlign: 'center', padding: '60px 20px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '500', maxWidth: '800px', lineHeight: '1.5', color: 'var(--text-dark)' }}>
            Estamos interesados en proveer equipos a quien lo necesite, esto incluye a personas, institutos, universidades y organizaciones
          </h3>
        </div>
      </section>
      <Footer />
      
    </div>
  );
}