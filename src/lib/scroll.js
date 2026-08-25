export function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v
}

export function crossfade(p, inStart, inEnd, outStart, outEnd) {
  if (p <= inStart) return 0
  if (p < inEnd) return (p - inStart) / (inEnd - inStart)
  if (p < outStart) return 1
  if (p < outEnd) return 1 - (p - outStart) / (outEnd - outStart)
  return 0
}

export function setLayer(el, opacity, transform) {
  if (!el) return
  el.style.opacity = String(opacity)
  if (transform != null) el.style.transform = transform
}
