export default (str, model) => {
  let formated = str
  Array.from(new Set(
    formated.match(/[^\w-_]/g)
  ))?.forEach(e => formated = formated.replaceAll(e, `\\${e}`))
  if (model === 'class') {
    return `.${formated}`
  }
  else {
    return `[${model}~="${str}"]`
  }
}