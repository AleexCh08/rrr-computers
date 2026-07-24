import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/ui/ProductCard';
import SidebarFilters from '../components/catalog/SidebarFilters';
import HelpBanner from '../components/catalog/HelpBanner';

import imgPc from '../assets/foto-pc.png'; 

export default function Catalog() {
  const catalogItems = Array.from({ length: 9 }).map((_, index) => ({
    id: index + 1,
    image: imgPc,
    title: `Computadora ${index + 1}`, 
    price: "89",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }));

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Navbar />
      
      <div style={{ height: '80px', backgroundColor: 'var(--primary-dark)', width: '100%', position: 'absolute', zIndex: 0 }}></div>

      <main className="container" style={{ flexGrow: 1, paddingTop: '30px', zIndex: 1, position: 'relative' }}>
        
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #eaeaea', paddingBottom: '20px', marginBottom: '30px' }}>
            <div>
              <h1 style={{ fontSize: '2.8rem', color: 'var(--text-dark)', marginBottom: '10px' }}>Catálogo</h1>
              <div style={{ fontSize: '0.85rem', color: '#666', fontWeight: '500' }}>
                <Link to="/" style={{ color: '#333' }}>Home</Link> <span style={{ margin: '0 5px' }}>&gt;</span> Catálogo
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" placeholder="Nombre" className="form-input" style={{ width: '250px' }} />
              <button className="btn-primary" style={{ padding: '10px 25px' }}>Buscar</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '40px' }}>
            
            <SidebarFilters />

            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '50px' }}>
                {catalogItems.map(item => (
                  <ProductCard 
                    key={item.id}
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    description={item.description}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                  <button style={{ padding: '10px 20px', background: '#f5f5f5', border: 'none', borderRight: '1px solid #ddd', color: '#555', cursor: 'pointer', fontWeight: '600' }}>Anterior</button>
                  <button style={{ padding: '10px 20px', background: 'var(--accent-green)', border: 'none', borderRight: '1px solid #ddd', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>1</button>
                  <button style={{ padding: '10px 20px', background: 'white', border: 'none', borderRight: '1px solid #ddd', color: 'var(--accent-green)', cursor: 'pointer', fontWeight: 'bold' }}>2</button>
                  <button style={{ padding: '10px 20px', background: 'white', border: 'none', borderRight: '1px solid #ddd', color: 'var(--accent-green)', cursor: 'pointer', fontWeight: 'bold' }}>3</button>
                  <button style={{ padding: '10px 20px', background: 'white', border: 'none', color: 'var(--accent-green)', cursor: 'pointer', fontWeight: '600' }}>Siguiente</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <HelpBanner />
      <Footer />
    </div>
  );
}