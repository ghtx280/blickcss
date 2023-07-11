import blick from "../blick-obj.js";
import B_CREATE_CSS from "./create-css.js";
import B_UPD_STYLE from "./upd-style.js";
import B_CHECK_REC from "./check-rec.js";
import B_STYLE_TAG from "../style-tag.js";

function timer(label) {
  const startTime = performance.now();
  return {
    stop: function () {
      const endTime = performance.now();
      const elapsedTime = endTime - startTime;
      console.log(`${label}: ${elapsedTime.toFixed(1)}ms`);
    },
  };
}

export default function (record, params) {
  let consoleTimer;
  if (blick.time) consoleTimer = timer("blick. styles upd");

  const _STORE_ = blick._STORE_;

  let { B_MQ_STORE, B_STYLE_STORE, B_ATTRS_STORE, B_MQ_STR_COPY, B_MQ_STRING } =
    _STORE_;

  let B_STYLE_STRING = "";
  let B_MQ_STR = B_MQ_STRING;

  if (params.cli) {
    for (const attr in record) {
      for (const val of record[attr]) {
        B_CREATE_CSS(val, attr, _STORE_);
      }
    }
    return get_nodes(true);
  }

  if (!document.body) return;

  if (!B_STYLE_TAG.textContent ? 0 : !B_CHECK_REC(record)) return;

  let nodes = document.querySelectorAll(
    `[class],[${blick.attr.flex}],[${blick.attr.text}],[${blick.attr.grid}]`
  );

  if (!nodes.length) return;

  for (const elem of nodes) {
    for (const model in B_ATTRS_STORE) {
      let attr = blick.attr[model] || "class";
      if (elem.hasAttribute(attr)) {
        const attr_val = elem.getAttribute(attr).trim().split(/\s+/g);
        for (const str of attr_val) {
          if (!B_ATTRS_STORE[model].includes(str)) {
            B_CREATE_CSS(str, model, _STORE_, attr_val);
            B_ATTRS_STORE[model].push(str);
          }
        }
      }
    }
  }

  function get_nodes(IS_CLI) {
    B_MQ_STR = { ...B_MQ_STR_COPY };

    for (const key in B_MQ_STORE) {
      for (const [a, b] of Object.entries(B_MQ_STORE[key])) {
        B_MQ_STR[key] += `${a}{${b}}`;
      }
    }

    B_STYLE_STRING = "";

    for (const [a, b] of Object.entries(B_STYLE_STORE)) {
      B_STYLE_STRING += `${a}{${b}}`;
    }

    let rendered_styles = B_UPD_STYLE(B_STYLE_STRING, B_MQ_STR);

    if (blick.time && rendered_styles) consoleTimer.stop();

    if (IS_CLI) return rendered_styles;
  }
  get_nodes(false);
}
