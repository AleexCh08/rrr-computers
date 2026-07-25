import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiPlus, FiAlertCircle } from 'react-icons/fi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Assemble() {
  // Estado inicial simulado de un ensamble (algunos con piezas, otros vacíos)
  const [build, setBuild] = useState([
    { id: 'cpu', category: 'Procesador (CPU)', selected: { name: 'Intel Core i5-10400F', price: 120 } },
    { id: 'mobo', category: 'Tarjeta Madre', selected: { name: 'MSI B460M PRO-VDH', price: 85 } },
    { id: 'ram', category: 'Memoria RAM', selected: null }, // Vacío para mostrar el estado de "Seleccionar"
    { id: 'gpu', category: 'Tarjeta Gráfica', selected: { name: 'NVIDIA GTX 1660 Super', price: 210 } },
    { id: 'storage', category: 'Almacenamiento', selected: null },
    { id: 'psu', category: 'Fuente de Poder', selected: { name: 'EVGA 500 W1, 80+ WHITE', price: 45 } },
    { id: 'case', category: 'Gabinete', selected: null },
  ]);

  const total = build.reduce((acc, item) => acc + (item.selected ? item.selected.price : 0), 0);
  const isComplete = build.every(item => item.selected !== null);

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Navbar />
      
      <div style={{ height: '80px', backgroundColor: 'var(--primary-dark)', width: '100%', position: 'absolute', zIndex: 0 }}></div>

      <main className="container" style={{ flexGrow: 1, paddingTop: '40px', zIndex: 1, position: 'relative' }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.9rem', marginBottom: '40px', color: '#666', fontWeight: '600' }}>
          <Link to="/" style={{ color: '#333' }}>Home</Link> <span style={{ margin: '0 8px', color: '#ccc' }}>&gt;</span> Ensamblar
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px', alignItems: 'start', marginBottom: '60px' }}>
          
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '30px' }}>
              <h1 style={{ fontSize: '2.2rem', color: 'var(--text-dark)', margin: 0 }}>Configurador de PC</h1>
              <p style={{ color: '#666', marginTop: '10px', fontSize: '1.05rem' }}>Selecciona los componentes para armar tu equipo ideal.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {build.map((item) => (
                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 100px 120px', alignItems: 'center', gap: '20px', padding: '20px', border: '1px solid #eaeaea', borderRadius: '8px', backgroundColor: item.selected ? '#fff' : '#fafafa' }}>
                  
                  {/* Categoría */}
                  <div style={{ fontWeight: '600', color: 'var(--text-dark)', fontSize: '1.05rem' }}>
                    {item.category}
                  </div>

                  <div style={{ color: item.selected ? '#333' : '#999', fontStyle: item.selected ? 'normal' : 'italic' }}>
                    {item.selected ? item.selected.name : 'Ningún componente seleccionado'}
                  </div>

                  <div style={{ fontWeight: '700', color: 'var(--text-dark)', textAlign: 'right', fontSize: '1.1rem' }}>
                    {item.selected ? `$${item.selected.price}` : ''}
                  </div>

                  <button style={{ 
                    padding: '10px 15px', 
                    backgroundColor: item.selected ? 'transparent' : 'var(--accent-green)', 
                    color: item.selected ? '#5A7D9A' : 'white', 
                    border: item.selected ? '1px solid #5A7D9A' : 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px'
                  }}>
                    {item.selected ? 'Cambiar' : <><FiPlus /> Elegir</>}
                  </button>

                </div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eaeaea', position: 'sticky', top: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '25px' }}>Resumen del Ensamble</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: '8px', fontWeight: '600', marginBottom: '25px', border: '1px solid #c8e6c9' }}>
              <FiCheckCircle size={20} /> Componentes Compatibles
            </div>

            {!isComplete && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '15px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: '8px', fontSize: '0.95rem', marginBottom: '25px', border: '1px solid #ffeeba' }}>
                <FiAlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Faltan componentes esenciales para que el equipo pueda funcionar.</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', color: 'var(--text-dark)', fontSize: '1.4rem', fontWeight: '700', paddingTop: '20px', borderTop: '1px solid #eee' }}>
              <span>Total estimado</span>
              <span>${total}</span>
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', padding: '15px', fontSize: '1.1rem', opacity: total > 0 ? 1 : 0.5, pointerEvents: total > 0 ? 'auto' : 'none' }}
            >
              Agregar al carrito
            </button>
            
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}