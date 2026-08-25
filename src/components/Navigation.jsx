const LINKS = ['About', 'Contact']

export default function Navigation() {
  return (
    <nav className="fixed inset-x-0 top-0 z-30 mix-blend-difference">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10 md:py-7">
        <a
          href="#"
          className="text-xs font-medium uppercase tracking-[0.2em] text-white md:text-sm"
        >
          ← ENU
        </a>
        <div className="flex items-center gap-6 md:gap-10">
          {LINKS.map((label) => (
            <a
              key={label}
              href="#"
              className="text-xs font-medium uppercase tracking-[0.2em] text-white transition-opacity duration-300 hover:opacity-60 md:text-sm"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
