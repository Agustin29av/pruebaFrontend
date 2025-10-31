import axios from "axios";

const apiBase = import.meta.env.VITE_API_BASE;
const extBase = import.meta.env.VITE_EXT_BASE;

if (!apiBase) {
  throw new Error(
    "Falta VITE_API_BASE. Creá /.env.local con VITE_API_BASE=https://api.qa.myintelli.net/v1 y reiniciá el dev server."
  );
}

export const api = axios.create({
  baseURL: apiBase,             // → https://api.qa.myintelli.net/v1
  timeout: 20000,
});

// Enviá siempre el Bearer para el backend principal
api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem("token");
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

// Cliente opcional para “APIs externas” (sin bearer)
export const ext = axios.create({
  baseURL: extBase || "",       // si no definís ext, igual podes usar fetch
  timeout: 20000,
});

// Debug opcional
console.log("VITE_API_BASE =", apiBase);
if (extBase) console.log("VITE_EXT_BASE =", extBase);
