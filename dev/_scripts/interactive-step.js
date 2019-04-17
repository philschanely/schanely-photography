import $ from 'jquery';

class InteractiveSteps {

  static init() {
    $(".interactive-steps").addClass("interactive-steps--on");

    $(".interactive-step").each((i, o) => {
      let $step = $(o);

      if (i === 0) {
        $step.addClass("interactive-step--active");
      }

      let $btn = $("<button />")
        .addClass("btn")
        .addClass("btn-ghost")
        .addClass("btn-lg")
        .addClass("interactive-step__btn")
        .html("Next &raquo;");

      $step.append($btn);
    });

    $(".interactive-steps").on("click", ".interactive-step__btn", (e) => {
      let $step = $(e.target).closest(".interactive-step");
      $step.removeClass("interactive-step--active");
      let $next = $step.nextAll().length > 0
        ? $step.next()
        : $step.closest(".interactive-steps").find(".interactive-step:first-child");
      $next.addClass("interactive-step--active");
    });
  }
}

export default InteractiveSteps;
