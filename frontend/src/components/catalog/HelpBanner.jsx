export default function HelpBanner() {
  return (
    <div style={{ 
      backgroundColor: '#5A7D9A', 
      padding: '50px 20px', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      gap: '40px',
      marginTop: '60px'
    }}>
      <h2 style={{ color: 'white', fontSize: '2.5rem', margin: 0 }}>¿Necesitas Ayuda?</h2>
      <button 
        className="btn-primary" 
        style={{ 
          backgroundColor: '#4CAF50', 
          fontSize: '1.1rem', 
          padding: '12px 30px', 
          borderRadius: '4px' 
        }}
      >
        Solicita ayuda personalizada
      </button>
    </div>
  );
}