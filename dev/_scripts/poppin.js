import $ from "jquery";

class Poppin {
  static show() {
    let $newsletterPoppin = $("<div id='newsletter-poppin' />")
      .addClass("poppin");
    let $newsletterLink = $("<a />")
      .attr("href", "http://schanelyphotography.com/newsletter-signup/")
      .html("To receive $30 off your first photo session and also periodic updates, announcements, and promotions sign up for my newsletter! &raquo;");
    let $newsletterClose = $("<button />").addClass("close").html("&times;").on("click", function(e) {
      e.preventDefault();
      $(e.target).closest(".poppin").removeClass("on");
      $("body").removeClass("poppin-on");
    });

    $newsletterPoppin.append($newsletterLink).append($newsletterClose);

    $("body").prepend($newsletterPoppin);

    setTimeout(function() {
      $("body").addClass("poppin-on");
      $newsletterPoppin.addClass("on");
    }, 500);
  }
}

export default Poppin;
