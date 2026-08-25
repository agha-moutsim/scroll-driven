import { useEffect, useRef, useState } from 'react'
import Navigation from './components/Navigation'
import PhaseIntro from './components/PhaseIntro'
import PhaseGrid from './components/PhaseGrid'
import PhaseHeadline from './components/PhaseHeadline'
import Footer from './components/Footer'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { clamp, crossfade, setLayer } from './lib/scroll'

const SMOOTHING = 8
const FRAME_COUNT = 50
const PAD = 3

const frameUrl = (i) =>
  `/frames/ezgif-frame-${String(i + 1).padStart(PAD, '0')}.jpg`

export default function App() {
  const trackRef = useRef(null)
  const imgRef = useRef(null)
  const phase1Ref = useRef(null)
  const phase2Ref = useRef(null)
  const phase3Ref = useRef(null)
  const hintRef = useRef(null)

  const targetRef = useRef(0)
  const currentRef = useRef(0)
  const lastFrameRef = useRef(-1)
  const mouseTargetRef = useRef({ x: 0, y: 0 })
  const mouseRef = useRef({ x: 0, y: 0 })
  const reducedRef = usePrefersReducedMotion()

  const [ready, setReady] = useState(false)

  const rafRef = useRef(0)
  const metricsRef = useRef({ docTop: 0, scrollable: 1 })

  useEffect(() => {
    let cancelled = false
    const urls = Array.from({ length: FRAME_COUNT }, (_, i) => frameUrl(i))
    let loaded = 0
    const imgs = urls.map((src) => {
      const im = new Image()
      im.onload = im.onerror = () => {
        loaded += 1
        if (loaded === FRAME_COUNT && !cancelled) setReady(true)
      }
      im.src = src
      return im
    })

    if (imgRef.current) imgRef.current.src = urls[0]

    return () => {
      cancelled = true
      imgs.forEach((im) => {
        im.onload = null
        im.onerror = null
      })
    }
  }, [])

  useEffect(() => {
    const updateTarget = () => {
      const { docTop, scrollable } = metricsRef.current
      const t = (window.scrollY - docTop) / scrollable
      targetRef.current = clamp(t, 0, 1)
    }

    const computeMetrics = () => {
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      metricsRef.current.docTop = rect.top + window.scrollY
      metricsRef.current.scrollable = Math.max(rect.height - window.innerHeight, 1)
      updateTarget()
    }

    const applyOverlays = (p) => {
      const reduced = reducedRef.current
      const mx = reduced ? 0 : mouseRef.current.x
      const my = reduced ? 0 : mouseRef.current.y

      const build = (op, liftPx, tiltX, tiltY, scale = false) => {
        const rx = reduced ? 0 : -my * tiltX
        const ry = reduced ? 0 : mx * tiltY
        const ty = reduced ? 0 : (1 - op) * liftPx
        const s = scale ? 0.9 + op * 0.1 : 1
        return `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translate3d(0, ${ty.toFixed(2)}px, 0) scale(${s.toFixed(3)})`
      }

      const o1 = crossfade(p, -1, 0, 0.22, 0.28)
      const o2 = crossfade(p, 0.22, 0.28, 0.62, 0.68)
      const o3 = crossfade(p, 0.62, 0.68, Infinity, Infinity)

      setLayer(phase1Ref.current, o1, build(o1, 28, 6, 9))
      setLayer(phase2Ref.current, o2, build(o2, 24, 4, 6))
      setLayer(phase3Ref.current, o3, build(o3, 40, 12, 16, true))

      const hint = clamp(1 - p / 0.08, 0, 1)
      setLayer(hintRef.current, hint, null)
    }

    const applyFrame = (f) => {
      const idx = Math.round(f)
      if (idx === lastFrameRef.current) return
      lastFrameRef.current = idx
      const a = imgRef.current
      if (a) a.src = frameUrl(clamp(idx, 0, FRAME_COUNT - 1))
    }

    const onMouseMove = (e) => {
      mouseTargetRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }
    const onMouseLeave = () => {
      mouseTargetRef.current = { x: 0, y: 0 }
    }

    computeMetrics()
    window.addEventListener('scroll', updateTarget, { passive: true })
    window.addEventListener('resize', computeMetrics)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)

    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now

      const target = targetRef.current
      const k = 1 - Math.exp(-dt * SMOOTHING)
      currentRef.current += (target - currentRef.current) * k
      const p = currentRef.current

      const mk = 1 - Math.exp(-dt * 5)
      mouseRef.current.x += (mouseTargetRef.current.x - mouseRef.current.x) * mk
      mouseRef.current.y += (mouseTargetRef.current.y - mouseRef.current.y) * mk

      if (ready && !reducedRef.current) {
        applyFrame(p * (FRAME_COUNT - 1))
      }

      applyOverlays(p)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', updateTarget)
      window.removeEventListener('resize', computeMetrics)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [ready, reducedRef])

  return (
    <div className="relative bg-black text-white">
      <div ref={trackRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Frame sequence — single layer, src swapped to nearest frame */}
          <img
            ref={imgRef}
            className="absolute inset-0 h-full w-full object-cover"
            alt=""
            aria-hidden="true"
            draggable="false"
          />

          {/* Legibility layers */}
          <div className="pointer-events-none absolute inset-0 bg-black/15" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_120%_at_50%_50%,transparent_55%,rgba(0,0,0,0.45)_100%)]" />

          {!ready && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/50">
                Loading
              </span>
            </div>
          )}

          <Navigation />

          {/* Phase 1 — editorial paragraph */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 [perspective:1100px]">
            <PhaseIntro ref={phase1Ref} />
          </div>

          {/* Phase 2 — portfolio index */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 [perspective:1100px]">
            <PhaseGrid ref={phase2Ref} />
          </div>

          {/* Phase 3 — headline */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 [perspective:850px]">
            <PhaseHeadline ref={phase3Ref} />
          </div>

          {/* Scroll hint */}
          <div
            ref={hintRef}
            className="pointer-events-none absolute inset-x-0 bottom-12 z-20 flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-[9px] uppercase tracking-[0.4em]">Scroll</span>
            <span className="block h-8 w-px bg-white/40" />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  )
}
