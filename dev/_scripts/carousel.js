import $ from 'jquery';
import enquire from "enquire.js";

class Carousel {
  constructor() {
    this.interval = null;
  }

  static setup(i, o) {
    let $ctr = $(o);
    let $markers = $("<ul />").addClass("markers");
    let $prevBtn = $("<button />").addClass("prev").html("&lsaquo;").on("click", function() {
      Carousel.getPrev($ctr, true);
    });
    let $nextBtn = $("<button />").addClass("next").html("&rsaquo;").on("click", function() {
      Carousel.getNext($ctr, true);
    });

    Carousel.setCtrHeight($ctr);

    enquire.register("screen and (min-width: 1600px)", {
      match: function() {
        Carousel.setCtrHeight($ctr);
      },
      unmatch: function() {
        Carousel.setCtrHeight($ctr);
      }
    }).register("screen and (min-width: 1200px)", {
      match: function() {
        Carousel.setCtrHeight($ctr);
      },
      unmatch: function() {
        Carousel.setCtrHeight($ctr);
      }
    }).register("screen and (min-width: 768px)", {
      match: function() {
        Carousel.setCtrHeight($ctr);
      },
      unmatch: function() {
        Carousel.setCtrHeight($ctr);
      }
    }).register("screen and (max-width: 768px)", {
      match: function() {
        Carousel.setCtrHeight($ctr);
      },
      unmatch: function() {
        Carousel.setCtrHeight($ctr);
      }
    });

    $ctr.find("li").each(function(i, o) {
      let $this = $(this);
      $this.attr("id", "image-" + i);
      let $img = $this.find("img");
      $this.css({
        "background-image": "url(" + $img.attr("src") + ")",
      });
      $img.hide();
      let $marker = $("<li />").html("&bull;").attr("data-marker", "image-" + i);
      $markers.append($marker);
    });
    $ctr.append($markers).append($prevBtn).append($nextBtn);
    $ctr.find(".markers").on("click", function(e) {
      clearInterval(Carousel.interval);
      $marker = $(e.target);
      let markerId = $marker.attr("data-marker");
      $ctr.find(".active").removeClass("active");
      $marker.addClass("active");
      $("#" + markerId).addClass("active");
      Carousel.start($ctr);
    });
    $ctr.find("br").each(function() {
      $(this).remove();
    });
    $ctr.find("li:first-of-type").addClass("active");
    Carousel.start($ctr);
  }

  static start($ctr) {
    Carousel.interval = setInterval(function() {
      Carousel.getNext($ctr);
    }, 5000);
  }

  static getNext($ctr, _restartTimer) {
    let $active = $ctr.find(".active");
    $active.removeClass("active");
    let $next = $active.nextAll("li").length > 0 ?
      $active.next("li") :
      $ctr.find("li:first-child");
    $next.addClass("active");
    if (_restartTimer !== undefined && _restartTimer === true) {
      clearInterval(Carousel.interval);
      Carousel.start($ctr);
    }
  }

  static getPrev($ctr, _restartTimer) {
    let $active = $ctr.find(".active");
    $active.removeClass("active");
    let $prev = $active.prevAll("li").length > 0 ?
      $active.prev("li") :
      $ctr.find("li:last-child");
    $prev.addClass("active");
    if (_restartTimer !== undefined && _restartTimer === true) {
      clearInterval(Carousel.interval);
      Carousel.start($ctr);
    }
  }

  static setCtrHeight($ctr) {
    let ctrHeight = $ctr.outerWidth()/1.618-40;
    $ctr.css("height", ctrHeight);
  }
}

export default Carousel;
