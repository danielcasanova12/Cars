import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function DashboardPage() {
  // Defina um estado para armazenar os dados da API
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    // Faça uma chamada à sua API quando o componente for montado
    axios.get('https://localhost:7186/api/Cars')
      .then(response => {
        // Quando a resposta da API for bem-sucedida, atualize o estado com os dados
        console.log(response.data);
        //setCarData();
      })
      .catch(error => {
        // Lide com erros, por exemplo, exibindo uma mensagem de erro
        console.error('Erro ao buscar dados da API:', error);
      });
  }, []); // O segundo argumento [] garante que isso só será executado uma vez

  // Renderize os dados da API na página
  return (
    <div>
      <p>Página Inicial</p>
      <h2>Dados da API:</h2>
    </div>
  );
}
