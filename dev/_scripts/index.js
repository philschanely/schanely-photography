import $ from "jquery";
import enquire from "enquire.js";

import './component';

import Poppin from "./poppin";
import Carousel from "./carousel";

const components = [
  'site/header',
  'site/nav',
  'site/footer'
];

$(function() {
  components.forEach((wc) => {
    loadComponent(`_components/${wc}.wc.html`);
  });

  $("img").each(function(i, o) {
    let $img = $(o);
    $img.removeAttr("srcset");
    $img.removeAttr("width");
    $img.removeAttr("height");
    $img.removeAttr("sizes");
  });

  $(".carousel").each(Carousel.setup);

  $(".portfolio-list").each(function(i, o) {
    let $port = $(o);
    $port.find("img").each(function(i, o) {
      let $img = $(o);
      $img.closest("li").css("background-image", "url(" + $img.attr("src") + ")");
      $img.hide();
    });
  });

  if ($("body").hasClass("page-home")) {
    Poppin.show();
  }
});
