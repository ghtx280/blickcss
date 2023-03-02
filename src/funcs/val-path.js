export default (obj, path) => {
  let parts = path.split("-");
  let value = obj;
  let prevVal
  let valPath

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    value = value[part]
    
    if (value === undefined) {
      valPath = parts.slice(i).join("-");
      return { p: prevVal, v: valPath };
    }
    prevVal = value
  }

  return { p: prevVal, v: valPath };
}