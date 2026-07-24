export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#fff', textAlign: 'center', display: 'flex', flexDirection: 'column', minHeight: '30vh' }}>
      <div className="container" style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: '500', maxWidth: '800px', lineHeight: '1.5' }}>
          Estamos interesados en proveer equipos a quien lo necesite, esto incluye a personas, institutos, universidades y organizaciones
        </h3>
      </div>
      <div style={{ backgroundColor: 'var(--primary-dark)', color: '#888', padding: '15px 0', fontSize: '0.85rem' }}>
        Copyright © 2026 RRRComputers
      </div>
    </footer>
  );
}