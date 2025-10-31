import { createSlice } from "@reduxjs/toolkit";

const storedDark = localStorage.getItem("darkMode");
const initialDark = storedDark === "true" || storedDark === null; // default true si no existe

if (initialDark) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const uiSlice = createSlice({
  name: "ui",
  initialState: { darkMode: initialDark },
  reducers: {
    toggleDark(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", String(state.darkMode));
      
      // Toggle clase en <html>
      if (state.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});

export const { toggleDark } = uiSlice.actions;
export default uiSlice.reducer;