import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí iría la lógica para limpiar el token de sesión
    navigate('/admin/login');
  };

  return (
    <nav style={{ backgroundColor: 'var(--primary-dark)', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', borderBottom: '4px solid var(--accent-green)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '1px' }}>
            <h2 style={{ margin: 0, color: 'white' }}>RRR<span style={{ fontSize: '1rem', fontWeight: '300' }}>ADMIN</span></h2>
          </div>
        </Link>

        <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0, fontWeight: '500' }}>
          <li><Link to="/admin/dashboard" style={{ color: '#ccc', textDecoration: 'none' }}>Dashboard</Link></li>
          <li><Link to="/admin/inventario" style={{ color: 'white', textDecoration: 'none', borderBottom: '2px solid var(--accent-green)', paddingBottom: '5px' }}>Inventario</Link></li>
          <li><Link to="/admin/donaciones" style={{ color: '#ccc', textDecoration: 'none' }}>Donaciones</Link></li>
          <li><Link to="/admin/ordenes" style={{ color: '#ccc', textDecoration: 'none' }}>Órdenes</Link></li>
        </ul>
      </div>

      <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid #5A7D9A', color: 'white', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
        <FiLogOut /> Salir
      </button>
    </nav>
  );
}