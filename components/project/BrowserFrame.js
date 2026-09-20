/** Browser-window chrome for framing schematics. It never shows fake screenshots. */
export function BrowserFrame({ url, label, children, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-line-strong bg-paper shadow-[0_40px_90px_-50px_rgb(20_19_15/0.45)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line bg-paper-2 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          ))}
        </div>
        <div className="min-w-0 flex-1 truncate rounded-full bg-paper px-3 py-1 font-mono text-[0.68rem] text-ink-2">
          {url}
        </div>
        {label ? <span className="hidden font-mono text-[0.62rem] uppercase tracking-widest text-ink-2 sm:block">{label}</span> : null}
      </div>
      {children}
    </div>
  )
}
