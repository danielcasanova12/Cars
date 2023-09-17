import React, { useEffect, useState } from 'react';
import { CarService, ICar } from '../api/CarsService/CarsService';
import { ApiException } from '../api/ApiException';
import { Link } from 'react-router-dom';
import Menu from './Menu'; // Importe o componente de menu
import '../shared/index.css'; // Importe seus estilos compartilhados aqui

export function DashboardPage() {
  const [carData, setCarData] = useState<ICar[] | ApiException[]>([]);

  useEffect(() => {
    // Faça uma chamada à API quando o componente for montado
    CarService.getAll()
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
  }, []);  // O segundo argumento [] garante que isso só será executado uma vez

  // Renderize os dados da API na página
  return (
    
    <div className="dashboard-container">
       <Menu />
      <h1 className="section-title">Dados da API:</h1>
      <ul className="car-list">
        {(carData as ICar[]).map(car => (
          <li key={car.carId} className="car-item">
            <div className="car-info">
              <div>
                <span className="label">Car ID:</span> {car.carId}
              </div>
              <div>
                <span className="label">Modelo:</span><span className='label2'>{car.model}</span> 
              </div>
              <div>
                <span className="label">Cor:</span> {car.color}
              </div>
              <div>
                <span className="label">Ano:</span> {car.year}
              </div>
            </div>
            <div className="car-image-container">
              <span className="label">Foto:</span>
              <img src={car.photoUrl} alt={`Foto do ${car.model}`} className="car-image" />
            </div>
            <div>
            <div>
            <div className="button-container">
            <Link to={`/editar/${car.carId}`} className="button-link edit-button">Editar</Link>
            <Link to={`/deletar/${car.carId}`} className="button-link delete-button">Deletar</Link>
          </div>
          </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="nav-links">
        <Link to="/" className="nav-link ">Página Inicial</Link>
        <Link to="/create" className="nav-link">Criar Novo Carro</Link>
      </div>
    </div>
  );
}
