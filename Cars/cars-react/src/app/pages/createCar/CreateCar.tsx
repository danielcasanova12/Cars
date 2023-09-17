import React, { ChangeEvent, useState } from 'react';
import '../../Shared/style.css';
import { CarsService } from '../../Shared/Services/api/cars/CarsService';
import { ApiException } from '../../Shared/Services/api/ApiException';

export interface CreateCar {
  id: number;
  model: string;
  year: number;
  color: string;
  photoUrl: string;
}

export const CreateCar = () => {
  const [modelo, Setmodelo] = useState('');
  const [cor, Setcor] = useState('');
  const [ano, Setano] = useState('');
  const [photoUrl, SetphotoUrl] = useState<File | null>(null); // Alterado para File | null

  const handleEnviar = async () => {
    try {
      const newCar: CreateCar = {
        id: 0, // Defina o ID conforme necessário
        model: modelo,
        year: parseInt(ano),
        color: cor,
        photoUrl: '', // Não podemos definir photoUrl diretamente aqui
      };

      console.log('Novo carro:', newCar);

      if (photoUrl) {
        // Se uma imagem foi selecionada
        // Você pode lidar com o upload da imagem aqui e definir photoUrl corretamente
        // Por exemplo, você pode usar uma biblioteca de upload de arquivos ou enviar a imagem para o servidor
        // Aqui, definimos photoUrl como uma string vazia, você deve alterá-la após o upload da imagem

        // Exemplo de upload de imagem (não funcional, apenas para ilustração):
        const formData = new FormData();
        formData.append('file', photoUrl);

        // Envie a imagem para o servidor e obtenha a URL da imagem
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // Se o upload foi bem-sucedido, defina a URL da imagem no objeto
          newCar.photoUrl = await response.text(); // Suponhamos que a resposta seja a URL da imagem
        } else {
          console.error('Erro ao fazer upload da imagem.');
          return;
        }
      }

      const createdCar = await CarsService.create(newCar);

      console.log('Resposta da API:', createdCar);

      if ('id' in createdCar) {
        console.log('Carro criado com sucesso:', createdCar);

        Setmodelo('');
        Setcor('');
        Setano('');
        SetphotoUrl(null); // Limpe o campo de imagem
      } else {
        console.error('Erro ao criar o carro.');
      }
    } catch (error) {
      console.error('Erro ao criar o carro:', error);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      console.log('Arquivo selecionado:', file);
      SetphotoUrl(file); // Defina o arquivo selecionado no estado
    } else {
      console.log('Nenhum arquivo selecionado.');
      SetphotoUrl(null); // Limpe o estado se nenhum arquivo for selecionado
    }
  };

  return (
    <div className="container">
      <form>
        <label>
          <span>Modelo</span>
          <input
            className="text-input"
            type="text"
            value={modelo}
            onChange={(e) => Setmodelo(e.target.value)}
          />
        </label>
        <label>
          <span>Cor</span>
          <input
            className="text-input"
            type="text"
            value={cor}
            onChange={(e) => Setcor(e.target.value)}
          />
        </label>
        <label>
          <span>Ano</span>
          <input
            className="number-input"
            type="number"
            value={ano}
            onChange={(e) => Setano(e.target.value)}
          />
        </label>
        <label>
          <span>Foto do veículo</span>
          <div className="file-input-wrapper">
            <span className="file-input-label">
              Clique aqui para selecionar uma imagem
            </span>
            <input
              className="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </label>
        <button type="button" onClick={handleEnviar}>
          Enviar
        </button>
      </form>
    </div>
  );
};
