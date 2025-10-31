export default function DeviceCard({ d }) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 p-4 bg-white/80 dark:bg-white/5 transition transform hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <img className="w-12 h-12 rounded-xl" src="https://placehold.co/64x64" />
        <div>
          <div className="font-semibold">{d?.name ?? `Device ${d?.id}`}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {d?.model ?? "—"} · {d?.serial ?? "—"}
          </div>
        </div>
      </div>
    </div>
  );
}
