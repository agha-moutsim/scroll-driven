import { useEffect, useRef } from 'react'

export function usePrefersReducedMotion() {
  const ref = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      ref.current = mq.matches
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return ref
}
