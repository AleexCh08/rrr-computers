import { useRef } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

export default function ProductCarousel({ children }) {
  const carouselRef = useRef(null);

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      
      {/* Botón Izquierdo */}
      <button 
        onClick={scrollLeft}
        style={{
          position: 'absolute',
          left: '-15px',
          backgroundColor: 'var(--accent-green)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 10,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        <FiChevronLeft size={24} />
      </button>

      <div 
        ref={carouselRef}
        className="hide-scroll"
        style={{ 
          display: 'flex', 
          gap: '20px', 
          overflowX: 'auto', 
          scrollBehavior: 'smooth', 
          padding: '10px 40px', 
          width: '100%'
        }}
      >
        {children}
      </div>
      
      {/* Botón Derecho */}
      <button 
        onClick={scrollRight}
        style={{
          position: 'absolute',
          right: '-15px',
          backgroundColor: 'var(--accent-green)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 10,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        <FiChevronRight size={24} />
      </button>
    </div>
  );
}