import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AdminNavbar from '../../components/admin/AdminNavbar';
import ComponentForm from '../../components/admin/ComponentForm';
import api from '../../services/api';

export default function EditComponent() {
  const { id } = useParams();

  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComponent = async () => {
      try {
        const response = await api.get(`inventario/componentes/${id}/`);
        setFetchedData(response.data);
      } catch (error) {
        console.error("Error al cargar el componente:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchComponent();
  }, [id]);

  return (
    <div style={{ backgroundColor: '#f4f6f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AdminNavbar />

      <main style={{ flexGrow: 1, padding: '40px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', width: '100%', maxWidth: '800px', border: '1px solid #eaeaea' }}>
          
          <div style={{ fontSize: '0.9rem', marginBottom: '25px', color: '#666', fontWeight: '600' }}>
            <Link to="/admin/inventario" style={{ color: '#5A7D9A', textDecoration: 'none' }}>Inventario</Link> <span style={{ margin: '0 8px', color: '#ccc' }}>&gt;</span> Editar Componente
          </div>

          <h1 style={{ fontSize: '2rem', color: 'var(--text-dark)', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            Editar Componente <span style={{ color: '#888', fontSize: '1.2rem' }}>#{id}</span>
          </h1>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', fontWeight: '600', color: '#555' }}>
              Cargando datos del componente...
            </div>
          ) : (
            <ComponentForm initialData={fetchedData} isEdit={true} />
          )}

        </div>
      </main>
    </div>
  );
}