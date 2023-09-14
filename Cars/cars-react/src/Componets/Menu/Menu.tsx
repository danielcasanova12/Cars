import { useForm } from "react-hook-form";
import { CreateCar } from "../Models/Car.model";
import axios from "axios";

export default function Menu() {
  const { register, handleSubmit } = useForm<FormData>();

  const save = async (data: FormData) => {
    const request: CreateCar = {
      model: data.TxtModel,
      color: data.TxtColor, // Altere para corresponder ao nome correto
      year: data.TxtYear, // Altere para converter para número inteiro
      photoUrl: data.TxtPhotoUrl, // Altere para corresponder ao nome correto
    };

    try {
      const resposta = await axios.post<CreateCar>(
        'https://localhost:7016/api/Cars',
        request,
        {
          headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
          },
        }
      );
      // Lidere com a resposta aqui
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(save)}>
      <div className="car-form">
        <h2>Novo Carro</h2>
        <div>
          <label>Modelo:</label>
          <input type="text" {...register('TxtModel')} />
        </div>
        <div>
          <label>Modelo:</label>
          <input type="text" {...register('TxtColor')} />
        </div>
        <div>
          <label>Ano:</label>
          <input type="number" {...register('TxtYear')} /> {/* Alterado para tipo "number" */}
        </div>
        <div>
          <label>Foto:</label>
          <input type="text" {...register('TxtPhotoUrl')} />
        </div>
        <div className="buttons">
          <button type="submit">Salvar</button>
          <button type="button">Cancelar</button>
        </div>
      </div>
    </form>
  );
}

interface FormData {
  TxtModel: string;
  TxtYear: number;
  TxtColor: string; // Alterado para corresponder ao nome correto
  TxtPhotoUrl: string; // Alterado para corresponder ao nome correto
}
