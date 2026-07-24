import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <div className="logo">
          <Link to="/">
            <h2>RRR<span>COMPUTERS</span></h2>
          </Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Componentes</Link></li>
          <li><Link to="/">Ensamblar</Link></li>
          <li><Link to="/">Asesoría</Link></li>
          <li><Link to="/donar">Donar</Link></li>
          <li><Link to="/">Devolución</Link></li>
          <li><Link to="/">Nosotros</Link></li>
        </ul>
        <div className="nav-actions">
          <div className="search-bar">
            <FiSearch color="#888" />
            <input type="text" placeholder="Search" />
          </div>
          <FiUser className="icon" />
          <FiShoppingCart className="icon" />
        </div>
      </div>
    </nav>
  );
}