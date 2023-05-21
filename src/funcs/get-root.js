export default function(blick) {
  let fonts = ''
  let colors = ''

  for (const [type, val] of Object.entries(blick.font)) {
    fonts += `--font-${type}:${val};`
  }
  for (const [color, obj] of Object.entries(blick.colors)) {
    for (const [num, code] of Object.entries(obj)) {
      colors += `--${color+(num==='def'?'':'-'+num)}:${code};`
    }
  }
  return `:root{${ colors + fonts }}`
}