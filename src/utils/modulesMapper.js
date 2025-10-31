export function mapModules(mods = []) {
  return mods.map(m => normalizeNode(m));
}

function normalizeNode(m) {
  const id =
    m.id ?? m.idModulo ?? m.code ?? m.key ?? m.name ?? cryptoRandom();
  const name =
    m.name ?? m.titulo ?? m.label ?? m.text ?? String(id);
  const path =
    m.path ?? m.ruta ?? m.url ?? m.link ?? null;
  const children =
    m.children ?? m.subModulos ?? m.items ?? m.hijos ?? [];

  const node = { id, name };
  if (typeof path === "string" && path.trim()) node.path = path.trim();
  if (Array.isArray(children) && children.length) {
    node.children = children.map(c => normalizeNode(c));
  }
  return node;
}

function cryptoRandom() {
  return `m_${Math.random().toString(36).slice(2, 9)}`;
}