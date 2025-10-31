import { configureStore } from '@reduxjs/toolkit';
import uiReducer from "../features/ui/uiSlice";
import authReducer from "../features/auth/authSlice";
import devicesReducer from "../features/devices/devicesSlice";

export const store = configureStore({
    reducer: { ui: uiReducer, auth: authReducer, devices: devicesReducer },
});
