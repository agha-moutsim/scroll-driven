import { forwardRef } from 'react'

const PhaseHeadline = forwardRef(function PhaseHeadline(_, ref) {
  return (
    <div
      ref={ref}
      className="text-center opacity-0 [transform-style:preserve-3d] will-change-[opacity,transform]"
    >
      <p
        className="shadow-3d-soft mb-6 text-[10px] font-medium uppercase tracking-[0.35em] text-white/70 [transform:translateZ(-70px)] md:text-xs"
      >
        Chapter 03 — Manifesto
      </p>
      <h1 className="fill-3d text-[17vw] font-black uppercase leading-[0.86] tracking-tighter md:text-[11vw] lg:text-[9.5rem] [transform:translateZ(0px)]">
        <span className="block">Fixed</span>
        <span className="block">In Post</span>
      </h1>
      <p
        className="shadow-3d-soft mt-7 text-[10px] uppercase tracking-[0.4em] text-white/80 [transform:translateZ(-40px)] md:text-xs"
      >
        Creative AI Film Studio
      </p>
    </div>
  )
})

export default PhaseHeadline
