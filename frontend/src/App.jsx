import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Donations from './pages/Donations.jsx';
import Contact from './pages/Contact.jsx';
import Catalog from './pages/Catalog.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import About from './pages/About.jsx';
import Returns from './pages/Returns.jsx';
import Cart from './pages/Cart.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donar" element={<Donations />} />
        <Route path="/asesoria" element={<Contact />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/devolucion" element={<Returns />} />
        <Route path="/carrito" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App