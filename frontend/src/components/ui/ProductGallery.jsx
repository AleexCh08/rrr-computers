import { useState } from 'react';

export default function ProductGallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {images.map((img, index) => (
          <div 
            key={index} 
            onClick={() => setMainImage(img)}
            style={{ 
              width: '80px', 
              height: '80px', 
              border: mainImage === img ? '2px solid var(--accent-green)' : '1px solid #eaeaea', 
              borderRadius: '4px',
              padding: '5px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img src={img} alt={`Thumbnail ${index}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        ))}
      </div>

      <div style={{ flexGrow: 1, border: '1px solid #eaeaea', borderRadius: '4px', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={mainImage} alt="Main product view" style={{ width: '100%', maxHeight: '450px', objectFit: 'contain' }} />
      </div>
    </div>
  );
}