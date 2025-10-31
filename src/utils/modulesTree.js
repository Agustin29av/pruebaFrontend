export function buildModulesTree(raw = []) {
  const rows = (raw || [])
    .filter(m => m && m.path && m.is_render === 1)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .map(m => ({
      id: m.id_module ?? m.id ?? cryptoId(),
      name: formatModuleName(m.module ?? m.name ?? ""),
      dot: m.path,
      route: m.setting_module_config?.route ? `/${String(m.setting_module_config.route).replace(/^\//,'')}` : null,
      children: []
    }));

  const map = new Map(rows.map(r => [r.dot, r]));
  const roots = [];

  for (const n of rows) {
    const parentDot = n.dot.split(".").slice(0, -1).join(".");
    const depth = n.dot.split(".").length;
    if (!parentDot || depth === 2) { roots.push(n); continue; }
    const parent = map.get(parentDot);
    if (parent) parent.children.push(n);
    else roots.push(n);
  }

  return roots;
}

function cryptoId(){ return `m_${Math.random().toString(36).slice(2,9)}`; }

function formatModuleName(name=""){
  const x = name.toLowerCase().replace(/_/g," ");
  return x.charAt(0).toUpperCase()+x.slice(1);
}
