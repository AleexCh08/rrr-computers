import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import AdminNavbar from '../../components/admin/AdminNavbar';
import api from '../../services/api';

export default function Inventory() {
  const [alertMessage, setAlertMessage] = useState(null);

  const triggerAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  const [inventory, setInventory] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inventory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(inventory.length / itemsPerPage);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este componente de la base de datos?')) {
      try {
        await api.delete(`inventario/componentes/${id}/`);
        
        setInventory(inventory.filter(item => item.id !== id)); 
  
        triggerAlert('Componente eliminado con éxito de la base de datos');
      } catch (error) {
        console.error("Detalle del error al eliminar:", error.response?.data || error.message);
        if (error.response?.status === 401) {
          triggerAlert('Tu sesión expiró por seguridad. Vuelve a iniciar sesión.');
        } else {
          triggerAlert('Error al intentar eliminar el componente. Revisa la consola.');
        }
      }
    }
  };

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await api.get('inventario/componentes/');
        setInventory(response.data); 
      } catch (error) {
        console.error("Error al cargar el inventario:", error);
      }
    };

    fetchInventory();
  }, []);

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
              <Link to="/admin/inventario/nuevo" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ backgroundColor: '#4CAF50', padding: '10px 25px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <FiPlus /> Añadir
                </button>
              </Link>
            </div>
          </div>

          {alertMessage && (
            <div style={{ 
              backgroundColor: '#ebebeb', 
              borderLeft: '5px solid #4CAF50', 
              padding: '12px 20px', 
              marginBottom: '25px', 
              color: '#111', 
              fontWeight: '600',
              fontSize: '1.05rem',
              display: 'inline-block',
              minWidth: '350px'
            }}>
              {alertMessage}
            </div>
          )}

          <div style={{ border: '1px solid #eaeaea', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 100px 100px', backgroundColor: '#4CAF50', color: 'white', fontWeight: '600', padding: '15px', textAlign: 'center' }}>
              <div style={{ textAlign: 'left', paddingLeft: '10px' }}>Nombre</div>
              <div>Precio</div>
              <div>Tipo</div>
              <div>Stock</div>
              <div>Editar</div>
              <div>Borrar</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {currentItems.map((item, index) => (
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
                    <Link to={`/admin/inventario/editar/${item.id}`}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#333' }}>
                        <FiEdit size={18} />
                      </button>
                    </Link>
                  </div>
                  <div>
                    <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d9534f' }}>
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            {totalPages > 1 && (
              <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{ padding: '8px 16px', background: currentPage === 1 ? '#f5f5f5' : 'white', border: 'none', borderRight: '1px solid #ddd', color: currentPage === 1 ? '#aaa' : '#4CAF50', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: '600' }}
                >
                  Anterior
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    style={{ padding: '8px 16px', background: currentPage === i + 1 ? '#4CAF50' : 'white', border: 'none', borderRight: '1px solid #ddd', color: currentPage === i + 1 ? 'white' : '#4CAF50', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  style={{ padding: '8px 16px', background: currentPage === totalPages ? '#f5f5f5' : 'white', border: 'none', color: currentPage === totalPages ? '#aaa' : '#4CAF50', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: '600' }}
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}