import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Lógica para actualizar cantidades
  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 }; 
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Cálculos
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 10 : 0; 
  const total = subtotal + shipping;

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Navbar />
      
      {/* Fondo azul superior */}
      <div style={{ height: '80px', backgroundColor: 'var(--primary-dark)', width: '100%', position: 'absolute', zIndex: 0 }}></div>

      <main className="container" style={{ flexGrow: 1, paddingTop: '40px', zIndex: 1, position: 'relative' }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.9rem', marginBottom: '30px', color: '#fff', fontWeight: '500' }}>
          <Link to="/" style={{ color: '#ddd' }}>Home</Link> <span style={{ margin: '0 8px', color: '#aaa' }}>&gt;</span> Carrito
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '30px', alignItems: 'start', marginBottom: '60px' }}>
          
          {/* COLUMNA IZQUIERDA: Lista de Productos */}
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
            <h1 style={{ fontSize: '2.2rem', color: 'var(--text-dark)', marginBottom: '30px' }}>Tu Carrito</h1>
            
            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Tu carrito está vacío.</p>
                <Link to="/catalogo">
                  <button className="btn-primary">Volver al catálogo</button>
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {cartItems.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingBottom: '25px', borderBottom: '1px solid #eee' }}
                  >
                    {/* Imagen del producto */}
                    <div style={{ width: '90px', height: '90px', backgroundColor: '#f4f4f4', borderRadius: '8px', padding: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>

                    {/* Detalles del producto */}
                    <div style={{ flexGrow: 1 }}>
                      <h3 style={{ fontSize: '1.1rem', color: 'var(--text-dark)', marginBottom: '8px', fontWeight: '600' }}>{item.name}</h3>
                      <p style={{ fontSize: '1.2rem', fontWeight: '700', color: '#333' }}>${item.price}</p>
                    </div>

                    {/* Controles de Cantidad Profesionales */}
                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
                      <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: '#555' }}>
                        <FiMinus />
                      </button>
                      <span style={{ width: '35px', textAlign: 'center', fontWeight: '600', fontSize: '1rem' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', color: '#555' }}>
                        <FiPlus />
                      </button>
                    </div>

                    {/* Precio Total por Item y Botón de Eliminar */}
                    <div style={{ width: '100px', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-dark)' }}>
                        ${item.price * item.quantity}
                      </span>
                      <button 
                        onClick={() => removeItem(item.id)} 
                        style={{ background: 'none', border: 'none', color: '#d9534f', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', fontWeight: '500' }}
                      >
                        <FiTrash2 /> Quitar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* COLUMNA DERECHA: Resumen de Orden */}
          <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eaeaea', position: 'sticky', top: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>Resumen de Compra</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#555', fontSize: '1.05rem' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: '600', color: '#333' }}>${subtotal}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', color: '#555', fontSize: '1.05rem' }}>
              <span>Envío estimado</span>
              <span style={{ fontWeight: '600', color: '#333' }}>${shipping}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', color: 'var(--text-dark)', fontSize: '1.3rem', fontWeight: '700', paddingTop: '15px', borderTop: '1px solid #eee' }}>
              <span>Total</span>
              <span>${total}</span>
            </div>

            <Link to="/checkout" style={{ textDecoration: 'none' }}>
              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '15px', fontSize: '1.1rem', marginBottom: '15px', opacity: cartItems.length === 0 ? 0.5 : 1, pointerEvents: cartItems.length === 0 ? 'none' : 'auto' }}
              >
                Proceder al pago
              </button>
            </Link>
            
            <Link to="/catalogo">
              <button style={{ width: '100%', padding: '15px', fontSize: '1.05rem', backgroundColor: 'transparent', color: '#5A7D9A', border: '1px solid #5A7D9A', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
                Seguir Comprando
              </button>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}