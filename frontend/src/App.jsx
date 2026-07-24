import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Donations from './pages/Donations.jsx';
import Contact from './pages/Contact.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donar" element={<Donations />} />
        <Route path="/asesoria" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App