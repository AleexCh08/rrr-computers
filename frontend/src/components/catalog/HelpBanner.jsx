import { Link } from 'react-router-dom';

export default function HelpBanner() {
  return (
    <div className="help-banner">
      <h2 className="help-banner-title">¿Necesitas Ayuda?</h2>
      <Link to="/asesoria">
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
      </Link>
    </div>
  );
}