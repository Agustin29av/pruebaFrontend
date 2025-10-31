/* 
// COMPONENTE TEMPORAL PARA VER QUE MODULOS ME TRAIGO
import { useSelector } from "react-redux";

export default function ModulesDebug() {
  const modules = useSelector(s => s.auth.modules) || [];
  const token = useSelector(s => s.auth.token);
  const user = useSelector(s => s.auth.user);

  return (
    <div className="fixed bottom-4 right-4 max-w-md max-h-96 overflow-auto
                    bg-white dark:bg-slate-800 border-2 border-red-500 
                    rounded-lg p-4 shadow-2xl z-50 text-xs">
      <div className="font-bold text-red-600 dark:text-red-400 mb-2">
         DEBUG - MÓDULOS
      </div>
      
      <div className="mb-2 text-slate-700 dark:text-slate-200">
        <strong>Token:</strong> {token ? "✅ Existe" : "❌ No existe"}
      </div>
      
      <div className="mb-2 text-slate-700 dark:text-slate-200">
        <strong>Usuario:</strong> {user?.first_name || "Sin usuario"}
      </div>
      
      <div className="mb-2 text-slate-700 dark:text-slate-200">
        <strong>Cantidad de módulos:</strong> {modules.length}
      </div>

      {modules.length > 0 && (
        <>
          <div className="font-semibold mt-3 mb-1 text-slate-700 dark:text-slate-200">
            Módulos encontrados:
          </div>
          <pre className="bg-slate-100 dark:bg-slate-900 p-2 rounded overflow-auto max-h-48 text-[10px] text-slate-800 dark:text-slate-300">
            {JSON.stringify(modules, null, 2)}
          </pre>
        </>
      )}

      {modules.length === 0 && (
        <div className="text-amber-600 dark:text-amber-400 mt-2">
           No hay módulos. Verificá que el login los devuelva o que fetchModules() se ejecute.
        </div>
      )}

      {/* Botón para limpiar todo y forzar re-login }
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        className="mt-3 w-full px-3 py-2 bg-red-600 text-white text-xs rounded hover:bg-red-700"
      >
         Limpiar y Re-login
      </button>
    </div>
  );
}
*/