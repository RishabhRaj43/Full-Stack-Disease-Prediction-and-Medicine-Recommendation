import axios from "axios";

export const api = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });
export const api_python = axios.create({
  baseURL: import.meta.env.VITE_PYTHON_SERVER_URL,
});
