import $ from 'jquery';
import enquire from "enquire.js";

class Carousel {
  // Carousels need cookies.
  constructor() {
    this.interval = null;
  }

  static setup(i, o) {

    // Get container
    let $ctr = $(o);

    // Remove any nasty brs from WP
    $ctr.find("br").each(function() {
      $(this).remove();
    });

    // Initiation markers
    let $markers = $("<ul />")
      .addClass("carousel__markers")
      .addClass("list--unstyled")
      .addClass("list--inline")
      .addClass("list--centered");

    // Add prev button
    let $prevBtn = $("<button />")
      .addClass("carousel__prev")
      .html("&lsaquo;")
      .on("click", function() {
        Carousel.getPrev($ctr, true);
      });

    // Add next button
    let $nextBtn = $("<button />")
      .addClass("carousel__next")
      .html("&rsaquo;")
      .on("click", function() {
        Carousel.getNext($ctr, true);
      });

    // Build markers and association with images
    $ctr.find("li").each(function(i, o) {
      let $this = $(this);
      let $img = $this.find("img");
      $this.attr("id", "image-" + i);
      let $marker = $("<li />")
        .html("&bull;")
        .attr("data-marker", "image-" + i)
        .addClass("carousel__marker");
      $markers.append($marker);
    });

    // Add markers to container
    $ctr.append($markers).append($prevBtn).append($nextBtn);

    // Attach click listeners to markers
    $ctr.find(".carousel__markers").on("click", function(e) {
      // Stop carousel
      clearInterval(Carousel.interval);

      // Toggle the new active item based on clicked marker
      Carousel.setActive($ctr, $(e.target));

      // Start carousel again
      Carousel.start($ctr);
    });

    // Set first item as active
    $ctr.find(".carousel__item:first-of-type").addClass("carousel__item--active");
    $ctr.find(".carousel__marker:first-of-type").addClass("carousel__marker--active");

    // Start carousel
    Carousel.start($ctr);
  }

  static setActive($ctr, $marker) {
    // Clear active items
    $ctr.find(".carousel__item--active").removeClass("carousel__item--active");
    $ctr.find(".carousel__marker--active").removeClass("carousel__marker--active");

    // Sync marker and corresponding item
    let markerId = $marker.attr("data-marker");
    $marker.addClass("carousel__marker--active");
    $("#" + markerId).addClass("carousel__item--active");
  }

  static start($ctr) {
    Carousel.interval = setInterval(function() {
      Carousel.getNext($ctr);
    }, 5000);
  }

  static getNext($ctr, _restartTimer) {
    // Get currently active marker
    let $active = $ctr.find(".carousel__marker--active");

    // Get next item or circle back to first marker
    let $next = $active.nextAll(".carousel__marker").length > 0
      ? $active.next(".carousel__marker")
      : $ctr.find(".carousel__marker:first-child");

    // Set next as active
    Carousel.setActive($ctr, $next);

    // Decice whether to reset time or continue carousel on existing timer
    if (_restartTimer !== undefined && _restartTimer === true) {
      clearInterval(Carousel.interval);
      Carousel.start($ctr);
    }
  }

  static getPrev($ctr, _restartTimer) {
    let $active = $ctr.find(".carousel__marker--active");

    // Get prev item or circle back to last marker
    let $prev = $active.prevAll(".carousel__marker").length > 0
      ? $active.prev(".carousel__marker")
      : $ctr.find(".carousel__marker:last-child");

    // Set prev as active
    Carousel.setActive($ctr, $prev);

    // Decice whether to reset time or continue carousel on existing timer
    if (_restartTimer !== undefined && _restartTimer === true) {
      clearInterval(Carousel.interval);
      Carousel.start($ctr);
    }
  }
}

export default Carousel;
