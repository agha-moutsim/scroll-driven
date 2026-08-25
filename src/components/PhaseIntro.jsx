import { forwardRef } from 'react'

const PhaseIntro = forwardRef(function PhaseIntro(_, ref) {
  return (
    <div
      ref={ref}
      className="max-w-2xl text-center opacity-0 [transform-style:preserve-3d] will-change-[opacity,transform]"
    >
      <p
        className="shadow-3d-soft mb-6 text-[10px] font-medium uppercase tracking-[0.35em] text-white/70 [transform:translateZ(-50px)] md:text-xs"
      >
        Chapter 01 — Plate
      </p>
      <p
        className="shadow-3d font-serif text-2xl font-light leading-snug text-white [transform:translateZ(0px)] md:text-4xl md:leading-[1.25]"
      >
        Every scene starts as a plate. We light it, shoot it, keep what the lens
        kept. The only effect is that you cannot find one.
      </p>
    </div>
  )
})

export default PhaseIntro
