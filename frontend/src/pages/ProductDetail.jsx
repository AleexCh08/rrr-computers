import { useState, useEffect } from 'react'; 
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HelpBanner from '../components/catalog/HelpBanner';
import ProductGallery from '../components/ui/ProductGallery';
import api from '../services/api';

import imgPc from '../assets/foto-pc.png'; 

export default function ProductDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const productImages = [imgPc, imgPc, imgPc, imgPc];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`inventario/componentes/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!localStorage.getItem('access_token')) {
      alert("Debes iniciar sesión para añadir productos al carrito.");
      navigate('/login');
      return;
    }

    if (product.stock <= 0) {
      alert("Este producto se encuentra agotado actualmente.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex >= 0) {
      if (cart[existingItemIndex].quantity < product.stock) {
        cart[existingItemIndex].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`¡Añadiste otra unidad de ${product.name} al carrito!`);
      } else {
        alert("No puedes añadir más unidades de las que hay en stock.");
      }
    } else {
      cart.push({ id: product.id, name: product.name, price: parseFloat(product.price), quantity: 1, image: imgPc });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`¡${product.name} añadido al carrito con éxito!`);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar /><div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><h2>Cargando información del producto...</h2></div><Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar /><div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><h2>El producto no existe o fue eliminado.</h2></div><Footer />
      </div>
    );
  }

  const conditionText = {
    'nuevo': 'Nuevo',
    'usado_bueno': 'Usado (Buen Estado)',
    'reparado': 'Reparado / Reacondicionado'
  }[product.condition] || 'No especificada';

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Navbar />
      
      <div style={{ height: '100px', backgroundColor: 'var(--primary-dark)', width: '100%', position: 'absolute', zIndex: 0 }}></div>

      <main className="container" style={{ flexGrow: 1, paddingTop: '30px', zIndex: 1, position: 'relative' }}>
        <div style={{ backgroundColor: 'white', padding: '50px 60px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
          
          <div style={{ fontSize: '0.9rem', marginBottom: '30px', color: '#666', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ color: '#333', textDecoration: 'none' }}>Home</Link> <span style={{ margin: '0 8px', color: '#ccc' }}>&gt;</span> 
            <Link to="/catalogo" style={{ color: '#333', textDecoration: 'none' }}>Catálogo</Link> <span style={{ margin: '0 8px', color: '#ccc' }}>&gt;</span> 
            <span style={{ color: '#888' }}>{product.category === 'PC' ? 'Computadoras' : 'Componentes'}</span> <span style={{ margin: '0 8px', color: '#ccc' }}>&gt;</span>
            <span style={{ color: 'var(--text-dark)' }}>{product.name}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', marginBottom: '40px' }}>
            <ProductGallery images={productImages} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <h1 style={{ fontSize: '2.2rem', color: 'var(--text-dark)', margin: 0 }}>{product.name}</h1>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <span style={{ 
                  backgroundColor: product.stock > 0 ? '#e8f5e9' : '#ffebee', 
                  color: product.stock > 0 ? '#2e7d32' : '#c62828', 
                  padding: '6px 12px', borderRadius: '4px', fontSize: '0.9rem', fontWeight: '700' 
                }}>
                  {product.stock > 0 ? `En Stock (${product.stock} disponibles)` : 'Agotado'}
                </span>
              </div>

              <p style={{ fontSize: '1.05rem', color: '#444', lineHeight: '1.6', marginBottom: '30px' }}>
                {product.description ? product.description.substring(0, 150) + '...' : 'Sin descripción breve disponible.'}
              </p>
              
              <h2 style={{ fontSize: '2rem', color: 'var(--text-dark)', marginBottom: '30px', fontWeight: '800' }}>
                ${product.price}
              </h2>
              
              <button 
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="btn-primary" 
                style={{ 
                  fontSize: '1.1rem', padding: '15px', borderRadius: '4px', width: '100%', maxWidth: '350px',
                  backgroundColor: product.stock <= 0 ? '#ccc' : 'var(--accent-green)',
                  cursor: product.stock <= 0 ? 'not-allowed' : 'pointer'
                }}
              >
                {product.stock > 0 ? 'Añadir al carrito' : 'Sin disponibilidad'}
              </button>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #eaeaea', margin: '50px 0' }} />
          
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '20px', borderBottom: '2px solid var(--accent-green)', display: 'inline-block', paddingBottom: '5px' }}>
                Descripción Detallada
              </h3>
              <p style={{ fontSize: '1.05rem', color: '#444', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                {product.description || 'Este artículo no posee una descripción detallada en este momento.'}
              </p>
            </div>

            <div style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '8px', border: '1px solid #eaeaea', height: 'fit-content' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-dark)', margin: '0 0 20px 0' }}>Ficha Técnica</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
                  <span style={{ color: '#666', fontWeight: '600' }}>Clasificación</span>
                  <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>{product.category === 'PC' ? 'Computadora' : 'Pieza/Componente'}</span>
                </div>

                {product.category === 'Componente' && product.type !== 'N/A' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
                    <span style={{ color: '#666', fontWeight: '600' }}>Tipo</span>
                    <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>{product.type}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
                  <span style={{ color: '#666', fontWeight: '600' }}>Estado Físico</span>
                  <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>{conditionText}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
                  <span style={{ color: '#666', fontWeight: '600' }}>Disponibilidad</span>
                  <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>{product.stock} Unidad(es)</span>
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