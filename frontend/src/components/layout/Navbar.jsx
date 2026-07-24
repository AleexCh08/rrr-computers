import { FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';
import './Navbar.css'; // Crea un archivo css en la misma carpeta para estilos específicos

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <div className="logo">
          <h2>RRR<span>COMPUTERS</span></h2>
        </div>
        <ul className="nav-links">
          <li><a href="#">Componentes</a></li>
          <li><a href="#">Ensamblar</a></li>
          <li><a href="#">Asesoría</a></li>
          <li><a href="#">Donar</a></li>
          <li><a href="#">Devolución</a></li>
          <li><a href="#">Nosotros</a></li>
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