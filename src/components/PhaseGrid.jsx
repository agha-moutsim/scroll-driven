import { forwardRef } from 'react'

const ENTRIES = [
  { year: '2024', name: 'Aformo', note: 'No slow motion' },
  { year: '2023', name: 'Vessel', note: 'No speed ramping' },
  { year: '2022', name: 'Meridian', note: 'Away to another angle' },
  { year: '2021', name: 'Halcyon', note: 'No on-screen text' },
  { year: '2020', name: 'Arc', note: 'No cutting away' },
  { year: '2019', name: 'Solace', note: 'No cuts' },
]

const PhaseGrid = forwardRef(function PhaseGrid(_, ref) {
  return (
    <div
      ref={ref}
      className="w-full max-w-5xl opacity-0 [transform-style:preserve-3d] will-change-[opacity,transform]"
    >
      <p
        className="shadow-3d-soft mb-10 text-center text-[10px] font-medium uppercase tracking-[0.35em] text-white/70 [transform:translateZ(-50px)] md:text-xs"
      >
        Chapter 02 — Index
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 [transform:translateZ(0px)]">
        {ENTRIES.map((entry) => (
          <div
            key={entry.name}
            className="card-3d border-t border-white/20 px-5 py-8 md:px-8"
          >
            <div className="shadow-3d-soft font-mono text-xs text-white/50">
              {entry.year}
            </div>
            <div className="shadow-3d mt-3 text-xl font-medium tracking-tight text-white md:text-2xl">
              {entry.name}
            </div>
            <div className="shadow-3d-soft mt-1 text-sm text-white/60">
              {entry.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default PhaseGrid
