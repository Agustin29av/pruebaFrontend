import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/axios";

function normalizeDevicesResponse(raw) {
  if (Array.isArray(raw)) return { items: raw, total: raw.length, limit: 8 };

  if (raw?.data?.results) {
    const res = raw.data;
    return {
      items: res.results || [],
      total: Number(res.total ?? res.count ?? res.results?.length ?? 0),
      limit: Number(res.limit ?? 8)
    };
  }

  if (raw?.items) {
    return {
      items: raw.items,
      total: Number(raw.total ?? raw.items.length ?? 0),
      limit: Number(raw.limit ?? 8)
    };
  }

  if (raw?.results) {
    return {
      items: raw.results,
      total: Number(raw.total ?? raw.results.length ?? 0),
      limit: Number(raw.limit ?? 8)
    };
  }

  return { items: [], total: 0, limit: 8 };
}

const buildSearch = (raw) => {
  const tokens = String(raw || "")
    .toUpperCase()
    .split(/[\s,]+/)
    .map(t => t.trim())
    .filter(Boolean);
  return tokens.length ? tokens.join(",") : undefined;
};

export const fetchDevices = createAsyncThunk(
  "devices/fetch",
  async ({ limit, offset, search }, { rejectWithValue }) => {
    try {
      const params = { limit, offset };
      const q = buildSearch(search);
      if (q) params.search = q;
      const { data } = await api.get("/devices", { params });
      return normalizeDevicesResponse(data);
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
    reset(s){ s.items=[]; s.offset=0; s.more=true; s.error=null; s.total=0; }
  },
  extraReducers: b=>{
    b.addCase(fetchDevices.pending, s=>{ s.status="loading"; s.error=null; });
    b.addCase(fetchDevices.fulfilled, (s,a)=>{
      s.status="idle";
      const got = a.payload?.items ?? [];
      const total = a.payload?.total;
      const limit = a.payload?.limit ?? 8;
      
      s.items = got;
      s.offset = a.meta.arg.offset + got.length;
      s.total = total; // Guardamos el total
      s.more = Number.isFinite(total) ? (s.offset < total) : (got.length === limit);
    });
    b.addCase(fetchDevices.rejected, (s,a)=>{ s.status="failed"; s.error = a.payload?.msg || "Error"; });
  }
});

export const { reset } = slice.actions;
export default slice.reducer;