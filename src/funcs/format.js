export default function(str, model = "class") {
  let format = str;
  
  format = format
  .split("\\")
  .map(sp => {
    const uniq = Array.from(new Set(sp.match(/[^\w-_]/g)));

    if (!uniq) {
      return false
    }
    for (const char of uniq) {
      sp = sp.replaceAll(char, `\\${char}`);
    }
    return sp
  })
  .join("\\\\")

  if (model === "raw") {
    return format
  }

  if (model === 'class') {
    return `.${format}`;
  } else {
    return `[${model}~="${str}"]`;
  }
};
