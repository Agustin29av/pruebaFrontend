import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleDark } from "../features/ui/uiSlice";
import { logout } from "../features/auth/authSlice";

export default function Topbar() {
  const dispatch = useDispatch();
  const token = useSelector(s => s.auth.token);

  return (
    <header className="h-16 border-b border-black/10 dark:border-white/10
                       flex items-center justify-end gap-3 px-4
                       bg-white/70 backdrop-blur dark:bg-slate-900/60">

      <button className="btn btn-primary" onClick={() => dispatch(toggleDark())}>
        {document.documentElement.classList.contains('dark') ? 'Light' : 'Dark'}
      </button>

      {!token ? (
        <Link to="/login" className="btn">Login</Link>
      ) : (
        <div className="relative group">
          <div className="w-9 h-9 rounded-full bg-sky-600/20 grid place-items-center text-xs cursor-pointer">
            AA
          </div>
          <div className="absolute right-0 mt-2 hidden group-hover:block min-w-[160px]
                          rounded-xl border border-black/10 dark:border-white/10
                          bg-white dark:bg-slate-800 shadow-lg">
            <button
              className="w-full text-left px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10 rounded-xl"
              onClick={() => dispatch(logout())}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
