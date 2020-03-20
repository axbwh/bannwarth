const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

const normalize = (val, min, max) => (clamp(val, min, max) - min) / (max - min)

export {clamp, normalize}