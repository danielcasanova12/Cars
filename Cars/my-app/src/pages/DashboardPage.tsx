// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export function DashboardPage() {
//   // Defina um estado para armazenar os dados da API
//   const [carData, setCarData] = useState([]);

//   useEffect(() => {
//     // Faça uma chamada à sua API quando o componente for montado
//     axios.get('https://localhost:7186/api/Cars')
//       .then(response => {
//         // Quando a resposta da API for bem-sucedida, atualize o estado com os dados
//         console.log(response.data);
//         //setCarData();
//       })
//       .catch(error => {
//         // Lide com erros, por exemplo, exibindo uma mensagem de erro
//         console.error('Erro ao buscar dados da API:', error);
//       });
//   }, []); // O segundo argumento [] garante que isso só será executado uma vez

//   // Renderize os dados da API na página
//   return (
//     <div>
//       <p>Página Inicial</p>
//       <h2>Dados da API:</h2>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { CarService, ICar } from '../api/CarsService/CarsService';
import { ApiException } from '../api/ApiException';
import { Link } from 'react-router-dom';

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
    <div>
      <p>Página Inicial</p>
      <h2>Dados da API:</h2>
      <ul>
        {(carData as ICar[]).map(car => (
          <li key={car.carId}>
            <strong>Car ID:</strong> {car.carId}<br />
            <strong>Modelo:</strong> {car.model}<br />
            <strong>Cor:</strong> {car.color}<br />
            <strong>Ano:</strong> {car.year}<br />
            <strong>Foto:</strong> <img src={car.photoUrl} alt={`Foto do ${car.model}`} /><br />
          </li>
        ))}
      </ul>
      <Link to="/">Página Inicial</Link>
      <Link to="/create">Criar Novo Carro</Link>
    </div>
  );
}

