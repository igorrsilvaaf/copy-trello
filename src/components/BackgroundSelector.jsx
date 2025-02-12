import { useState } from 'react';
import { FiImage, FiUpload } from 'react-icons/fi';
import { backgrounds } from '../utils/backgrounds';

export default function BackgroundSelector({ onSelect, onCustomUpload, currentBackground }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (bg) => {
    onSelect(bg);
    setIsOpen(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    // Verifica o tipo do arquivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione um arquivo de imagem válido.');
      return;
    }

    const reader = new FileReader();
    
    reader.onload = () => {
      const img = new Image();
      
      img.onload = () => {
        const customBackground = {
          id: `custom-${Date.now()}`,
          type: 'image',
          url: img.src
        };
        onCustomUpload(customBackground);
        setIsOpen(false);
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(file);
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