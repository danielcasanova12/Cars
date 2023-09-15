import React, { useState, useEffect } from 'react';

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
      const response = await fetch('https://localhost:7016/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });
  
      if (response.ok) {
        console.log('Carro adicionado com sucesso!');
        // Atualize a lista de carros após a adição bem-sucedida, se desejar.
      } else {
        const errorMessage = `Erro ao adicionar o carro: ${response.status} - ${response.statusText}`;
        console.error(errorMessage);
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação:', error);
    }
  };
  

  // Função para buscar a lista de carros da API
  const fetchCarList = async () => {
    try {
      const response = await fetch('https://localhost:7016/api/cars');
      if (response.ok) {
        const data = await response.json();
        setCarList(data); // Atualiza o estado com os dados da lista de carros
      } else {
        console.error('Falha ao buscar a lista de carros.');
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação:');
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
        {/* ... Seus campos de entrada para adicionar carros aqui */}
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
