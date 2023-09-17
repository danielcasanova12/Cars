import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function ImageUpload({ onImageUpload }: { onImageUpload: (files: File[]) => void }) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      if (isImageType(selectedFile)) {
        setSelectedImage(selectedFile);
        setErrorMessage(null);
        onImageUpload([selectedFile]);
      } else {
        setSelectedImage(null);
        setErrorMessage('Apenas imagens são permitidas. Por favor, selecione uma imagem.');
      }
    }
  }, [onImageUpload]);

  const isImageType = (file: File) => {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return acceptedImageTypes.includes(file.type);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true
  });

  const dropzoneStyles: React.CSSProperties = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
  };

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Imagem selecionada"
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
        ) : (
          <p>
            Arraste e solte uma imagem aqui
            {errorMessage && <br />}
            {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
          </p>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
