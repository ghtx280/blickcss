export default function(str, model = "class") {
  let format = str;
  
  format = format
  .replace(/[^\w-_]/g, '\\$&')
  .replace(/^\d/, '\\3$& ')

  if (model === "raw") return format

  return model === 'class' ? `.${format}` : `[${model}~="${str}"]`;
};
