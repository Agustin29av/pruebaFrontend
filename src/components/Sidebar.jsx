// @ts-nocheck
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Globe2, ExternalLink } from "lucide-react";


function buildTree(mods = []) {
  const filtered = mods.filter(m => m?.is_render === 1 && typeof m?.path === "string");
  filtered.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  const root = {};
  
  for (const m of filtered) {
    const parts = m.path.split(".");
    let curr = root;
    
    parts.forEach((p, i) => {
      curr.children = curr.children || {};
      curr.children[p] = curr.children[p] || { __items: [], __label: null };
      
      if (i === parts.length - 1) {
        curr.children[p].__items.push(m);
        if (!curr.children[p].__label) {
          curr.children[p].__label = m.module;
        }
      }
      
      curr = curr.children[p];
    });
  }
  
  return root.children || {};
}


function formatModuleName(name) {
  if (!name) return "";
  const formatted = name.toLowerCase().replace(/_/g, " ");
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}


function TreeNode({ label, node, level = 0, onNavigate }) {
  const [open, setOpen] = useState(true); 
  
  const items = node.__items || [];
  const childKeys = Object.keys(node.children || {});
  const hasChildren = childKeys.length > 0;

  const ID_TO_LABEL = {
    "1": "Principal",
    "2": "Administración", 
    "3": "Reportes",
    "4": "Eventos",
    "5": "Configuración",
    "48": "Intelli Time",
    "49": "Dashboard",
    "50": "Monitoreo",
  };

  const displayLabel = node.__label || ID_TO_LABEL[label] || label;

  return (
    <div className="mb-1">
      {hasChildren && (
        <button
          onClick={() => setOpen(v => !v)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                     text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          style={{ paddingLeft: 8 + level * 16 }}
        >
          {/* Chevron */}
          <svg 
            className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          
          <span className="truncate flex-grow text-left font-semibold">
            {formatModuleName(displayLabel)}
          </span>
        </button>
      )}

      {open && (
        <div className={hasChildren ? "ml-2 space-y-1" : "space-y-1"}>
          {items.map((m, idx) => {
            const route = m?.setting_module_config?.route;
            if (!route) return null;
            
            const cleanRoute = String(route).trim().replace(/^\/+/, "");
            
            return (
              <NavLink
                key={`${m.path}-${idx}`}
                to={`/${cleanRoute}`}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                   ${isActive 
                     ? "bg-cyan-500 text-white shadow-md" 
                     : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                   }`
                }
                style={{ paddingLeft: 8 + (level + 1) * 16 }}
                onClick={onNavigate}
              >
                <span className="w-2 h-2 rounded-full bg-current flex-shrink-0"></span>
                <span className="truncate">{formatModuleName(m.module || route)}</span>
              </NavLink>
            );
          })}

          {/* Hijos recursivos */}
          {childKeys.map(k => (
            <TreeNode
              key={k}
              label={k}
              node={node.children[k]}
              level={level + 1}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}


export default function Sidebar({ open, onClose }) {
  const modules = useSelector(s => s.auth.modules) || [];
  const tree = useMemo(() => buildTree(modules), [modules]);

  return (
    <>
      <aside
        className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64
                    bg-white dark:bg-slate-900 
                    border-r border-slate-200 dark:border-slate-700
                    transition-transform duration-300 z-40 shadow-lg
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 overflow-y-auto h-full">
          {/* Header */}
          <div className="mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Menú Principal
            </h2>
          </div>
          
          {/* arbol de modulos */}
          <div className="space-y-1">
            {Object.entries(tree).map(([key, node]) => (
              <TreeNode key={key} label={key} node={node} onNavigate={onClose} />
            ))}
          </div>

          {/* API Externa */}
          <hr className="my-4 border-slate-200 dark:border-slate-700" />

          <NavLink
            to="/external"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${isActive ? "bg-purple-500 text-white shadow-md" 
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"}`
            }
            onClick={onClose}
          >
            <Globe2 className="w-4 h-4" />
            <span>API Externa</span>
          </NavLink>


        </div>
      </aside>

      {open && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={onClose} />}
    </>
  );
}