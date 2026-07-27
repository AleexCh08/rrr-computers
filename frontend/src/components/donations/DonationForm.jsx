import { useState, useEffect } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import Modal from '../ui/Modal';
import api from '../../services/api';

export default function DonationForm() {
  const [showModal, setShowModal] = useState(false);
  const [donorData, setDonorData] = useState({
    name: '', email: '', phone: '', address: '', state: '', comments: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (localStorage.getItem('access_token')) {
        try {
          const response = await api.get('usuarios/perfil/');
          setDonorData(prevData => ({
            ...prevData,
            name: response.data.first_name || response.data.username || '',
            email: response.data.email || ''
          }));
        } catch (error) {
          console.error("El usuario no está autenticado. Formulario público.");
        }
      }
    };

    fetchUserData();
  }, []);

  const [componentsList, setComponentsList] = useState([
    { id: Date.now(), type: '', condition: '', brand: '', description: '' }
  ]);

  const handleDonorChange = (e) => setDonorData({ ...donorData, [e.target.name]: e.target.value });
  
  const handleCompChange = (id, field, value) => {
    setComponentsList(componentsList.map(comp => comp.id === id ? { ...comp, [field]: value } : comp));
  };

  const addComponent = () => setComponentsList([...componentsList, { id: Date.now(), type: '', condition: '', brand: '', description: '' }]);
  const removeComponent = (id) => setComponentsList(componentsList.filter(comp => comp.id !== id));

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    try {
      for (const comp of componentsList) {
        await api.post('inventario/donaciones/', {
          donor_name: donorData.name,
          email: donorData.email,
          phone: donorData.phone,
          address: `${donorData.address}, Estado: ${donorData.state}`,
          item_name: `${comp.brand} (${comp.type.toUpperCase()})`,
          condition: comp.condition,
          description: `Notas de pieza: ${comp.description} | Comentarios generales: ${donorData.comments}`
        });
      }

      setShowModal(true); 
      setDonorData({ name: '', email: '', phone: '', address: '', state: '', comments: '' });
      setComponentsList([{ id: Date.now(), type: '', condition: '', brand: '', description: '' }]);
    } catch (error) {
      console.error("Error al enviar la donación", error);
      alert("Hubo un error al registrar tu donación. Intenta de nuevo.");
    }
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
            <input type="text" name="name" value={donorData.name} onChange={handleDonorChange} className="form-input" placeholder="Nombre y apellido" required />
            <input type="email" name="email" value={donorData.email} onChange={handleDonorChange} className="form-input" placeholder="Email" required />
            <input type="tel" name="phone" value={donorData.phone} onChange={handleDonorChange} className="form-input" placeholder="Número telefónico" required />
          </div>
        </section>

        {/* SECCIÓN: Dirección */}
        <section>
          <label className="form-label">Dirección de recolección</label>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 2 }}>
              <input type="text" name="address" value={donorData.address} onChange={handleDonorChange} className="form-input" placeholder="Dirección exacta" required />
            </div>
            <div style={{ flex: 1 }}>
              <select name="state" value={donorData.state} onChange={handleDonorChange} className="form-select" required>
                <option value="">Estado</option>
                <option value="Distrito Capital">Distrito Capital</option>
                <option value="Miranda">Miranda</option>
                <option value="Vargas">Vargas</option>
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
                  <option value="">Condición</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Usado (Buen estado)">Usado (Buen estado)</option>
                  <option value="Dañado">Dañado (Para piezas)</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '15px' }}>
                <input type="text" value={comp.brand} onChange={(e) => handleCompChange(comp.id, 'brand', e.target.value)} className="form-input" placeholder="Marca y modelo" required />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '0.95rem' }}>Descripción adicional</label>
                <textarea value={comp.description} onChange={(e) => handleCompChange(comp.id, 'description', e.target.value)} className="form-textarea" placeholder="Información adicional (Opcional)"></textarea>
              </div>
            </div>
          ))}

          <button type="button" onClick={addComponent} className="btn-primary btn-icon" style={{ padding: '10px 20px' }}>
            <FiPlus /> Agregar otro componente
          </button>
        </section>

        {/* SECCIÓN: Comentarios Finales */}
        <section>
          <label className="form-label">Comentarios y Datos adicionales</label>
          <textarea name="comments" value={donorData.comments} onChange={handleDonorChange} className="form-textarea" placeholder="Cualquier información general adicional..."></textarea>
        </section>

        {/* BOTÓN DE ENVÍO */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button type="submit" className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
            Registrar donación
          </button>
        </div>

      </form>

      {/* MODAL */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="¡Gracias por tu generosidad!">
        <p style={{ fontSize: '1.1rem', marginBottom: '15px', fontWeight: '600', color: '#333' }}>
          Tu donación ha sido registrada con éxito.<br />Te agradecemos mucho por apoyar nuestra causa.
        </p>
      </Modal>
    </>
  );
}