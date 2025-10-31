import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "@/features/auth/authSlice";
import { toggleDark } from "@/features/ui/uiSlice";
import logo from "@/assets/logo.png";

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((s) => s.ui.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleDark())}
      className="fixed top-6 right-6 p-3 rounded-full 
                 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm
                 text-slate-700 dark:text-slate-200
                 hover:bg-white dark:hover:bg-slate-800
                 transition-all duration-300 hover:scale-110 shadow-lg z-50"
      title={darkMode ? "Modo claro" : "Modo oscuro"}
    >
      <div className="relative w-5 h-5">
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
  );
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((s) => s.auth.token) || localStorage.getItem("token");

  const [email, setEmail] = useState("carlospea13+1@gmail.com");
  const [password, setPassword] = useState("123456");
  const [submitting, setSubmitting] = useState(false);
  const [msgError, setMsgError] = useState("");

  if (token) return <Navigate to="/" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsgError("");
    setSubmitting(true);
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate("/");
    } catch (err) {
      const m = err?.message || err?.msg || "No se pudo iniciar sesión. Verificá usuario/contraseña.";
      setMsgError(m);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Formas decorativas de fondo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-200/20 dark:bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <DarkModeToggle />

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 mb-3 flex justify-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-2xl flex items-center justify-center p-3 animate-float group cursor-pointer">
                <img 
                  src={logo} 
                  alt="IntelliNext Logo" 
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-white relative z-10 mb-2">
              IntelliNext
            </h1>
            <p className="text-cyan-50 text-sm relative z-10">
              Accedé a tu cuenta
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={onSubmit} className="p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Correo electrónico
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl 
                           bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-slate-100 
                           border-2 border-slate-200 dark:border-slate-700
                           focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                           transition-all duration-200 placeholder:text-slate-400"
                placeholder="tu@email.com"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Contraseña
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl 
                           bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-slate-100 
                           border-2 border-slate-200 dark:border-slate-700
                           focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
                           transition-all duration-200 placeholder:text-slate-400"
                placeholder="••••••••"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error */}
            {msgError && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-500/30 rounded-xl">
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                  {msgError}
                </p>
              </div>
            )}

            <button
              className="w-full py-3.5 px-4 rounded-xl font-bold text-white text-lg
                         bg-gradient-to-r from-cyan-500 to-blue-600
                         hover:from-cyan-600 hover:to-blue-700
                         focus:outline-none focus:ring-4 focus:ring-cyan-500/50
                         disabled:opacity-60 disabled:cursor-not-allowed
                         transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                         shadow-lg hover:shadow-xl"
              disabled={submitting}
              type="submit"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Ingresando...
                </span>
              ) : (
                "Iniciar Sesión"
              )}
            </button>

            <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
              Prueba Técnica Frontend © 2025
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}