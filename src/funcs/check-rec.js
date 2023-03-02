export default (r, B_STYLE_TAG) => {
  const B_CHECK_ELEM = t => !!t?.getAttribute 
  && !(
    t === B_STYLE_TAG 
    || t === document.head 
    || "script" === t.localName
  );

  if (r?.length === 1) {
    if (!B_CHECK_ELEM(r[0].target)) {
      if (r[0].addedNodes.length <= 1) {
        if (!B_CHECK_ELEM(r[0].addedNodes[0]) || r[0].addedNodes[0]) {
          return false
        } else return true
      } else return true
    } else return true
  } else return true
}