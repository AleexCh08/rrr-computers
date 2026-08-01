import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCreditCard, FiTruck, FiShield, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Modal from '../components/ui/Modal';
import api from '../services/api';

export default function Checkout() {
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');
  const [showModal, setShowModal] = useState(false);

  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState(''); 
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(''); 
  const [zipCode, setZipCode] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const [paymentReference, setPaymentReference] = useState('');

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      if (!localStorage.getItem('access_token')) {
        navigate('/login');
        return;
      }

      try {
        const response = await api.get('usuarios/perfil/');
        setClientName(response.data.first_name || response.data.username || '');
        setPhone(response.data.phone && response.data.phone !== 'No registrado' ? response.data.phone : '');
        setAddress(response.data.address && response.data.address !== 'No registrada' ? response.data.address : '');
      } catch (error) {
        console.error("Error validando sesión:", error);
        navigate('/login');
      }
    };

    checkAuthAndFetchData();
  }, [navigate]);

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  useEffect(() => {
    if (cartItems.length === 0 && !showModal) {
      navigate('/catalogo');
    }
  }, [cartItems, navigate, showModal]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 0 ? 15 : 0;
  const total = subtotal + shippingCost;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    
    const payload = {
      client_name: clientName,
      phone: phone,
      shipping_address: `${address}, ${city}. CP: ${zipCode}`, 
      payment_method: paymentMethod,
      payment_reference: paymentMethod === 'transferencia' ? paymentReference : 'Tarjeta Crédito',
      total: total.toFixed(2),
      items: cartItems.map(item => ({
        component_id: item.id,
        product_name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    };

    try {
      const response = await api.post('ordenes/', payload);

      setOrderId(response.data.id); 
      localStorage.removeItem('cart'); 
      setShowModal(true); 
      
    } catch (error) {
      console.error("Error procesando el pago:", error);
      if (error.response && error.response.headers['content-type']?.includes('application/json')) {
        const backendError = Object.values(error.response.data).flat()[0];
        setErrorMessage(`Transacción rechazada: ${backendError}`);
      } else {  
        setErrorMessage("Error en el servidor. Revisa la terminal de Django para ver el motivo real.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/mi-cuenta'); 
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main className="container" style={{ flexGrow: 1, padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        <div style={{ fontSize: '0.9rem', marginBottom: '20px', color: '#666', fontWeight: '500' }}>
          <Link to="/carrito" style={{ color: '#5A7D9A', textDecoration: 'none' }}>Carrito</Link> <span style={{ margin: '0 8px', color: '#ccc' }}>&gt;</span> Checkout
        </div>

        <h1 style={{ fontSize: '2.2rem', color: 'var(--text-dark)', marginBottom: '30px' }}>Finalizar Compra</h1>
        {errorMessage && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '8px', marginBottom: '25px', border: '1px solid #ffcdd2', fontWeight: '600' }}>
            <FiAlertCircle size={20} /> {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px', alignItems: 'start' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiTruck color="#4CAF50" /> Dirección de Envío
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>Nombre Completo</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    placeholder="Ej. Carlos Pérez" 
                    value={clientName} 
                    onChange={(e) => setClientName(e.target.value)} 
                  />
                </div>
                
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>Dirección Exacta</label>
                  <input type="text" required className="form-input" placeholder="Calle, Avenida, Edificio, Apartamento..." value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div>
                  <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>Ciudad</label>
                  <input type="text" required className="form-input" placeholder="Caracas" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>

                <div>
                  <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>Código Postal</label>
                  <input type="text" required className="form-input" placeholder="1010" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>Teléfono de Contacto</label>
                  <input type="tel" required className="form-input" placeholder="+58 412 0000000" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FiCreditCard color="#4CAF50" /> Método de Pago
              </h2>

              <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                <div 
                  onClick={() => setPaymentMethod('tarjeta')}
                  style={{ flex: 1, border: paymentMethod === 'tarjeta' ? '2px solid var(--accent-green)' : '1px solid #ddd', borderRadius: '8px', padding: '15px', cursor: 'pointer', textAlign: 'center', backgroundColor: paymentMethod === 'tarjeta' ? '#f4fbf5' : 'white', transition: 'all 0.2s' }}
                >
                  <FiCreditCard size={24} color={paymentMethod === 'tarjeta' ? 'var(--accent-green)' : '#666'} style={{ marginBottom: '10px' }} />
                  <div style={{ fontWeight: '600', color: paymentMethod === 'tarjeta' ? 'var(--text-dark)' : '#666' }}>Tarjeta de Crédito / Débito</div>
                </div>

                <div 
                  onClick={() => setPaymentMethod('transferencia')}
                  style={{ flex: 1, border: paymentMethod === 'transferencia' ? '2px solid var(--accent-green)' : '1px solid #ddd', borderRadius: '8px', padding: '15px', cursor: 'pointer', textAlign: 'center', backgroundColor: paymentMethod === 'transferencia' ? '#f4fbf5' : 'white', transition: 'all 0.2s' }}
                >
                  <FiShield size={24} color={paymentMethod === 'transferencia' ? 'var(--accent-green)' : '#666'} style={{ marginBottom: '10px' }} />
                  <div style={{ fontWeight: '600', color: paymentMethod === 'transferencia' ? 'var(--text-dark)' : '#666' }}>Transferencia / Pago Móvil</div>
                </div>
              </div>

              {paymentMethod === 'tarjeta' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>Número de Tarjeta</label>
                    <input type="text" required className="form-input" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div>
                    <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>Fecha de Vencimiento</label>
                    <input type="text" required className="form-input" placeholder="MM/AA" />
                  </div>
                  <div>
                    <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>CVC</label>
                    <input type="text" required className="form-input" placeholder="123" />
                  </div>
                </div>
              )}

              {paymentMethod === 'transferencia' && (
                <div style={{ padding: '20px', backgroundColor: '#f4f6f8', borderRadius: '8px', border: '1px dashed #ccc' }}>
                  <p style={{ margin: '0 0 10px 0', fontWeight: '600', color: 'var(--text-dark)' }}>Datos bancarios RRR Computers:</p>
                  <p style={{ margin: '0 0 5px 0', color: '#555' }}>Banco: <strong>Banco Ejemplo</strong></p>
                  <p style={{ margin: '0 0 5px 0', color: '#555' }}>Cuenta: <strong>0102-xxxx-xxxx-xxxx-xxxx</strong></p>
                  <p style={{ margin: '0 0 15px 0', color: '#555' }}>RIF: <strong>J-12345678-9</strong></p>
                  
                  <label className="form-label" style={{ fontWeight: '600', color: '#333', marginBottom: '8px', display: 'block' }}>Número de Referencia</label>
                  <input type="text" required className="form-input" placeholder="Ingresa los últimos 6 dígitos" value={paymentReference} onChange={(e) => setPaymentReference(e.target.value)} />
                </div>
              )}
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eaeaea', position: 'sticky', top: '20px' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
              Resumen de tu Orden
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: '600', color: '#333', fontSize: '0.95rem' }}>{item.name}</p>
                    <span style={{ color: '#888', fontSize: '0.85rem' }}>Cant: {item.quantity}</span> 
                  </div>
                  <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
                    ${item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px', color: '#555' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Envío</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', color: 'var(--text-dark)', fontSize: '1.4rem', fontWeight: '800', paddingTop: '15px', borderTop: '2px solid #eee' }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary" 
              style={{ width: '100%', padding: '15px', fontSize: '1.1rem', backgroundColor: '#4CAF50', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Procesando pago...' : <><FiCheckCircle size={20} /> Confirmar Pedido</>}
            </button>

            <p style={{ textAlign: 'center', margin: '20px 0 0 0', fontSize: '0.85rem', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
              <FiShield /> Pagos seguros y encriptados
            </p>
          </div>

        </form>
      </main>

      <Footer />

      <Modal isOpen={showModal} onClose={handleCloseModal} title="¡Compra Exitosa!">
        <div style={{ textAlign: 'center' }}>
          <FiCheckCircle size={60} color="#4CAF50" style={{ marginBottom: '20px' }} />
          <h3 style={{ color: 'var(--text-dark)', margin: '0 0 10px 0' }}>
            Orden #{orderId ? orderId : '...'} Procesada
          </h3>
          <p style={{ fontSize: '1.1rem', marginBottom: '30px', color: '#555' }}>
            Gracias por tu compra en RRR Computers. Hemos enviado los detalles a tu correo electrónico.
          </p>
        </div>
      </Modal>
    </div>
  );
}