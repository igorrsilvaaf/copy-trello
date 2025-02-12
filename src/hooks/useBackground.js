import { useState, useEffect } from 'react';
import { backgrounds } from '../utils/backgrounds';

export function useBackground() {
  const [currentBackground, setCurrentBackground] = useState(() => {
    const saved = localStorage.getItem('currentBackground');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return 'default';
      }
    }
    return 'default';
  });

  const [customBackgrounds, setCustomBackgrounds] = useState(() => {
    const saved = localStorage.getItem('customBackgrounds');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('currentBackground', JSON.stringify(currentBackground));
  }, [currentBackground]);

  useEffect(() => {
    localStorage.setItem('customBackgrounds', JSON.stringify(customBackgrounds));
  }, [customBackgrounds]);

  const handleBackgroundChange = (bg) => {
    setCurrentBackground(bg.id);
  };

  const addCustomBackground = (bg) => {
    setCustomBackgrounds(prev => [...prev, bg]);
    setCurrentBackground(bg.id);
  };

  const getAllBackgrounds = () => {
    return [...backgrounds, ...customBackgrounds];
  };

  const getCurrentBackground = () => {
    return getAllBackgrounds().find(bg => bg.id === currentBackground);
  };

  return {
    currentBackground,
    handleBackgroundChange,
    addCustomBackground,
    getAllBackgrounds,
    getCurrentBackground
  };
} 