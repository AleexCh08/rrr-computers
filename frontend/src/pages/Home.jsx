import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MdRecycling } from 'react-icons/md';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PartsSection from '../components/home/PartsSection';
import CollaborateSection from '../components/home/CollaborateSection';
import ProductCard from '../components/ui/ProductCard';
import ProductCarousel from '../components/ui/ProductCarousel';
import api from '../services/api';

import imgPc from '../assets/foto-pc.png';

export default function Home() {
  const [pcs, setPcs] = useState([]);

  useEffect(() => {
    const fetchPCs = async () => {
      try {
        const response = await api.get('inventario/componentes/');
        const availablePCs = response.data.results.filter(item => item.category === 'PC' && item.stock > 0);
        setPcs(availablePCs);
      } catch (error) {
        console.error("Error al cargar las PCs para el Home:", error);
      }
    };
    fetchPCs();
  }, []);

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
        <div className="container hero-content" style={{ background: 'white', padding: '40px 50px', borderRadius: '15px', boxShadow: '0 12px 35px rgba(0,0,0,0.18)', border: '1px solid #d1d1d1' }}>
            
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }} 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}
            >
              <img src="/favicon.png" alt="RRR Computers Logo" style={{ width: '150px', objectFit: 'contain', filter: 'drop-shadow(0px 8px 15px rgba(0,0,0,0.1))' }} />
            </motion.div>

            <h1 className="hero-title" style={{ flex: '1 1 auto', textAlign: 'center' }}>
              Nuestro objetivo es Reparar, Reusar y Reciclar material electrónico, encontrándoles una segunda vida y utilidad
            </h1>
            
            <motion.div 
              className="hero-icon"
              whileHover={{ scale: 1.1, rotate: 2 }} 
              transition={{ duration: 0.3 }}
              style={{ flex: '0 0 auto' }}
            >
              <MdRecycling />
            </motion.div>
            
        </div>
      </motion.section>

      {/* CATÁLOGO SECTION */}
      <section className="container" style={{ padding: '40px 0' }}>
        <div className="catalog-layout" style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 12px 35px rgba(0,0,0,0.18)', border: '1px solid #d1d1d1' }}>
          <div className="catalog-text">
            <h2 className="section-title">Catálogo</h2>
            <p style={{ margin: '20px 0', color: '#555', fontSize: '1.1rem' }}>Encuentra computadoras prediseñadas</p>
            <Link to="/catalogo">
              <button className="btn-primary">Ver más</button>
            </Link>        
          </div>
          <div className="catalog-carousel">
             <ProductCarousel>
               {pcs.length === 0 ? (
                 <div style={{ width: '100%', textAlign: 'center', padding: '40px', color: '#666' }}>
                   <p>Cargando equipos disponibles...</p>
                 </div>
               ) : (
                 pcs.map((product) => (
                   <ProductCard 
                     key={product.id}
                     id={product.id} 
                     image={imgPc} 
                     price={product.price} 
                     title={product.name} 
                     description={product.description || 'Sin descripción detallada.'} 
                   />
                 ))
               )}
             </ProductCarousel>
          </div>
        </div>
      </section>

      {/* PERSONALIZA SECTION */}
      <section style={{ backgroundColor: 'var(--primary-dark)', color: 'white', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '50px' }}>Personaliza</h2>
          <div className="personalize-grid">
            <p style={{ fontSize: '1.1rem', color: '#ccc' }}>Diseña una computadora pensada en ti y tus necesidades</p>
            <p style={{ fontSize: '1.1rem', color: '#ccc' }}>Completa el formulario o contacta con nosotros para iniciar el proceso</p>
            <p style={{ fontSize: '1.1rem', color: '#ccc' }}>Ahorra costos comprando lo que necesitas</p>
          </div>
          <div className="personalize-actions">
            <Link to="/ensamblar">
              <button className="btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>Ensambla tu Computadora</button>
            </Link>
            <Link to="/nosotros">
              <button className="btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem', backgroundColor: '#4CAF50' }}>Sobre Nosotros</button>
            </Link>
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