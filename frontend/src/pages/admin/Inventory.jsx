import { useState } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import AdminNavbar from '../../components/admin/AdminNavbar';

export default function Inventory() {
  // Datos simulados basados en tu mockup
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Intel i3-8800', price: 50, type: 'CPU', stock: 5 },
    { id: 2, name: 'Intel i5-8800', price: 50, type: 'CPU', stock: 6 },
    { id: 3, name: 'Intel i9-8800', price: 50, type: 'CPU', stock: 7 },
    { id: 4, name: 'Ddr3 - 8GB', price: 50, type: 'RAM', stock: 2 },
    { id: 5, name: 'Ddr3 - 16GB', price: 50, type: 'RAM', stock: 3 },
    { id: 6, name: 'Ddr4 - 8GB', price: 50, type: 'RAM', stock: 4 },
    { id: 7, name: 'Nvidia 2060', price: 50, type: 'GPU', stock: 0 },
    { id: 8, name: 'Rx 580', price: 50, type: 'GPU', stock: 1 },
  ]);

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AdminNavbar />

      <main style={{ flexGrow: 1, padding: '40px' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Cabecera y Controles */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '2rem', color: 'var(--text-dark)', margin: 0 }}>Inventario</h1>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ position: 'relative' }}>
                <FiSearch style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#888' }} />
                <input 
                  type="text" 
                  placeholder="Nombre" 
                  style={{ padding: '10px 15px 10px 40px', border: '1px solid #ccc', borderRadius: '4px', width: '250px', fontSize: '1rem' }}
                />
              </div>
              <button className="btn-primary" style={{ backgroundColor: '#4CAF50', padding: '10px 25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Buscar
              </button>
              <button className="btn-primary" style={{ backgroundColor: '#4CAF50', padding: '10px 25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiPlus /> Añadir
              </button>
            </div>
          </div>

          {/* Tabla de Datos */}
          <div style={{ border: '1px solid #eaeaea', borderRadius: '8px', overflow: 'hidden' }}>
            {/* Encabezado */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 100px 100px', backgroundColor: '#4CAF50', color: 'white', fontWeight: '600', padding: '15px', textAlign: 'center' }}>
              <div style={{ textAlign: 'left', paddingLeft: '10px' }}>Nombre</div>
              <div>Precio</div>
              <div>Tipo</div>
              <div>Stock</div>
              <div>Editar</div>
              <div>Borrar</div>
            </div>

            {/* Filas */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {inventory.map((item, index) => (
                <div 
                  key={item.id} 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 100px 100px', 
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white', 
                    padding: '12px 15px', 
                    textAlign: 'center', 
                    alignItems: 'center',
                    borderBottom: '1px solid #eaeaea'
                  }}
                >
                  <div style={{ textAlign: 'left', paddingLeft: '10px', fontWeight: '500', color: '#333' }}>{item.name}</div>
                  <div style={{ color: '#555' }}>${item.price}</div>
                  <div>
                    <span style={{ backgroundColor: '#e2e8f0', color: '#475569', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600' }}>
                      {item.type}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: item.stock === 0 ? '#d9534f' : '#333', fontWeight: item.stock === 0 ? '700' : '500' }}>
                      {item.stock === 0 ? 'Agotado' : item.stock}
                    </span>
                  </div>
                  <div>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#333' }}><FiEdit size={18} /></button>
                  </div>
                  <div>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d9534f' }}><FiTrash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Paginación */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
              <button style={{ padding: '8px 16px', background: '#f5f5f5', border: 'none', borderRight: '1px solid #ddd', color: '#555', cursor: 'pointer', fontWeight: '600' }}>Anterior</button>
              <button style={{ padding: '8px 16px', background: '#4CAF50', border: 'none', borderRight: '1px solid #ddd', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>1</button>
              <button style={{ padding: '8px 16px', background: 'white', border: 'none', borderRight: '1px solid #ddd', color: '#4CAF50', cursor: 'pointer', fontWeight: 'bold' }}>2</button>
              <button style={{ padding: '8px 16px', background: 'white', border: 'none', borderRight: '1px solid #ddd', color: '#4CAF50', cursor: 'pointer', fontWeight: 'bold' }}>3</button>
              <button style={{ padding: '8px 16px', background: 'white', border: 'none', color: '#4CAF50', cursor: 'pointer', fontWeight: '600' }}>Siguiente</button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}