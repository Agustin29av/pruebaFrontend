import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SidebarNode({ node }) {
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;
  const [open, setOpen] = useState(false);

  if (!hasChildren && node.route) {
    return (
      <NavLink
        to={node.route}
        className={({ isActive }) =>
          "block px-3 py-2 rounded-lg text-sm " +
          (isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/10")
        }
      >
        {node.name}
      </NavLink>
    );
  }

  return (
    <div className="px-1">
      <button
        onClick={() => setOpen(v=>!v)}
        className="w-full text-left px-2 py-2 rounded-lg text-slate-200 hover:bg-white/10"
      >
        {node.name} {hasChildren && <span className="opacity-60">{open ? "▾" : "▸"}</span>}
      </button>
      {open && (
        <div className="ml-3 border-l border-white/10 pl-3 space-y-1">
          {node.children.map(c => <SidebarNode key={c.id} node={c} />)}
        </div>
      )}
    </div>
  );
}
