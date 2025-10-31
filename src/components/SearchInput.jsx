import { useEffect, useState } from "react";
export default function SearchInput({ onChange, placeholder }) {
  const [v, setV] = useState("");
  useEffect(() => {
    const t = setTimeout(() => onChange(v.trim()), 450);
    return () => clearTimeout(t);
  }, [v]);
  return (
    <input
      value={v}
      onChange={(e)=>setV(e.target.value)}
      placeholder={placeholder}
      className="w-full md:w-80 px-3 py-2 rounded-xl
                 bg-white text-slate-900 border border-slate-300
                 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600"
    />
  );
}
