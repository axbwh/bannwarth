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
  x: 0,
  y: 0,
  r: getRad(0, 0)
}

export {set, pos}
