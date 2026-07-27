import { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import Modal from '../ui/Modal';
import api from '../../services/api';

export default function ReturnForm() {
  const [clientName, setClientName] = useState('');
  const [componentsList, setComponentsList] = useState([
    { id: Date.now(), type: '', condition: '', brand: '', reason: '' }
  ]);
  const [showModal, setShowModal] = useState(false);

  const addComponent = () => {
    setComponentsList([...componentsList, { id: Date.now(), type: '', condition: '', brand: '', reason: '' }]);
  };

  const removeComponent = (idToRemove) => {
    setComponentsList(componentsList.filter(comp => comp.id !== idToRemove));
  };

  const handleCompChange = (id, field, value) => {
    setComponentsList(componentsList.map(comp => comp.id === id ? { ...comp, [field]: value } : comp));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      for (const comp of componentsList) {
        await api.post('ordenes/devoluciones/', {
          client_name: clientName,
          item_name: `${comp.brand} (${comp.type.toUpperCase()}) - ${comp.condition}`,
          reason: comp.reason
        });
      }

      setShowModal(true); 
      setClientName('');
      setComponentsList([{ id: Date.now(), type: '', condition: '', brand: '', reason: '' }]); 
    } catch (error) {
      console.error("Error al registrar devolución:", error);
      alert("Hubo un error al procesar tu solicitud.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* NUEVA SECCIÓN: Identificación */}
        <section>
          <label className="form-label" style={{ fontSize: '1.2rem', marginBottom: '15px', display: 'block' }}>Datos del Cliente</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Nombre y apellido" 
            required 
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </section>

        <section>
          <label className="form-label" style={{ fontSize: '1.2rem', marginBottom: '15px', display: 'block' }}>
            Datos del Componente
          </label>

          {componentsList.map((comp, index) => (
            <div key={comp.id} style={{ backgroundColor: '#eaeaea', padding: '25px', borderRadius: '8px', marginBottom: '20px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4 style={{ fontSize: '1rem', margin: 0, fontWeight: '700', color: 'var(--text-dark)' }}>Componente #{index + 1}</h4>
                {index > 0 && (
                  <button type="button" onClick={() => removeComponent(comp.id)} style={{ background: 'none', border: 'none', color: '#d9534f', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    <FiTrash2 /> Quitar
                  </button>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <select value={comp.type} onChange={(e) => handleCompChange(comp.id, 'type', e.target.value)} className="form-select" style={{ flex: 1 }} required>
                  <option value="">Tipo de componente</option>
                  <option value="cpu">Procesador</option>
                  <option value="ram">Memoria RAM</option>
                  <option value="hdd">Disco Duro</option>
                  <option value="gpu">Tarjeta Gráfica</option>
                </select>
                
                <select value={comp.condition} onChange={(e) => handleCompChange(comp.id, 'condition', e.target.value)} className="form-select" style={{ flex: 1 }} required>
                  <option value="">Condición al comprarlo</option>
                  <option value="nuevo">Nuevo</option>
                  <option value="usado_bueno">Usado (Buen estado)</option>
                  <option value="reparado">Reparado</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <input type="text" value={comp.brand} onChange={(e) => handleCompChange(comp.id, 'brand', e.target.value)} className="form-input" placeholder="Marca y modelo" required />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.95rem' }}>Detalles de la Falla</label>
                <textarea value={comp.reason} onChange={(e) => handleCompChange(comp.id, 'reason', e.target.value)} className="form-textarea" placeholder="Indica aquí con detalles el tipo de falla que presenta" required></textarea>
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', gap: '20px', marginTop: '10px', justifyContent: 'center' }}>
            <button type="submit" style={{ padding: '12px 30px', fontSize: '1.05rem', backgroundColor: '#5A7D9A', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
              Solicitar Devolución
            </button>
            <button type="button" onClick={addComponent} className="btn-primary btn-icon" style={{ padding: '12px 30px', fontSize: '1.05rem' }}>
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