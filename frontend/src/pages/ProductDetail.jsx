import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HelpBanner from '../components/catalog/HelpBanner';
import ProductGallery from '../components/ui/ProductGallery';

import imgPc from '../assets/foto-pc.png'; 

export default function ProductDetail() {
  const { id } = useParams(); 

  const productImages = [imgPc, imgPc, imgPc, imgPc];

  const specs = [
    { label: 'Procesador', value: 'Equipo pensado, para lorem ipsum, dolor sit amet, consectetur adipiscing' },
    { label: 'Almacenamiento', value: 'Equipo pensado, para lorem ipsum, dolor sit a' },
    { label: 'Memoria', value: 'Equipo pensado, para lorem ipsum, dolor sit amet, consectetur adipiscing' },
    { label: 'Puertos', value: 'Equipo pensado, para lorem ipsum, dolor sit amet, consectetur adipiscing\nEquipo pensado, para lorem ipsum, dolor sit amet, consectetur adipiscing' },
    { label: 'Tarjeta de video', value: 'Equipo pensado, para lorem ipsum, dolor sit amet, consectetur adipiscing' },
    { label: 'Software', value: 'Equipo pensado, para lorem ipsum, dolor sit amet, consectetur adipiscing\nEquipo pensado, para lorem ipsum, dolor sit amet, consectetur adipiscing' },
    { label: 'Torre', value: 'Equipo pensado, para lorem ipsum, dolor sit amet, consectetur adipiscing\nEquipo pensado, para lorem ipsum, dolor sit amet, consectetur adipiscing' },
  ];

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Navbar />
      
      <div style={{ height: '100px', backgroundColor: 'var(--primary-dark)', width: '100%', position: 'absolute', zIndex: 0 }}></div>

      <main className="container" style={{ flexGrow: 1, paddingTop: '30px', zIndex: 1, position: 'relative' }}>
        <div style={{ backgroundColor: 'white', padding: '50px 60px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
          
          <div style={{ fontSize: '0.9rem', marginBottom: '30px', color: '#666', fontWeight: '600' }}>
            <Link to="/" style={{ color: '#333' }}>Home</Link> <span style={{ margin: '0 8px', color: '#ccc' }}>&gt;</span> 
            <Link to="/catalogo" style={{ color: '#333' }}>Catálogo</Link> <span style={{ margin: '0 8px', color: '#ccc' }}>&gt;</span> 
            PC Ryzen 7 GD3000
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', marginBottom: '40px' }}>
            <ProductGallery images={productImages} />

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h1 style={{ fontSize: '2.2rem', color: 'var(--text-dark)', marginBottom: '15px' }}>PC Ryzen 7 GD3000</h1>
              <p style={{ fontSize: '1.05rem', color: '#444', lineHeight: '1.6', marginBottom: '20px' }}>
                Equipo pensado para lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor mattis facilisis. Donec ut facilisis urna, vel bibendum dolor. Praesent nulla quam, tempus id felis at<br/>
                Incluye Torre funcional, con cable de poder;<br/>
                Procesador consectetur, 4gb RAM, adipiscing elit.<br/>
                Sed auctor mattis facilisis. Donec ut facilisis urna, vel bibend, Win 10
              </p>
              <p style={{ fontSize: '1.05rem', color: '#444', marginBottom: '20px' }}>Garantia 6 meses</p>
              
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '20px' }}>Precio: 89$</h2>
              
              <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '15px', borderRadius: '4px', width: '100%', maxWidth: '350px' }}>
                Añadir al carrito
              </button>
            </div>
          </div>


          <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '40px 0' }} />
          <div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '10px' }}>Descripción Detallada</h3>
            <p style={{ fontSize: '1.05rem', color: '#444', lineHeight: '1.6', marginBottom: '40px' }}>
              Equipo pensado para lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor mattis facilisis. Donec ut facilisis urna, vel bibendum dolor. Praesent nulla quam, tempus id felis at
            </p>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '25px' }}>Características Detalladas</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '50px' }}>
              {specs.map((spec, index) => (
                <div key={index} style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px' }}>
                  <div style={{ fontWeight: '700', color: 'var(--text-dark)', fontSize: '1.05rem' }}>{spec.label}</div>
                  <div style={{ color: '#333', fontSize: '1.05rem', whiteSpace: 'pre-line' }}>{spec.value}</div>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: '1.1rem', color: 'var(--text-dark)', fontWeight: '700' }}>
              Puedes añadir otros componentes, como monitor o perifericos a tu compra
            </h4>
          </div>

        </div>
      </main>

      <HelpBanner />
      <Footer />
    </div>
  );
}