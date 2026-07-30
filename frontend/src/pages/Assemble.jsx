import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiPlus, FiAlertCircle } from 'react-icons/fi';
import { checkCompatibility } from '../services/compatibility'; 
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import api from '../services/api';
import Modal from '../components/ui/Modal';

export default function Assemble() {
  const [build, setBuild] = useState([
    { id: 'Procesador', category: 'Procesador (CPU)', selected: null, required: true },
    { id: 'Tarjeta Madre', category: 'Tarjeta Madre', selected: null, required: true },
    { id: 'Ram', category: 'Memoria RAM', selected: null, required: true },
    { id: 'Tarjeta Gráfica', category: 'Tarjeta Gráfica', selected: null, required: false },
    { id: 'STORAGE', category: 'Almacenamiento', selected: null, required: false },
    { id: 'PSU', category: 'Fuente de Poder', selected: null, required: false },
  ]);

  const [inventory, setInventory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await api.get('inventario/componentes/');
        setInventory(response.data.results.filter(item => item.category === 'Componente' && item.stock > 0));
      } catch (error) {
        console.error("Error al cargar inventario:", error);
      }
    };
    fetchComponents();
  }, []);

  const total = build.reduce((acc, item) => acc + (item.selected ? parseFloat(item.selected.price) : 0), 0);
  const hasAllEssentials = build.filter(item => item.required).every(item => item.selected !== null);
  
  const compatibilityErrors = checkCompatibility(build);
  const isComplete = hasAllEssentials && compatibilityErrors.length === 0;

  const openSelection = (categoryId) => {
    setActiveCategory(categoryId);
    setIsModalOpen(true);
  };

  const selectComponent = (component) => {
    setBuild(build.map(item => 
      item.id === activeCategory ? { ...item, selected: component } : item
    ));
    setIsModalOpen(false);
    setAlertMessage(`¡${component.name} añadido a tu ensamble!`);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const removeComponent = (categoryId) => {
    setBuild(build.map(item => 
      item.id === categoryId ? { ...item, selected: null } : item
    ));
  };

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Navbar />
      
      <div style={{ height: '80px', backgroundColor: 'var(--primary-dark)', width: '100%', position: 'absolute', zIndex: 0 }}></div>

      <main className="container" style={{ flexGrow: 1, paddingTop: '40px', zIndex: 1, position: 'relative' }}>
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
                  
                  <div style={{ fontWeight: '600', color: 'var(--text-dark)', fontSize: '1.05rem' }}>
                    {item.category}
                  </div>

                  <div style={{ color: item.selected ? '#333' : '#999', fontStyle: item.selected ? 'normal' : 'italic' }}>
                    {item.selected ? item.selected.name : 'Ningún componente seleccionado'}
                  </div>

                  <div style={{ fontWeight: '700', color: 'var(--text-dark)', textAlign: 'right', fontSize: '1.1rem' }}>
                    {item.selected ? `$${item.selected.price}` : ''}
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => openSelection(item.id)}
                      style={{ 
                        padding: '10px 15px', backgroundColor: item.selected ? 'transparent' : 'var(--accent-green)', color: item.selected ? '#5A7D9A' : 'white', border: item.selected ? '1px solid #5A7D9A' : 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', flexGrow: 1
                      }}>
                      {item.selected ? 'Cambiar' : <><FiPlus /> Elegir</>}
                    </button>
                    
                    {item.selected && (
                      <button 
                        onClick={() => removeComponent(item.id)}
                        style={{ padding: '10px 15px', backgroundColor: '#ffebee', color: '#c62828', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}
                        title="Quitar componente"
                      >
                        Quitar
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eaeaea', position: 'sticky', top: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '25px' }}>Resumen del Ensamble</h2>
            
            {alertMessage && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 15px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '8px', marginBottom: '20px', fontWeight: '600', borderLeft: '4px solid #28a745' }}>
                <FiCheckCircle size={20} /> {alertMessage}
              </div>
            )}

            {compatibilityErrors.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px' }}>
                {compatibilityErrors.map((error, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '15px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '8px', fontSize: '0.95rem', border: '1px solid #ffcdd2' }}>
                    <FiAlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontWeight: '600' }}>{error}</span>
                  </div>
                ))}
              </div>
            )}

            {compatibilityErrors.length === 0 && !hasAllEssentials && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '15px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: '8px', fontSize: '0.95rem', marginBottom: '25px', border: '1px solid #ffeeba' }}>
                <FiAlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Faltan componentes esenciales (Procesador, Tarjeta Madre o RAM) para que el equipo funcione.</span>
              </div>
            )}

            {isComplete && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: '8px', fontWeight: '600', marginBottom: '25px', border: '1px solid #c8e6c9' }}>
                <FiCheckCircle size={20} /> Componentes totalmente compatibles. ¡Tu PC encenderá!
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', color: 'var(--text-dark)', fontSize: '1.4rem', fontWeight: '700', paddingTop: '20px', borderTop: '1px solid #eee' }}>
              <span>Total estimado</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', padding: '15px', fontSize: '1.1rem', opacity: isComplete ? 1 : 0.5, pointerEvents: isComplete ? 'auto' : 'none' }}
            >
              Agregar al carrito
            </button>
            
          </div>

        </div>
        
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Seleccionar ${activeCategory}`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '60vh', overflowY: 'auto', paddingRight: '5px' }}>
            {inventory.filter(item => item.type === activeCategory).length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666', padding: '30px' }}>No hay componentes disponibles de este tipo en el inventario en este momento.</p>
            ) : (
              inventory.filter(item => item.type === activeCategory).map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #eaeaea', borderRadius: '8px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--text-dark)', fontSize: '1.1rem' }}>{item.name}</h4>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>En stock: {item.stock} unidades</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--text-dark)' }}>${item.price}</span>
                    <button onClick={() => selectComponent(item)} className="btn-primary" style={{ padding: '8px 15px', fontSize: '0.9rem', backgroundColor: 'var(--accent-green)' }}>
                      Elegir
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Modal>

      </main>
      <Footer />
    </div>
  );
}