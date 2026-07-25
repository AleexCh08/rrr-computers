import { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import Modal from '../ui/Modal';

export default function ReturnForm() {
  const [componentsList, setComponentsList] = useState([{ id: Date.now() }]);
  const [showModal, setShowModal] = useState(false);

  const addComponent = (e) => {
    e.preventDefault();
    setComponentsList([...componentsList, { id: Date.now() }]);
  };

  const removeComponent = (idToRemove) => {
    setComponentsList(componentsList.filter(comp => comp.id !== idToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset(); 
    setComponentsList([{ id: Date.now() }]); 
    setShowModal(true); 
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        <section>
          <label className="form-label" style={{ fontSize: '1.2rem', marginBottom: '15px', display: 'block' }}>
            Datos del Componente
          </label>

          {componentsList.map((comp, index) => (
            <div key={comp.id} style={{ backgroundColor: '#eaeaea', padding: '25px', borderRadius: '8px', marginBottom: '20px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4 style={{ fontSize: '1rem', margin: 0, fontWeight: '700', color: 'var(--text-dark)' }}>Componente #{index + 1}</h4>
                
                {index > 0 && (
                  <button 
                    type="button" 
                    onClick={() => removeComponent(comp.id)}
                    style={{ background: 'none', border: 'none', color: '#d9534f', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    <FiTrash2 /> Quitar
                  </button>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <select className="form-select" style={{ flex: 1 }}>
                  <option value="">Tipo de componente</option>
                  <option value="cpu">Procesador</option>
                  <option value="ram">Memoria RAM</option>
                  <option value="hdd">Disco Duro</option>
                </select>
                
                <select className="form-select" style={{ flex: 1 }}>
                  <option value="">Condición</option>
                  <option value="nuevo">Nuevo</option>
                  <option value="usado_bueno">Usado (Buen estado)</option>
                  <option value="dañado">Dañado (Para piezas)</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <input type="text" className="form-input" placeholder="Marca y modelo" />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.95rem' }}>Detalles de la Falla</label>
                <textarea className="form-textarea" placeholder="Indica aquí con detalles el tipo de falla que presenta"></textarea>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', gap: '20px', marginTop: '10px', justifyContent: 'center' }}>
            <button 
              type="submit" 
              style={{ padding: '12px 30px', fontSize: '1.05rem', backgroundColor: '#5A7D9A', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}
            >
              Solicitar Devolución
            </button>
            <button 
              type="button"
              onClick={addComponent} 
              className="btn-primary btn-icon" 
              style={{ padding: '12px 30px', fontSize: '1.05rem' }}
            >
              <FiPlus /> Agregar otro componente
            </button>
          </div>
        </section>
      </form>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="¡Tu devolución fue registrada con éxito!">
        <p style={{ fontSize: '1.15rem', marginBottom: '35px', fontWeight: '600', color: '#333', lineHeight: '1.5' }}>
          Nos pondremos en contacto contigo en<br />un plazo de 24-48 horas.
        </p>
      </Modal>
    </>
  );
}