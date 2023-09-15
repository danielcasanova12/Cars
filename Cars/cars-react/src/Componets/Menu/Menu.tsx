import React, { useState, ChangeEvent } from 'react';

interface Car {
  marca: string;
  modelo: string;
  ano: string;
}

interface CarFormProps {
  onSave: (car: Car) => void;
  onCancel: () => void;
}

function CarForm({ onSave, onCancel }: CarFormProps) {
  const [car, setCar] = useState<Car>({
    marca: '',
    modelo: '',
    ano: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCar({
      ...car,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(car);
    setCar({
      marca: '',
      modelo: '',
      ano: '',
    });
  };

  return (
    <div className="car-form">
      <h2>Novo Carro</h2>
      <div>
        <label>Marca:</label>
        <input type="text" name="marca" value={car.marca} onChange={handleChange} />
      </div>
      <div>
        <label>Modelo:</label>
        <input type="text" name="modelo" value={car.modelo} onChange={handleChange} />
      </div>
      <div>
        <label>Ano:</label>
        <input type="text" name="ano" value={car.ano} onChange={handleChange} />
      </div>
      <div className="buttons">
        <button onClick={handleSave}>Salvar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default CarForm;
