import { ApiException } from "../ApiException";
import { Api } from "../ApiConfig";

export interface ICar {
    carId: number;
    model: string;
    color: string;
    year: number;
    photoUrl: string;
  }

const getAll = async (): Promise<ICar[] | ApiException> => {
  try {
    const { data } = await Api().get('/api/Cars');
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao buscar os registros.');
  }
};

const getById = async (id: number): Promise<ICar | ApiException> => {
  try {
    const { data } = await Api().get(`/api/Cars/${id}`);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao consultar o registro.');
  }
};

const create = async (dataToCreate: Omit<ICar, 'id'>): Promise<ICar | ApiException> => {
  try {
    const { data } = await Api().post<any>('/api/Cars', dataToCreate);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.');
  }
};

const updateById = async (id: number, dataToUpdate: ICar): Promise<ICar | ApiException> => {
  try {
    const { data } = await Api().put(`/api/Cars/${id}`, dataToUpdate);
    return data;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: number): Promise<undefined | ApiException> => {
  try {
    await Api().delete(`/api/Cars/${id}`);
    return undefined;
  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao apagar o registro.');
  }
};

export const CarService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};