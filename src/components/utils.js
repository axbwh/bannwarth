const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

const normalize = (val, min, max) => (clamp(val, min, max) - min) / (max - min)

const romanize = (num) => {
     const roman = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    }
    let str = ''
    for (var i of Object.keys(roman)) {
      let q = Math.floor(num / roman[i]);
      num -= q * roman[i];
      str += i.repeat(q);
    }
    return str;
  }

  const design = {
    white: { fg: '#111' , bg: '#fff' } ,
    black: { fg: '#fff' , bg: '#111' },
    navSize: 79,
    gutter: '20vw'
  }

export {clamp, normalize, romanize, design}