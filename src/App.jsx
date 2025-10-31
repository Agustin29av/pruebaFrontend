import { Outlet } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] grid-rows-[64px_1fr]">
      <aside className="row-span-2 bg-slate-950 text-slate-100">
        <div className="p-4 text-lg font-semibold">Prueba Frontend</div>
        <Sidebar />
      </aside>

      <Topbar />

      <main className="p-6 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
        <Outlet />
      </main>
    </div>
  );
} 
