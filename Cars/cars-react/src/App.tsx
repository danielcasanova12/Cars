import React from 'react';
import Menu from './Componets/Menu/Menu';

const cars = [
  { id: 1, marca: 'Toyota', modelo: 'Corolla', ano: 2022 },
  { id: 2, marca: 'Honda', modelo: 'Civic', ano: 2022 },
  { id: 3, marca: 'Ford', modelo: 'Mustang', ano: 2021 },
  // Adicione mais carros aqui
];

function App() {
  return (
    <div className="container">
      <div className="logo"></div>
      <div className="titulo">Cars</div>
      <div className="lista-carros">
        <h2>Lista de Carros</h2>
        <ul>
          {cars.map((car) => (
            <li key={car.id}>
              <strong>{car.marca}</strong> - {car.modelo} ({car.ano})
            </li>
          ))}
        </ul>
      </div>
      <div><Menu/></div>
    </div>
  );
}

export default App;
