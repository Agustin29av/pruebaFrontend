// src/features/devices/devicesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";

function normalizeDevicesResponse(raw) {
  let items = [];
  let total = 0; 
  let limit = 8;

  if (raw?.data?.results) {
    items = raw.data.results || [];
    // total = Number(raw.data.total ?? raw.data.count ?? 0); 
    limit = Number(raw.data.limit ?? limit);
  } else if (raw?.items) {
    items = raw.items || [];
    // total = Number(raw.total ?? 0); 
    limit = Number(raw.limit ?? limit);
  } else if (raw?.results) {
    items = raw.results || [];
    // total = Number(raw.total ?? 0); 
    limit = Number(raw.limit ?? limit);
  } else if (Array.isArray(raw)) {
    items = raw;
    // total = raw.length; 
  } else {
    items = [];
    total = 0;
  }


  const mapped = items.map((it) => {
    const id =
      it.id_device ?? it.id ?? it.deviceId ?? it.uuid ?? it._id ?? it.serial ?? it.settings_device?.serial;

    const status =
      it.status ?? (typeof it.active === "boolean" ? (it.active ? 1 : 0) : undefined);

    const serial =
      it.serial ?? it.sn ?? it.code ?? it.settings_device?.serial ?? it.meta?.serial;

    return {
      id_device: id,
      device_name: it.device_name ?? it.name ?? it.title ?? "Dispositivo",
      device_model: it.device_model ?? it.model ?? it.model_name ?? "—",
      factory_family: it.factory_family ?? it.factory?.family ?? it.brand ?? it.vendor ?? "",
      photo: it.photo ?? it.image ?? it.picture ?? it.thumbnail ?? "",
      status: typeof status === "number" ? status : 0,
      settings_device: {
        serial,
        online:
          typeof it.online === "number"
            ? it.online
            : typeof it.online === "boolean"
            ? (it.online ? 1 : 0)
            : it.settings_device?.online ?? 0,
        disabled:
          typeof it.disabled === "number"
            ? it.disabled
            : typeof it.disabled === "boolean"
            ? (it.disabled ? 1 : 0)
            : it.settings_device?.disabled ?? 0,
      },
    };
  });

  return { items: mapped, total, limit }; // total siempre será 0
}

const buildSearch = (raw) => {
  const tokens = String(raw || "")
    .toUpperCase()
    .split(/[\s,]+/)
    .map((t) => t.trim())
    .filter(Boolean);
  return tokens.length ? tokens.join(",") : undefined;
};

export const fetchDevices = createAsyncThunk(
  "devices/fetch",
  async ({ limit, offset, search, replace = false }, { rejectWithValue }) => {
    try {
      const params = { limit, offset };
      const q = buildSearch(search);
      if (q) params.search = q;
      const { data } = await api.get("/devices", { params });
      const normalized = normalizeDevicesResponse(data);
      return { ...normalized, _arg: { limit, offset, replace } }; 
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Error";
      return rejectWithValue({ msg });
    }
  }
);

const slice = createSlice({
  name: "devices",
  initialState: { items: [], offset: 0, more: true, status: "idle", error: null, total: 0 },
  reducers: {
    reset(s) { s.items = []; s.offset = 0; s.more = true; s.error = null; s.total = 0; }
  },
  extraReducers: (b) => {
    b.addCase(fetchDevices.pending, (s) => { s.status = "loading"; s.error = null; });

    b.addCase(fetchDevices.fulfilled, (s, a) => {
      s.status = "idle";

      const got = a.payload?.items ?? [];
      const total = Number(a.payload?.total ?? 0); // 
      
      const req = a.payload?._arg || {};
      const isReplace = req.replace || req.offset === 0;

      
      const requestedLimit = Number(req.limit ?? a.payload?.limit ?? 8);

      if (isReplace) {
        s.items = got;
        s.offset = (req.offset ?? 0) + got.length;
      } else {
        s.items = [...s.items, ...got];
        s.offset = s.offset + got.length;
      }

      s.total = total; 

      
      if (Number.isFinite(total) && total > 0) {
        s.more = s.offset < total;
      } else {
      
        s.more = got.length === requestedLimit && got.length > 0;
      }
    });

    b.addCase(fetchDevices.rejected, (s, a) => {
      s.status = "failed";
      s.error = a.payload?.msg || "Error";
    });
  },
});

export const { reset } = slice.actions;
export default slice.reducer;