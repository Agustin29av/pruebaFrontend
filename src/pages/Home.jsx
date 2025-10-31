import { useSelector } from "react-redux";

const StatCard = ({ title, value, icon, trend, color = "cyan" }) => {
  const colorClasses = {
    cyan: "from-cyan-500 to-blue-600",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-pink-600",
    orange: "from-orange-500 to-red-600",
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            {value}
          </p>
          {trend && (
            <p className={`text-xs font-medium ${trend.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center shadow-md`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const ActivityCard = ({ title, items }) => (
  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
      {title}
    </h3>
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
              {item.title}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {item.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Home() {
  const user = useSelector(s => s.auth.user);
  
  const formatName = () => {
    if (!user?.first_name) return "Usuario";
    return user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1).toLowerCase();
  };


  const stats = [
    {
      title: "Dispositivos Activos",
      value: "32",
      trend: { positive: true, value: "+12% vs mes anterior" },
      color: "cyan",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
    },
    {
      title: "Eventos Hoy",
      value: "148",
      trend: { positive: true, value: "+8% vs ayer" },
      color: "green",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: "Usuarios Online",
      value: "24",
      trend: { positive: false, value: "-2 vs hace 1h" },
      color: "purple",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: "Alertas Pendientes",
      value: "5",
      trend: null,
      color: "orange",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
  ];

  const recentActivity = [
    { title: "Dispositivo TORNIQUETE conectado", time: "Hace 5 min", color: "bg-green-500" },
    { title: "Evento de acceso registrado", time: "Hace 12 min", color: "bg-blue-500" },
    { title: "Configuración actualizada", time: "Hace 1 hora", color: "bg-purple-500" },
    { title: "Nueva alerta generada", time: "Hace 2 horas", color: "bg-orange-500" },
  ];

  return (
    <div className="space-y-6 animate-fadeInUp">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          ¡Bienvenido de vuelta, {formatName()}! 👋
        </h1>
        <p className="text-cyan-50">
          Aquí tienes un resumen de tu dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Actividad de Dispositivos (Últimos 7 días)
            </h3>
            {/* Gráfico de barras simple con CSS */}
            <div className="flex items-end justify-between gap-2 h-48">
              {[45, 62, 38, 71, 55, 68, 82].map((height, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t-lg transition-all duration-500 hover:opacity-80"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {['L', 'M', 'X', 'J', 'V', 'S', 'D'][idx]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <ActivityCard title="Actividad Reciente" items={recentActivity} />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Estado del Sistema
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Todos los servicios operando normalmente. Última actualización: hace 2 minutos.
        </p>
      </div>
    </div>
  );
}