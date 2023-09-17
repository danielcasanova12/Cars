import axios from "axios"

export const Api = () => {
  return axios.create({
    baseURL: 'https://localhost:7186'
  });
};