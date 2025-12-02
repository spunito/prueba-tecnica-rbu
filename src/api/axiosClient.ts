import axios from "axios";

const api_key = import.meta.env.VITE_API_KEY
export const api = axios.create({
    baseURL:"https://pruebas2.rbu.cl"
})

api.interceptors.request.use((config) => {
  const token = api_key; // en la prueba probablemente te lo dan fijo
  if(!token){
    console.warn("No se encontró el api_key")
  }
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});