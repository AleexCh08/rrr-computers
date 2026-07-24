import { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import Modal from '../ui/Modal';

export default function DonationForm() {
  // Estado para manejar múltiples componentes dinámicamente
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
    e.preventDefault(); // Evita que la página se recargue
    setShowModal(true); // Muestra el modal
    e.target.reset(); 
    setComponentsList([{ id: Date.now() }]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* SECCIÓN: Datos Personales */}
        <section>
          <label className="form-label">Datos Personales</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" className="form-input" placeholder="Nombre y apellido" required />
            <input type="email" className="form-input" placeholder="Email" required />
            <input type="tel" className="form-input" placeholder="Número telefónico" required />
          </div>
        </section>

        {/* SECCIÓN: Dirección */}
        <section>
          <label className="form-label">Direccion de recolección</label>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 2 }}>
              <input type="text" className="form-input" placeholder="Dirección" required />
            </div>
            <div style={{ flex: 1 }}>
              <select className="form-select" required>
                <option value="">Estado</option>
                <option value="1">Distrito Capital</option>
                <option value="2">Miranda</option>
                <option value="3">Vargas</option>
              </select>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Componentes Dinámicos */}
        <section>
          <label className="form-label">Componentes a donar</label>
          
          {componentsList.map((comp, index) => (
            <div key={comp.id} style={{ backgroundColor: '#eaeaea', padding: '25px', borderRadius: '8px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4 style={{ fontSize: '1rem', margin: 0 }}>Componente #{index + 1}</h4>
                
                {/* Solo mostramos el botón de quitar si no es el primer componente */}
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
                <select className="form-select" style={{ flex: 1 }} required>
                  <option value="">Tipo de componente</option>
                  <option value="cpu">Procesador</option>
                  <option value="ram">Memoria RAM</option>
                  <option value="hdd">Disco Duro</option>
                </select>
                
                <select className="form-select" style={{ flex: 1 }} required>
                  <option value="">Condición</option>
                  <option value="nuevo">Nuevo</option>
                  <option value="usado_bueno">Usado (Buen estado)</option>
                  <option value="dañado">Dañado (Para piezas)</option>
                </select>
              </div>

              <div className="form-group">
                <input type="text" className="form-input" placeholder="Marca y modelo" required />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.95rem' }}>Descripción adicional</label>
                <textarea className="form-textarea" placeholder="Informacion adicional que quieras compartir acerca del componente"></textarea>
              </div>
            </div>
          ))}

          <button 
            type="button"
            onClick={addComponent} 
            className="btn-primary btn-icon" 
            style={{ padding: '10px 20px' }}
          >
            <FiPlus /> Agregar otro componente
          </button>
        </section>

        {/* SECCIÓN: Comentarios Finales */}
        <section>
          <label className="form-label">Comentarios y Datos adicionales</label>
          <textarea className="form-textarea" placeholder="Lorem ipsum"></textarea>
        </section>

        {/* BOTÓN DE ENVÍO */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button type="submit" className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
            Registrar donación
          </button>
        </div>

      </form>

      {/* MODAL */}
      <Modal isOpen={showModal} onClose={handleCloseModal} />
    </>
  );
}