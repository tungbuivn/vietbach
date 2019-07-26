// Compiled using marko@4.18.10 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/tapdoc$1.0.0/components/mhead/index.marko",
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_dynamicTag = marko_helpers.d;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"mdl-layout mdl-js-layout mdl-layout--fixed-header\"><a class=\"mdl-layout__drawer-button\" href=\"/home\"><i class=\"material-icons\"></i></a><header class=\"mdl-layout__header mh\"><div class=\"mdl-layout__header-row\"><span class=\"mdl-layout-title\">Tập đọc cho bé</span><div class=\"mdl-layout-spacer\"></div></div></header><main class=\"mdl-layout__content\"><div class=\"page-content\">");

  marko_dynamicTag(out, input.main.renderBody, null, null, null, null, __component, "9");

  out.w("</div></main></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    deps: [
      "./style.less"
    ],
    id: "/tapdoc$1.0.0/components/mhead/index.marko"
  };
