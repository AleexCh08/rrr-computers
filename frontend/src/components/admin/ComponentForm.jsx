import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ComponentForm({ initialData = null, isEdit = false }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    type: '',
    stock: '',
    condition: 'nuevo',
    description: ''
  });

  // Si hay datos iniciales (modo edición), llenamos el formulario
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la conexión al backend (POST para añadir, PUT para editar)
    console.log(isEdit ? 'Actualizando:' : 'Creando:', formData);
    
    // Simulamos que guardó y regresamos al inventario
    navigate('/admin/inventario');
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
          <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>Tipo / Categoría</label>
          <select name="type" value={formData.type} onChange={handleChange} required className="form-select">
            <option value="">Seleccione una opción</option>
            <option value="CPU">Procesador (CPU)</option>
            <option value="RAM">Memoria RAM</option>
            <option value="GPU">Tarjeta Gráfica (GPU)</option>
            <option value="MOBO">Tarjeta Madre</option>
            <option value="PSU">Fuente de Poder</option>
            <option value="STORAGE">Almacenamiento</option>
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