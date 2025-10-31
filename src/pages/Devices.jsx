import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevices, reset } from "../features/devices/devicesSlice";

function DevicePagination({ currentPage, totalPages, goToPage, isLoading }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxButtons = 5;

  if (totalPages <= maxButtons + 2) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);
    if (currentPage <= 3) end = 4;
    else if (currentPage >= totalPages - 2) start = totalPages - 3;
    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="px-4 py-2 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        ← Anterior
      </button>
      
      <div className="flex gap-1">
        {pages.map((p, index) => (
          p === '...' ? (
            <span key={index} className="px-4 py-2 text-slate-500">...</span>
          ) : (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`w-10 h-10 rounded-lg font-medium transition-all ${
                currentPage === p
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              disabled={isLoading}
            >
              {p}
            </button>
          )
        ))}
      </div>

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="px-4 py-2 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Siguiente →
      </button>
    </div>
  );
}

function DeviceModal({ device, onClose }) {
  const d = device;
  
  return (
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
          {d.photo && (
            <img 
              src={d.photo} 
              alt={d.device_model}
              className="absolute right-0 bottom-0 h-full object-contain opacity-30"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          )}
          <div className="absolute bottom-4 left-4">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">
              {d.device_name ?? "Dispositivo"}
            </h2>
            <p className="text-cyan-100 text-sm">{d.device_model ?? "—"}</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Badge de estado */}
          <div className="flex justify-start">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
              ${d.status === 1 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400'
              }`}>
              <span className={`w-2 h-2 rounded-full ${d.status === 1 ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></span>
              {d.status === 1 ? 'Activo' : 'Inactivo'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">Modelo</p>
              <p className="text-sm text-slate-800 dark:text-slate-100">{d.device_model ?? "—"}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">Familia</p>
              <p className="text-sm text-slate-800 dark:text-slate-100">{d.factory_family ?? "—"}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 col-span-2">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">Serial</p>
              <p className="text-sm text-slate-800 dark:text-slate-100 font-mono">
                {d.settings_device?.serial ?? "—"}
              </p>
            </div>
          </div>

          {d.settings_device && (
            <div className="space-y-2">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Configuración</p>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Online:</span>
                  <span className="text-slate-800 dark:text-slate-100 font-medium">
                    {d.settings_device.online === 1 ? 'Sí' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Deshabilitado:</span>
                  <span className="text-slate-800 dark:text-slate-100 font-medium">
                    {d.settings_device.disabled === 1 ? 'Sí' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <button 
            onClick={onClose}
            className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold
                       hover:from-cyan-600 hover:to-blue-700 transition-all duration-300
                       transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

function DeviceCard({ device, onClick }) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const d = device;

  const PlaceholderIcon = () => (
    <svg className="w-16 h-16 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a3 3 0 003-3V7.5a3 3 0 00-3-3H6.75a3 3 0 00-3 3v9a3 3 0 003 3z" />
    </svg>
  );

  return (
    <div 
      className="group relative bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 
                 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-cyan-400 dark:hover:border-cyan-500
                 hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="absolute top-3 right-3 z-10">
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm
          ${d.status === 1 
            ? 'bg-green-500/90 text-white shadow-lg shadow-green-500/30' 
            : 'bg-slate-500/90 text-white shadow-lg shadow-slate-500/30'
          }`}>
          <span className={`w-2 h-2 rounded-full ${d.status === 1 ? 'bg-white animate-pulse' : 'bg-slate-300'}`}></span>
          {d.status === 1 ? 'Activo' : 'Inactivo'}
        </span>
      </div>

      <div className="relative h-48 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 
                      flex items-center justify-center overflow-hidden">

        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                        transition-transform duration-700 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}></div>
        
        {!imgError && d.photo ? (
          <img 
            src={d.photo} 
            alt={d.device_model || 'Dispositivo'}
            className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <PlaceholderIcon />
        )}
      </div>

      <div className="p-5">
        {/* Título */}
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1 truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          {d.device_name ?? "Sin Nombre"}
        </h3>

        {/* Modelo y Familia */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs text-slate-600 dark:text-slate-300">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {d.device_model ?? "—"}
          </span>
          {d.factory_family && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({d.factory_family})
            </span>
          )}
        </div>

        {/* Serial */}
        {d.settings_device?.serial && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            <span className="font-mono">{d.settings_device.serial}</span>
          </div>
        )}

        <div className="border-t border-slate-200 dark:border-slate-700 pt-3 mt-3">
          <div className="w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium text-center
                           opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            Ver Detalles
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Devices() {
  const dispatch = useDispatch();
  const { items, status, more, offset } = useSelector(s => s.devices);
  const [query, setQuery] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(reset());
      setCurrentPage(1);
      dispatch(fetchDevices({ limit: ITEMS_PER_PAGE, offset: 0, search: query }))
        .unwrap()
        .then((data) => {
          const total = data?.total || 0;
          setTotalPages(Math.ceil(total / ITEMS_PER_PAGE) || 1);
        })
        .catch(() => setTotalPages(1));
    }, 400);
    return () => clearTimeout(id);
  }, [query, dispatch]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || status === "loading") return;
    setCurrentPage(page);
    const newOffset = (page - 1) * ITEMS_PER_PAGE;
    dispatch(fetchDevices({ limit: ITEMS_PER_PAGE, offset: newOffset, search: query }))
      .unwrap()
      .then((data) => {
        const total = data?.total || 0;
        setTotalPages(Math.ceil(total / ITEMS_PER_PAGE) || 1);
      })
      .catch(() => setTotalPages(1));
  };

  const loadMore = () => {
    if (!more || status === "loading") return;
    dispatch(fetchDevices({ limit: ITEMS_PER_PAGE, offset, search: query }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Dispositivos
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {items.length} dispositivo{items.length !== 1 ? 's' : ''} encontrado{items.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Buscador mejorado */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          className="w-full pl-12 pr-4 py-3 
                     bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 
                     border-2 border-slate-200 dark:border-slate-700 
                     rounded-xl focus:outline-none focus:ring-2 
                     focus:ring-cyan-500 focus:border-transparent
                     transition-all duration-200"
          placeholder="Buscar por nombre, modelo o serial..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* Estados de carga */}
      {status === "loading" && items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 dark:text-slate-400">Cargando dispositivos...</p>
        </div>
      )}

      {items.length === 0 && status !== "loading" && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <svg className="w-24 h-24 text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg text-slate-500 dark:text-slate-400">No se encontraron dispositivos</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Intenta ajustar tu búsqueda</p>
        </div>
      )}

      {/* Grid de dispositivos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map(d => (
          <DeviceCard 
            key={d.id_device ?? d.id ?? d.settings_device?.serial} 
            device={d}
            onClick={() => setSelectedDevice(d)}
          />
        ))}
      </div>

      {/* Modal de detalle */}
      {selectedDevice && (
        <DeviceModal 
          device={selectedDevice} 
          onClose={() => setSelectedDevice(null)} 
        />
      )}

      {/* Paginación */}
      <DevicePagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        goToPage={goToPage} 
        isLoading={status === "loading"} 
      />

      {more && totalPages <= 1 && (
        <div className="flex justify-center pt-6">
          <button 
            onClick={loadMore} 
            disabled={status === "loading"} 
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold
                       hover:from-cyan-600 hover:to-blue-700 transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Cargando...
              </span>
            ) : (
              "Cargar más dispositivos"
            )}
          </button>
        </div>
      )}
    </div>
  );
}