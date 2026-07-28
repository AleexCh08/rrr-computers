import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

export default function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Aquí iría la lógica para limpiar el token de sesión
    navigate('/admin/login');
  };

  const getLinkStyle = (path) => {
    const isActive = location.pathname.includes(path);
    return {
      color: isActive ? 'white' : '#ccc',
      textDecoration: 'none',
      borderBottom: isActive ? '2px solid var(--accent-green)' : 'none',
      paddingBottom: isActive ? '5px' : '0',
      transition: 'all 0.2s ease-in-out'
    };
  };

  return (
    <nav style={{ backgroundColor: 'var(--primary-dark)', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', borderBottom: '4px solid var(--accent-green)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: 'white' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '1px' }}>
            <h2 style={{ margin: 0, color: 'white' }}>RRR<span style={{ fontSize: '1rem', fontWeight: '300' }}>ADMIN</span></h2>
          </div>
        </Link>

        <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0, fontWeight: '500' }}>
          <li><Link to="/admin/dashboard" style={getLinkStyle('/admin/dashboard')}>Dashboard</Link></li>
          <li><Link to="/admin/inventario" style={getLinkStyle('/admin/inventario')}>Inventario</Link></li>
          <li><Link to="/admin/donaciones" style={getLinkStyle('/admin/donaciones')}>Donaciones</Link></li>
          <li><Link to="/admin/ordenes" style={getLinkStyle('/admin/ordenes')}>Órdenes</Link></li>
          <li><Link to="/admin/devoluciones" style={getLinkStyle('/admin/devoluciones')}>Devoluciones</Link></li>
          <li><Link to="/admin/mensajes" style={getLinkStyle('/admin/mensajes')}>Mensajes</Link></li>
          <li><Link to="/admin/usuarios" style={getLinkStyle('/admin/usuarios')}>Usuarios</Link></li>
        </ul>
      </div>

      <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid #5A7D9A', color: 'white', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
        <FiLogOut /> Salir
      </button>
    </nav>
  );
}