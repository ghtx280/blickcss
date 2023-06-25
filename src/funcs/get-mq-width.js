export default (scr, raw) => {
  const f = (str, st) => isNaN((str+"")[0]) ? str : `${st}-width:${str}`;
  const u = num => isNaN(+num) ? num : `${num}px`

  if (typeof scr === "object") {
    const [min, max] = scr
    if (raw) {
      return u(max || min)
    }
    return `(${f(u(min),"min")})${max ? ` and (${f(u(max),"max")})` : ""}`
  }
  else {
    if (raw) {
      return  u((scr+"").replaceAll(/[()]/g, "").split(":").at(-1))
    }
    return scr[0] === "(" ? scr : `(${f(u(scr),"min")})`
  }
}