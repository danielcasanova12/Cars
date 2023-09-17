import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CarService, ICar } from '../api/CarsService/CarsService';
import { ApiException } from '../api/ApiException';
import '../shared/Delete-page.css'; // Importe seus estilos CSS personalizados

export function DeletePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [carData, setCarData] = useState<ICar | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    // Faça uma chamada à API para buscar os detalhes do carro com base no ID
    CarService.getById(Number(id))
      .then(data => {
        // Se ocorrer um erro, trate-o aqui
        if (data instanceof ApiException) {
          console.error('Erro ao buscar dados da API:', data.message);
        } else {
          setCarData(data);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error.message);
      });
  }, [id]);

  const handleDeleteCar = async () => {
    try {
      // Faça uma chamada à API para deletar o carro com base no ID
      const response = await CarService.deleteById(Number(id));
      if (!(response instanceof ApiException)) {
        // Exclusão bem-sucedida
        setDeleteSuccess(true);
        alert('Carro deletado com sucesso.');
        setShowConfirmation(false); // Feche o modal de confirmação após a exclusão
      } else {
        console.error('Erro ao deletar o carro:', response.message);
      }
    } catch (error: any) {
      console.error('Erro ao deletar o carro:', error.message);
    }
  };

  const confirmDelete = () => {
    setShowConfirmation(true);
  };

  if (deleteSuccess) {
    // Se a exclusão for bem-sucedida, exibir um alerta e redirecionar para a página inicial
    
    navigate('/');
  }

  if (!carData) {
    return <div className="container">Carregando...</div>;
  }

  return (
    <div className="container">
      <p>Deletar Carro</p>
      <ul>
        <li>
          <strong>Car ID:</strong> {carData.carId}
        </li>
        <li>
          <strong>Modelo:</strong> {carData.model}
        </li>
        <li>
          <strong>Cor:</strong> {carData.color}
        </li>
        <li>
          <strong>Ano:</strong> {carData.year}
        </li>
      </ul>
      <button onClick={confirmDelete}>Solicitar Exclusão</button>
      <Link to="/">Cancelar</Link>
      {showConfirmation && (
        <div className="confirmation-modal">
          <p>Tem certeza de que deseja excluir este carro?</p>
          <button onClick={handleDeleteCar}>Sim, Excluir</button>
          <button onClick={() => setShowConfirmation(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}
