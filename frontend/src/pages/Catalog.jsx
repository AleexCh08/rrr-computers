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

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Todos');
  const [subCategory, setSubCategory] = useState('Todos');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const filteredComponents = components.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'Todos' || item.category === category;
    let matchesSubCategory = false;
    if (subCategory === 'Todos') {
      matchesSubCategory = true;
    } else {
      const safeType = item.type ? item.type.toLowerCase() : '';
      
      if (subCategory === 'Tarjeta Gráfica') {
        matchesSubCategory = safeType.includes('tarjeta gráfica') || safeType.includes('tarjeta grafica') || safeType.includes('gpu') || safeType.includes('video');
      } else if (subCategory === 'Tarjeta Madre') {
        matchesSubCategory = safeType.includes('tarjeta madre') || safeType.includes('motherboard') || safeType.includes('placa base');
      } else if (subCategory === 'Procesador') {
        matchesSubCategory = safeType.includes('procesador') || safeType.includes('cpu');
      } else if (subCategory === 'Ram') {
        matchesSubCategory = safeType.includes('ram') || safeType.includes('memoria');
      } else {
        matchesSubCategory = safeType === subCategory.toLowerCase();
      }
    }
    
    const matchesPrice = item.price >= minPrice && item.price <= maxPrice;  
    return matchesSearch && matchesCategory && matchesSubCategory && matchesPrice;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredComponents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredComponents.length / itemsPerPage);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await api.get('inventario/componentes/');
        const availableItems = response.data.results.filter(item => item.stock > 0);
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
          <div className="catalog-header">
            <div>
              <h1 style={{ fontSize: '2.8rem', color: 'var(--text-dark)', marginBottom: '10px' }}>Catálogo</h1>
              <div style={{ fontSize: '0.85rem', color: '#666', fontWeight: '500' }}>
                <Link to="/" style={{ color: '#333' }}>Home</Link> <span style={{ margin: '0 5px' }}>&gt;</span> Catálogo
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Buscar equipo o pieza..." 
                className="form-input" 
                style={{ width: '280px' }}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); 
                }}
              />
            </div>
          </div>

          <div className="catalog-body">
            
            <SidebarFilters 
              category={category}
              setCategory={setCategory}
              subCategory={subCategory}          
              setSubCategory={setSubCategory}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              setCurrentPage={setCurrentPage}
            />

            <div>
              <div className="product-grid">
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