import { useEffect, useState } from "react";

const Modal = ({ character, onClose }) => (
  <div 
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeInUp"
    onClick={onClose}
  >
    <div
      className="relative max-w-2xl w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative h-48 bg-gradient-to-br from-cyan-500 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <img 
          src={character.images?.md} 
          alt={character.name}
          className="absolute right-0 bottom-0 h-full object-contain opacity-30"
        />
        <div className="absolute bottom-4 left-4">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">{character.name}</h2>
          <p className="text-cyan-100 text-sm">{character.biography?.fullName || "—"}</p>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 space-y-4">
       
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">Publisher</p>
            <p className="text-sm text-slate-800 dark:text-slate-100">{character.biography?.publisher ?? "—"}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">Raza</p>
            <p className="text-sm text-slate-800 dark:text-slate-100">{character.appearance?.race ?? "—"}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">Altura</p>
            <p className="text-sm text-slate-800 dark:text-slate-100">{character.appearance?.height?.[1] ?? "—"}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">Peso</p>
            <p className="text-sm text-slate-800 dark:text-slate-100">{character.appearance?.weight?.[1] ?? "—"}</p>
          </div>
        </div>

        {character.powerstats && (
          <div className="space-y-2">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Estadísticas</p>
            {Object.entries(character.powerstats).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-xs text-slate-600 dark:text-slate-300 w-24 capitalize">{key}</span>
                <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 w-8 text-right">{value}</span>
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={onClose}
          className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold
                     hover:from-cyan-600 hover:to-blue-700 transition-all duration-300
                     transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
);


const CharacterCard = ({ character, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 
                 overflow-hidden cursor-pointer transition-all duration-300 
                 hover:shadow-2xl hover:border-cyan-400 dark:hover:border-cyan-500 hover:-translate-y-2"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagen */}
      <div className="relative h-64 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
        
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                        transition-transform duration-700 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}></div>
        
        <img 
          src={character.images?.md} 
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          {character.name}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {character.biography?.publisher ?? "Desconocido"}
        </p>

        
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-medium text-center">
            Ver más
          </div>
        </div>
      </div>
    </div>
  );
};


export default function External() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_EXT_BASE}/all.json`);
        const data = await res.json();
        if (!alive) return;
        setItems(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const filtered = items.filter(x =>
    (x.name || "").toLowerCase().includes(q.toLowerCase())
  ).slice(0, 60);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Superhéroes
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {filtered.length} personaje{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Buscador */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Buscar superhéroe..."
          className="w-full pl-12 pr-4 py-3 
                     bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 
                     border-2 border-slate-200 dark:border-slate-700 
                     rounded-xl focus:outline-none focus:ring-2 
                     focus:ring-cyan-500 focus:border-transparent
                     transition-all duration-200"
        />
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 dark:text-slate-400">Cargando superhéroes...</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((char) => (
          <CharacterCard 
            key={char.id} 
            character={char} 
            onClick={() => setOpen(char)} 
          />
        ))}
      </div>

      {open && <Modal character={open} onClose={() => setOpen(null)} />}
    </div>
  );
}