import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Donations from './pages/Donations.jsx';
import Contact from './pages/Contact.jsx';
import Catalog from './pages/Catalog.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import About from './pages/About.jsx';
import Returns from './pages/Returns.jsx';
import Cart from './pages/Cart.jsx';
import Assemble from './pages/Assemble.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import RecoverPassword from './pages/RecoverPassword.jsx';
import MyAccount from './pages/MyAccount.jsx';

import AdminLogin from './pages/admin/AdminLogin.jsx';
import Inventory from './pages/admin/Inventory.jsx';
import AddComponent from './pages/admin/AddComponent.jsx';
import EditComponent from './pages/admin/EditComponent.jsx';
import AdminDonations from './pages/admin/AdminDonations.jsx';
import AdminOrders from './pages/admin/AdminOrders.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminReturns from './pages/admin/AdminReturns.jsx';
import AdminUsers from './pages/admin/AdminUsers.jsx';

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
        <Route path="/ensamblar" element={<Assemble />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/recuperar" element={<RecoverPassword />} />
        <Route path="/mi-cuenta" element={<MyAccount />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/inventario" element={<Inventory />} />
        <Route path="/admin/inventario/nuevo" element={<AddComponent />} />
        <Route path="/admin/inventario/editar/:id" element={<EditComponent />} />
        <Route path="/admin/donaciones" element={<AdminDonations />} />
        <Route path="/admin/ordenes" element={<AdminOrders />} />
        <Route path="/admin/devoluciones" element={<AdminReturns />} />
        <Route path="/admin/usuarios" element={<AdminUsers />} />
      </Routes>
    </Router>
  );
}

export default App