// Compiled using marko@4.18.10 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/tapdoc$1.0.0/components/mhead/index.marko",
    marko_component = require("./component"),
    components_helpers = require("marko/src/runtime/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_dynamicTag = marko_helpers.d,
    marko_classAttr = marko_helpers.ca;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div" +
    marko_classAttr(state.headCls) +
    "><a class=\"mhome\" href=\"/home\"><i class=\"material-icons\"></i></a><header class=\"mdl-layout__header mh\"><div class=\"mdl-layout__header-row\"><span class=\"mdl-layout-title\">" +
    marko_escapeXml(state.title) +
    "</span><div class=\"mdl-layout-spacer\"></div></div></header><div class=\"mdl-layout__drawer\"><span class=\"mdl-layout-title\">Title</span><nav class=\"mdl-navigation\"><a class=\"mdl-navigation__link\" href=\"\">Link</a><a class=\"mdl-navigation__link\" href=\"\">Link</a><a class=\"mdl-navigation__link\" href=\"\">Link</a><a class=\"mdl-navigation__link\" href=\"\">Link</a></nav></div><main class=\"mdl-layout__content\"><div class=\"page-content\">");

  marko_dynamicTag(out, input.main.renderBody, null, null, null, null, __component, "16");

  out.w("</div></main></div>");
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      "./style.less"
    ],
    id: "/tapdoc$1.0.0/components/mhead/index.marko",
    component: "./"
  };
