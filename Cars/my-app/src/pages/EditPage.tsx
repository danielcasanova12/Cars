import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Importe useNavigate
import { CarService, ICar } from '../api/CarsService/CarsService';
import { ApiException } from '../api/ApiException';
import ImageUpload from './ImageUpload';

export function EditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Obtenha a função de navegação

  const [carData, setCarData] = useState<ICar | null>(null);
  const [formData, setFormData] = useState<ICar>({
    carId: 0,
    model: '',
    color: '',
    year: 0,
    photoUrl: '',
  });
  const [newImage, setNewImage] = useState<File | null>(null);
  const [editSuccess, setEditSuccess] = useState(false);

  useEffect(() => {
    CarService.getById(Number(id))
      .then(data => {
        if (data instanceof ApiException) {
          console.error('Erro ao buscar dados da API:', data.message);
        } else {
          setCarData(data);
          setFormData(data);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error.message);
      });
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (files: File[]) => {
    const selectedFile = files[0];
    setNewImage(selectedFile);
  };

  const handleEditCar = async () => {
    try {
      const updatedData = { ...formData };
      if (newImage) {
        const reader = new FileReader();
        reader.onload = async () => {
          updatedData.photoUrl = reader.result as string;
          await updateCar(updatedData);
        };
        reader.readAsDataURL(newImage);
      } else {
        await updateCar(updatedData);
      }
    } catch (error: any) {
      console.error('Erro ao editar o carro:', error.message);
    }
  };

  const updateCar = async (updatedData: ICar) => {
    try {
      const response = await CarService.updateById(Number(id), updatedData);
      if (!(response instanceof ApiException)) {
        setEditSuccess(true);
        window.alert('Carro editado com sucesso.');
      } else {
        console.error('Erro ao editar o carro:', response.message);
      }
    } catch (error: any) {
      console.error('Erro ao editar o carro:', error.message);
    }
  };

  if (editSuccess) {
    navigate('/');
  }

  if (!carData) {
    return <div>Carregando...</div>;
  }
  return (
    <div>
      <p>Editar Carro</p>
      <div>
        <label>Modelo:</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Cor:</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Ano:</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Foto:</label>
        <ImageUpload onImageUpload={handleImageUpload} />
        {formData.photoUrl && (
          <img
            src={formData.photoUrl}
            alt={`Foto do ${formData.model}`}
            className="car-image"
          />
        )}
      </div>
      <button onClick={handleEditCar}>Salvar Edições</button>
    </div>
  );
}
