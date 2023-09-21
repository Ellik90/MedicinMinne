import React, { createContext, useContext, useState, ReactNode } from 'react';

// Skapa en kontext för bilduppladdning
type ImageUploadContextType = {
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
};

const ImageUploadContext = createContext<ImageUploadContextType | undefined>(undefined);

// Skapa en anpassad komponent som använder kontexten
export const ImageUploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <ImageUploadContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
    </ImageUploadContext.Provider>
  );
};

// Använd en egen hook för att enkelt komma åt kontexten
export const useImageUpload = () => {
  const context = useContext(ImageUploadContext);
  if (!context) {
    throw new Error('useImageUpload måste användas inom en ImageUploadProvider');
  }
  return context;
};
