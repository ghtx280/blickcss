let B_STYLE_TAG = {
  textContent:""
}

if (typeof window !== "undefined") {
  B_STYLE_TAG = document.createElement('style')
  B_STYLE_TAG.id = 'BLICK_OUTPUT'
  document.head.append(B_STYLE_TAG)
}


export default B_STYLE_TAG