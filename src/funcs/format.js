export default (str, model) => {
  let format = str
  Array.from(new Set(
    format.match(/[^\w-_]/g)
  ))?.forEach(e => format = format.replaceAll(e, `\\${e}`))
  if (model === 'class') {
    return `.${format}`
  }
  else {
    return `[${model}~="${str}"]`
  }
}