// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDark } from "@/features/ui/uiSlice";
import { fetchModules, logout } from "@/features/auth/authSlice";
import Sidebar from "@/components/Sidebar";
/*import ModulesDebug from "@/components/ModulesDebug"; // 🔴 DEBUG */
import logo from "@/assets/logo.png";

function Header({ onToggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector(s => s.ui.darkMode);
  const user = useSelector(s => s.auth.user);
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const formatName = () => {
    if (!user?.first_name) return "Usuario";
    const firstName = user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1).toLowerCase();
    const lastName = user.last_name ? user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1).toLowerCase() : "";
    return `${firstName} ${lastName}`.trim();
  };


  const getInitials = () => {
    if (!user) return "U";
    const first = user.first_name?.charAt(0) || "";
    const last = user.last_name?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setDropdownOpen(false);
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 
                       border-b border-slate-200 dark:border-slate-700 
                       bg-white dark:bg-slate-900
                       sticky top-0 z-40 shadow-sm">
      
      {/* boton hamburugesa */}
      <button 
        onClick={onToggle} 
        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 
                   transition-all duration-200 text-slate-700 dark:text-slate-200 hover:scale-110"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      <div
        onClick={() => navigate("/")}
        aria-label="Ir al dashboard"
        title="Ir al dashboard"
        className="group relative flex items-center cursor-pointer select-none"
      >
        <img
          src={logo}
          alt="IntelliNext"
          className="h-10 md:h-12 w-auto object-contain
                    transition-transform duration-200
                    motion-safe:group-hover:-translate-y-0.5
                    motion-safe:group-hover:scale-[1.02]
                    drop-shadow-sm"
        />
        <span
          className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2
                    h-[2px] w-0 opacity-0
                    bg-slate-300 dark:bg-slate-600 rounded-full
                    transition-all duration-200
                    motion-safe:group-hover:w-2/3 motion-safe:group-hover:opacity-100"
        />
      </div>



      <div className="flex items-center gap-3">
        
        {/* Boton Dark Mode con animacion */}
        <button
          onClick={() => dispatch(toggleDark())}
          className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 
                     transition-all duration-300 group"
          title={darkMode ? "Modo claro" : "Modo oscuro"}
        >
          {/* transaccion entre sol y luna */}
          <div className="relative w-5 h-5">
            {/* Sol */}
            <svg 
              className={`absolute inset-0 transition-all duration-500 ${
                darkMode ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
              }`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {/* Luna */}
            <svg 
              className={`absolute inset-0 transition-all duration-500 ${
                darkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
              }`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </div>
        </button>


        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-2 rounded-lg 
                       hover:bg-slate-100 dark:hover:bg-slate-800 
                       transition-all"
          >

            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 
                            flex items-center justify-center text-white font-semibold text-sm
                            shadow-md">
              {getInitials()}
            </div>
            

            <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-slate-200">
              {formatName()}
            </span>
            

            <svg 
              className={`w-4 h-4 text-slate-500 transition-transform duration-200 
                         ${dropdownOpen ? "rotate-180" : ""}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>


          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 
                            bg-white dark:bg-slate-800 
                            border border-slate-200 dark:border-slate-700
                            rounded-xl shadow-2xl overflow-hidden z-50">
              

              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <div className="font-semibold text-slate-800 dark:text-slate-100">
                  {formatName()}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  {user?.email || "usuario@ejemplo.com"}
                </div>
              </div>


              <div className="py-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm
                             text-red-600 dark:text-red-400
                             hover:bg-red-50 dark:hover:bg-red-900/20
                             transition-colors text-left"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium">Cerrar sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </header>
  );
}

export default function AppLayout() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const modules = useSelector(s => s.auth.modules);
  const token = useSelector(s => s.auth.token) || localStorage.getItem("token");

  useEffect(() => {
    if (token && (!modules || !modules.length)) {
      dispatch(fetchModules());
    }
  }, [token, modules?.length, dispatch]);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header onToggle={() => setOpen(v => !v)} />
      
      <div className="flex">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        
        <main className={`flex-1 p-4 md:p-6 transition-all duration-200
                       ${open ? "md:ml-64" : "md:ml-0"}`}>
          <Outlet />
        </main>
      </div>

      
    </div>
  );
}