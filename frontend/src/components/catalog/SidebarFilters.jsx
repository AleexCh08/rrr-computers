export default function SidebarFilters({ category, setCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, setCurrentPage }) {
  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    setCurrentPage(1);
  };

  return (
    <aside style={{ paddingRight: '30px', borderRight: '1px solid #eaeaea' }}>
      <h3 style={{ fontSize: '1.4rem', marginBottom: '25px', color: 'var(--text-dark)' }}>Filtros</h3>

      <div style={{ marginBottom: '25px' }}>
        <h4 style={{ fontSize: '1rem', marginBottom: '15px', color: 'var(--text-dark)' }}>Categoría</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: category === 'Todos' ? 'var(--text-dark)' : '#666', fontWeight: category === 'Todos' ? '700' : '500' }}>
            <input type="radio" checked={category === 'Todos'} onChange={() => handleCategoryChange('Todos')} style={{ cursor: 'pointer' }} /> 
            Mostrar Todos
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: category === 'PC' ? 'var(--text-dark)' : '#666', fontWeight: category === 'PC' ? '700' : '500' }}>
            <input type="radio" checked={category === 'PC'} onChange={() => handleCategoryChange('PC')} style={{ cursor: 'pointer' }} /> 
            PC Completas
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: category === 'Componente' ? 'var(--text-dark)' : '#666', fontWeight: category === 'Componente' ? '700' : '500' }}>
            <input type="radio" checked={category === 'Componente'} onChange={() => handleCategoryChange('Componente')} style={{ cursor: 'pointer' }} /> 
            Componentes Sueltos
          </label>
          
        </div>
      </div>

      {/* Filtro Dinámico de Precio */}
      <div style={{ marginBottom: '25px' }}>
        <h4 style={{ fontSize: '1rem', marginBottom: '15px', color: 'var(--text-dark)' }}>Rango de precios ($)</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span style={{ width: '50px', fontSize: '0.9rem', color: '#555' }}>Desde:</span>
          <input 
            type="number" 
            value={minPrice} 
            onChange={(e) => { setMinPrice(Number(e.target.value)); setCurrentPage(1); }} 
            className="form-input" 
            style={{ padding: '8px', width: '100%' }} 
            min="0"
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '50px', fontSize: '0.9rem', color: '#555' }}>Hasta:</span>
          <input 
            type="number" 
            value={maxPrice} 
            onChange={(e) => { setMaxPrice(Number(e.target.value)); setCurrentPage(1); }} 
            className="form-input" 
            style={{ padding: '8px', width: '100%' }} 
            min="0"
          />
        </div>
      </div>

    </aside>
  );
}