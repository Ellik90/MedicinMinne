import React, { createContext, useContext, useState, ReactNode } from 'react';

type ImageUploadContextType = {
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
};

const ImageUploadContext = createContext<ImageUploadContextType | undefined>(undefined);

export const ImageUploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <ImageUploadContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
    </ImageUploadContext.Provider>
  );
};

export const useImageUpload = () => {
  const context = useContext(ImageUploadContext);
  if (!context) {
    throw new Error('useImageUpload måste användas inom en ImageUploadProvider');
  }
  return context;
};
