const getRad = (x, y) => {
  return Math.max(
    Math.hypot(x - window.innerWidth, y - window.innerHeight),
    Math.hypot(x, y - window.innerHeight),
    Math.hypot(x - window.innerWidth, y),
    Math.hypot(x, y)
  )
}

const set = e => {
  pos.x = e.clientX
  pos.y = e.clientY
  pos.r = getRad(pos.x, pos.y)
}

let pos = {
  x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
  y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  r: typeof window !== 'undefined' ? getRad(0, 0) : 2250
}

const calc = r => `circle(${r}px at ${pos.x}px ${pos.y}px)`

export {set, calc, pos}
