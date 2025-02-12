import { useState } from 'react';
import { FiImage, FiUpload } from 'react-icons/fi';
import { backgrounds } from '../utils/backgrounds';

export default function BackgroundSelector({ onSelect, currentBackground }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (bg) => {
    onSelect(bg);
    setIsOpen(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const customBackground = {
          id: `custom-${Date.now()}`,
          type: 'image',
          url: e.target.result
        };
        handleSelect(customBackground);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="background-selector">
      <button 
        className="header-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiImage />
        Plano de Fundo
      </button>
      {isOpen && (
        <div className="background-options">
          <div className="background-section">
            <h3>Cores</h3>
            <div className="background-grid">
              {backgrounds
                .filter(bg => bg.type === 'color')
                .map((bg) => (
                  <button
                    key={bg.id}
                    className={`background-option ${currentBackground === bg.id ? 'active' : ''}`}
                    style={{ backgroundColor: bg.color }}
                    onClick={() => handleSelect(bg)}
                  />
                ))}
            </div>
          </div>
          <div className="background-section">
            <h3>Imagens</h3>
            <div className="background-grid">
              {backgrounds
                .filter(bg => bg.type === 'image')
                .map((bg) => (
                  <button
                    key={bg.id}
                    className={`background-option ${currentBackground === bg.id ? 'active' : ''}`}
                    style={{ 
                      backgroundImage: `url(${bg.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    onClick={() => handleSelect(bg)}
                  />
                ))}
            </div>
          </div>
          <div className="background-section">
            <h3>Personalizado</h3>
            <label className="custom-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <span className="upload-button">
                <FiUpload />
                Carregar imagem
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
} 