import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/ui/ProductCard';
import SidebarFilters from '../components/catalog/SidebarFilters';
import HelpBanner from '../components/catalog/HelpBanner';
import api from '../services/api';

import imgPc from '../assets/foto-pc.png'; 

export default function Catalog() {
  const [components, setComponents] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = components.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(components.length / itemsPerPage);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await api.get('inventario/componentes/');
        const availableItems = response.data.filter(item => item.stock > 0);
        setComponents(availableItems);
      } catch (error) {
        console.error("Error al cargar el catálogo:", error);
      }
    };
    fetchComponents();
  }, []);

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
                {currentItems.length === 0 ? (
                  <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666', fontSize: '1.2rem' }}>No hay componentes disponibles en este momento.</p>
                ) : (
                  currentItems.map(item => (
                    <ProductCard 
                      key={item.id}
                      id={item.id}
                      image={imgPc}
                      title={item.name}
                      price={item.price}
                      description={item.description || 'Sin descripción detallada.'} 
                    />
                  ))
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {totalPages > 1 && (
                  <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      style={{ padding: '10px 20px', background: currentPage === 1 ? '#f5f5f5' : 'white', border: 'none', borderRight: '1px solid #ddd', color: currentPage === 1 ? '#aaa' : 'var(--accent-green)', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: '600' }}
                    >
                      Anterior
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <button 
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        style={{ padding: '10px 20px', background: currentPage === i + 1 ? 'var(--accent-green)' : 'white', border: 'none', borderRight: '1px solid #ddd', color: currentPage === i + 1 ? 'white' : 'var(--accent-green)', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      style={{ padding: '10px 20px', background: currentPage === totalPages ? '#f5f5f5' : 'white', border: 'none', color: currentPage === totalPages ? '#aaa' : 'var(--accent-green)', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: '600' }}
                    >
                      Siguiente
                    </button>
                  </div>
                )}
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