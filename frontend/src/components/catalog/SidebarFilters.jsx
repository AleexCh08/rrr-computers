export default function SidebarFilters() {
  const renderCheckboxGroup = (title, options) => (
    <div style={{ marginBottom: '25px' }}>
      <h4 style={{ fontSize: '1rem', marginBottom: '10px', color: 'var(--text-dark)' }}>{title}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {options.map((opt, idx) => (
          <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#444', cursor: 'pointer' }}>
            <input type="checkbox" style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <aside style={{ paddingRight: '30px', borderRight: '1px solid #eaeaea' }}>
      <h3 style={{ fontSize: '1.4rem', marginBottom: '25px', color: 'var(--text-dark)' }}>Filtros</h3>
      
      <div style={{ marginBottom: '25px' }}>
        <h4 style={{ fontSize: '1rem', marginBottom: '15px', color: 'var(--text-dark)' }}>Rango de precios</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span style={{ width: '50px', fontSize: '0.9rem', color: '#555' }}>Desde:</span>
          <input type="number" defaultValue={50} className="form-input" style={{ padding: '8px', width: '100%' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '50px', fontSize: '0.9rem', color: '#555' }}>Hasta:</span>
          <input type="number" defaultValue={200} className="form-input" style={{ padding: '8px', width: '100%' }} />
        </div>
      </div>

      {renderCheckboxGroup('Estudio', ['Navegación', 'Programación', 'Todos'])}
      {renderCheckboxGroup('Trabajo', ['Navegación', 'Programación', 'Edición de Video', 'Todos'])}
      {renderCheckboxGroup('Ocio', ['Navegación', 'Multimedia', 'Juegos', 'Todos'])}
      {renderCheckboxGroup('Tipo', ['Ram', 'Tarjeta Madre', 'Procesador', 'Tarjeta Gráfica'])}
      {renderCheckboxGroup('Estado', ['Nuevo', 'Usado'])}
    </aside>
  );
}