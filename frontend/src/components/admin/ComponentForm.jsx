import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function ComponentForm({ initialData = null, isEdit = false }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Componente', 
    type: '',
    stock: '',
    condition: 'nuevo',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    
    try {
      if (isEdit) {
        await api.put(`inventario/componentes/${initialData.id}/`, formData);
      } else {
        await api.post('inventario/componentes/', formData);
      }
      
      navigate('/admin/inventario');
    } catch (error) {
      console.error("Error al guardar el componente:", error);
      alert('Hubo un error al guardar los datos en el servidor.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>Nombre del Componente</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" placeholder="Ej. Intel Core i5-10400F" />
        </div>
        
        <div>
          <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>Precio ($)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" className="form-input" placeholder="0.00" />
        </div>

        <div>
          <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>Categoría Principal</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={(e) => {
              const newCategory = e.target.value;
              setFormData({
                ...formData,
                category: newCategory,
                type: newCategory === 'PC' ? 'N/A' : formData.type 
              });
            }} 
            required 
            className="form-select"
          >
            <option value="Componente">Componente Suelto</option>
            <option value="PC">PC Completa</option>
          </select>
        </div>

        <div>
          <label className="form-label" style={{ fontWeight: '600', color: formData.category === 'PC' ? '#aaa' : '#333', marginBottom: '8px', display: 'block' }}>Tipo / Pieza</label>
          <select 
            name="type" 
            value={formData.type} 
            onChange={handleChange} 
            required 
            className="form-select"
            disabled={formData.category === 'PC'}
            style={{ backgroundColor: formData.category === 'PC' ? '#f5f5f5' : 'white' }}
          >
            <option value="">Seleccione una opción</option>
            <option value="Procesador">Procesador (CPU)</option>
            <option value="Ram">Memoria RAM</option>
            <option value="Tarjeta Gráfica">Tarjeta Gráfica (GPU)</option>
            <option value="Tarjeta Madre">Tarjeta Madre</option>
            <option value="PSU">Fuente de Poder</option>
            <option value="STORAGE">Almacenamiento</option>
            <option value="N/A">No Aplica (Para PCs)</option>
          </select>
        </div>

        <div>
          <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>Stock Disponible</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0" className="form-input" placeholder="0" />
        </div>
      </div>

      <div>
        <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>Condición</label>
        <select name="condition" value={formData.condition} onChange={handleChange} className="form-select">
          <option value="nuevo">Nuevo</option>
          <option value="usado_bueno">Usado (Buen Estado)</option>
          <option value="reparado">Reparado / Reacondicionado</option>
        </select>
      </div>

      <div>
        <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>Descripción / Detalles Técnicos</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="form-textarea" placeholder="Indica las especificaciones técnicas aquí..."></textarea>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginTop: '20px', justifyContent: 'flex-end' }}>
        <button type="button" onClick={() => navigate('/admin/inventario')} style={{ padding: '12px 25px', backgroundColor: 'transparent', border: '1px solid #ccc', color: '#555', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
          Cancelar
        </button>
        <button type="submit" className="btn-primary" style={{ padding: '12px 30px', backgroundColor: '#4CAF50' }}>
          {isEdit ? 'Guardar Cambios' : 'Añadir Componente'}
        </button>
      </div>
    </form>
  );
}