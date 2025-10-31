import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/api/axios";

function normalizeModules(data) {
  if (!data) return [];
  
  if (Array.isArray(data.modules) && data.modules.length > 0) {
    return data.modules;
  }
  if (Array.isArray(data.data) && data.data.length > 0) {
    return data.data;
  }
  if (Array.isArray(data?.data?.modules) && data.data.modules.length > 0) {
    return data.data.modules;
  }
  if (Array.isArray(data) && data.length > 0) {
    return data;
  }

  return data.modules || []; 
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/login", { email: email.trim(), password });
      const { token, user } = data || {};
      const modules = normalizeModules(data);
      if (!token) throw new Error("No vino token");
      localStorage.setItem("token", token);
      return { token, user, modules };
    } catch (e) {
      return rejectWithValue(e?.response?.data?.msg || "Error de login");
    }
  }
);

export const fetchModules = createAsyncThunk(
  "auth/fetchModules",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      if (!auth?.token) throw new Error("Sin token");
      
      const { data } = await api.get("/modules"); 
      const mods = normalizeModules(data);
      return Array.isArray(mods) ? mods : [];
    } catch (err) {
      console.error("Error fetchModules:", err);
      return rejectWithValue("No se pudieron cargar los módulos");
    }
  }
);


function getInitialAuthState() {
  const token = localStorage.getItem("token");
  // Si NO hay token, retornamos estado vacío
  if (!token) {
    return { token: null, user: null, modules: [], status: "idle", error: null };
  }
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const modules = JSON.parse(localStorage.getItem("modules") || "[]");
    return { token, user, modules, status: "idle", error: null };
  } catch {
    localStorage.clear();
    return { token: null, user: null, modules: [], status: "idle", error: null };
  }
}

const slice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {
    logout(s) {
      s.token = null; 
      s.user = null; 
      s.modules = [];
      localStorage.removeItem("token");
    }
  },
  extraReducers: (b) => {
    b
      .addCase(login.pending, (s) => { 
        s.status = "loading"; 
        s.error = null; 
      })
      .addCase(login.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.token = a.payload.token;
        s.user = a.payload.user || null;
        s.modules = a.payload.modules || [];
      })
      .addCase(login.rejected, (s, a) => { 
        s.status = "failed"; 
        s.error = a.payload || "Error de login"; 
      })

      .addCase(fetchModules.pending, (s) => {
        s.status = "loading";
      })
      .addCase(fetchModules.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.modules = a.payload || [];
      })
      .addCase(fetchModules.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload || "Error al cargar módulos";
      });
  }
});

export const { logout } = slice.actions;
export default slice.reducer;