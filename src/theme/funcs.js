export function add(obj = {}) {
  if (typeof obj === `object`) {
    if (obj.class) this.class = { ...obj.class, ...this.class }
    if (obj.flex) this.flex = { ...obj.flex, ...this.flex }
    if (obj.text) this.text = { ...obj.text, ...this.text }
    if (obj.grid) this.grid = { ...obj.grid, ...this.grid }
  } else console.error(`BlickCSS. The blick.add function must contain an object.`)
}

export function config(obj = {}) {
  if (typeof obj === `object`) {
    for (const key in obj) {
      this[key] = obj[key]
    }
  } else console.error(`BlickCSS. The blick.config function must contain an object.`)
}