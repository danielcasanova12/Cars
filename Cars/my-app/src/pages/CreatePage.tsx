import React, { ChangeEvent, useState } from 'react';
import { CarService } from '../api/CarsService/CarsService';
import ImageUpload from './ImageUpload'; // Certifique-se de importar o componente ImageUpload
import '../shared/index.css';
export function CreatePage() {
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [year, setYear] = useState<number | string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({}); // Estado para rastrear erros por campo

  const handleCreateCar = async () => {
    // Verificar campos obrigatórios
    const requiredFields = ['model', 'color', 'year', 'selectedImage'];
    const fieldErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      if (!eval(field)) {
        fieldErrors[field] = `O campo '${field}' é obrigatório.`;
      }
    });

    // Se houver erros, definir o estado de erros e não enviar para a API
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    // Se não houver erros, continuar com a chamada da API
    const newCarData = {
      carId: 0,
      model,
      color,
      year: typeof year === 'string' ? Number(year) : year,
      photoUrl: imageBase64 || '', // Use a representação base64 da imagem aqui
    };

    try {
      const response = await CarService.create(newCarData);

      if (response) {
        console.log('Carro criado com sucesso:', response);
      } else {
        console.error('Erro ao criar carro: Resposta inesperada da API:', response);
      }
    } catch (error: any) {
      if (error instanceof Error) {
        console.error('Erro ao criar carro:', error.message);
      } else {
        console.error('Erro ao criar carro: Um erro desconhecido ocorreu.');
      }
    }
  };

  const handleImageUpload = (files: File[]) => {
    const selectedFile = files[0];
    setSelectedImage(selectedFile);

    // Lê a imagem como uma representação base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setImageBase64(base64String);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="container">
      <p className="title">Criar Carro</p>
      <div className="error-container">
        {Object.keys(errors).map((fieldName) => (
          <p key={fieldName} className="error-message">
            {errors[fieldName]}
          </p>
        ))}
      </div>
      <div className="input-container">
        <span>Modelo:</span>
        <input
          type="text"
          placeholder="Modelo"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
      </div>
      <div className="input-container">
        <span>Cor:</span>
        <input
          type="text"
          placeholder="Cor"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        />
      </div>
      <div className="input-container">
        <span>Ano:</span>
        <input
          type="number"
          placeholder="Ano"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>
      <div className="input-container">
        <span>Imagem:</span>
        <ImageUpload onImageUpload={handleImageUpload} />
      </div>
      <button onClick={handleCreateCar}>Enviar Dados Predefinidos</button>
    </div>
  );
}
