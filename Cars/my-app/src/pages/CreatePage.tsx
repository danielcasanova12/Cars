import React from 'react';
import { CarService } from '../api/CarsService/CarsService';

export function CreatePage() {
  // Função para enviar dados predefinidos para a API ao clicar no botão
  const handleCreateCar = async () => {
    const newCarData = {
      carId: 0,
      model: "Novo Modelo",
      color: "Nova Cor",
      year: 0,
      photoUrl: "nova-foto.png",
    };

    try {
      // Envie os dados para a API usando o serviço correspondente
      const response = await CarService.create(newCarData);

      // Verifique se a resposta da API indica sucesso (por exemplo, código de status 201)
      if (response ) {
        console.log('Carro criado com sucesso:', response);
      } else {
        console.error('Erro ao criar carro: Resposta inesperada da API:', response);
      }
    } catch (error: any) {
      // Verifique se o erro é uma instância de Error e log detalhes
      if (error instanceof Error) {
        console.error('Erro ao criar carro:', error.message);
      } else {
        console.error('Erro ao criar carro: Um erro desconhecido ocorreu.');
      }
    }
  };

  return (
    <div>
      <p>Create page</p>
      {/* Botão de envio */}
      <button onClick={handleCreateCar}>Enviar Dados Predefinidos</button>
    </div>
  );
}
