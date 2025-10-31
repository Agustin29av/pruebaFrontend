  import { useLocation } from "react-router-dom";

  export default function GenericModule() {
    const location = useLocation();
    
    const moduleName = location.pathname
      .split("/")
      .pop()
      .replace(/-/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          {/* Ícono */}
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 
                            rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>

          {/* Título */}
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
            {moduleName || "Módulo"}
          </h1>

          {/* Descripción */}
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Este módulo está en construcción y estará disponible próximamente.
          </p>


        </div>
      </div>
    );
  }