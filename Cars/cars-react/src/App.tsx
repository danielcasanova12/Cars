import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Car {
  model: string;
  color: string;
  year: number;
  photoUrl: string;
}

const AddCar: React.FC = () => {
  const [carData, setCarData] = useState<Car>({
    model: '',
    color: '',
    year: 0,
    photoUrl: '',
  });

  const [carList, setCarList] = useState<Car[]>([]); // Estado para armazenar a lista de carros

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7016/api/cars', carData);

      if (response.status === 201) {
        console.log('Carro adicionado com sucesso!');
        // Atualize a lista de carros após a adição bem-sucedida, se desejar.
      } else {
        console.error(`Erro ao adicionar o carro: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação:', error);
    }
  };

  // Função para buscar a lista de carros da API
  const fetchCarList = async () => {
    try {
      const response = await axios.get('https://localhost:7016/api/cars');
      if (response.status === 200) {
        setCarList(response.data); // Atualiza o estado com os dados da lista de carros
      } else {
        console.error('Falha ao buscar a lista de carros.');
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação:', error);
    }
  };

  useEffect(() => {
    // Chamando a função de busca quando o componente é montado
    fetchCarList();
  }, []);

  return (
    <div>
      <h2>Adicionar Carro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="model"
          placeholder="Modelo"
          value={carData.model}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="color"
          placeholder="Cor"
          value={carData.color}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="year"
          placeholder="Ano"
          value={carData.year}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="photoUrl"
          placeholder="URL da foto"
          value={carData.photoUrl}
          onChange={handleInputChange}
        />
        <button type="submit">Adicionar Carro</button>
      </form>

      <h2>Lista de Carros</h2>
      <ul>
        {carList.map((car, index) => (
          <li key={index}>
            {car.model} - {car.color} - {car.year}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddCar;
