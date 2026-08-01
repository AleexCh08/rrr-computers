import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = Boolean(localStorage.getItem('access_token'));

  const executeSearch = () => {
    if (searchTerm.trim() === '') return;
    
    const term = searchTerm.toLowerCase().trim();
    const originalTerm = searchTerm; 
    
    setSearchTerm(''); 

    if (term.includes('devolucion') || term.includes('devolver') || term.includes('garantia')) {
      navigate('/devolucion');
    } 
    else if (term.includes('donar') || term.includes('donacion') || term.includes('regalar')) {
      navigate('/donar');
    } 
    else if (term.includes('ensamblar') || term.includes('armar') || term.includes('pc')) {
      navigate('/ensamblar');
    } 
    else if (term.includes('nosotros') || term.includes('contacto') || term.includes('ubicacion')) {
      navigate('/nosotros'); 
    } 
    else if (term.includes('asesoria') || term.includes('ayuda')) {
      navigate('/asesoria');
    } 
    else {
      navigate(`/catalogo?q=${originalTerm}`);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  const getLinkStyle = (path) => {
    const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
    
    return {
      color: isActive ? 'white' : '#ccc',
      textDecoration: 'none',
      borderBottom: isActive ? '2px solid var(--accent-green)' : '2px solid transparent',
      paddingBottom: '5px',
      fontWeight: '500',
      transition: 'all 0.2s ease-in-out'
    };
  };
  
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <div className="logo">
          <Link to="/">
            <h2>RRR<span>COMPUTERS</span></h2>
          </Link>
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/catalogo" style={getLinkStyle('/catalogo')} onClick={() => setIsMenuOpen(false)}>Componentes</Link></li>
          <li><Link to="/ensamblar" style={getLinkStyle('/ensamblar')} onClick={() => setIsMenuOpen(false)}>Ensamblar</Link></li>
          <li><Link to="/asesoria" style={getLinkStyle('/asesoria')} onClick={() => setIsMenuOpen(false)}>Asesoría</Link></li>
          <li><Link to="/donar" style={getLinkStyle('/donar')} onClick={() => setIsMenuOpen(false)}>Donar</Link></li>
          <li><Link to="/devolucion" style={getLinkStyle('/devolucion')} onClick={() => setIsMenuOpen(false)}>Devolución</Link></li>
          <li><Link to="/nosotros" style={getLinkStyle('/nosotros')} onClick={() => setIsMenuOpen(false)}>Nosotros</Link></li>
          <li className="mobile-search">
            <div className="search-bar">
              <FiSearch color="#888" style={{ cursor: 'pointer' }} onClick={() => { executeSearch(); setIsMenuOpen(false); }} />
              <input type="text" placeholder="Buscar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => { handleSearch(e); if(e.key === 'Enter') setIsMenuOpen(false); }} />
            </div>
          </li>
        </ul>
        <div className="nav-actions">
          {/* ACTUALIZADO: Buscador de escritorio (se oculta en móviles en el CSS) */}
          <div className="search-bar desktop-search">
            <FiSearch color="#888" style={{ cursor: 'pointer' }} onClick={executeSearch} />
            <input type="text" placeholder="Buscar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleSearch} />
          </div>
          
          <Link to={isAuthenticated ? "/mi-cuenta" : "/login"} style={{ color: 'inherit' }} title={isAuthenticated ? "Mi Cuenta" : "Iniciar Sesión"}>
            <FiUser size={24} style={{ cursor: 'pointer', color: isAuthenticated ? 'var(--accent-green)' : 'inherit' }} />
          </Link>
          
          <Link to="/carrito" style={{ color: 'inherit' }}>
            <FiShoppingCart size={24} style={{ cursor: 'pointer' }} />
          </Link>

          {/* NUEVO: Botón de Hamburguesa para móviles */}
          <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
}