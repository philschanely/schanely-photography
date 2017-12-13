var carouselInterval = null;

$(function(){
    strip_ugly_responsive_img();

    $(".carousel").each(setupCarousel);
    $(".portfolio-list").each(setupPortfolio);

    if ($("body").hasClass("page-home")) {
        showPoppin();
    }
});

function strip_ugly_responsive_img() {
    $("img").each(function(i,o) {
        $img = $(o);
        $img.removeAttr("srcset");
        $img.removeAttr("width");
        $img.removeAttr("height");
        $img.removeAttr("sizes");
    });
}

function setupCarousel(i,o) {
    var $ctr = $(o);
    var $markers = $("<ul />").addClass("markers");
    var $prevBtn = $("<button />").addClass("prev").html("&lsaquo;").on("click", function(){
        getPrev($ctr, true);
    });
    var $nextBtn = $("<button />").addClass("next").html("&rsaquo;").on("click", function(){
        getNext($ctr, true);
    });

    setCtrHeight($ctr);

    enquire.register("screen and (min-width: 1600px)", {
        match : function() {
            setCtrHeight($ctr);
        },
        unmatch : function() {
            setCtrHeight($ctr);
        }
    }).register("screen and (min-width: 1200px)", {
        match : function() {
            setCtrHeight($ctr);
        },
        unmatch : function() {
            setCtrHeight($ctr);
        }
    }).register("screen and (min-width: 768px)", {
        match : function() {
            setCtrHeight($ctr);
        },
        unmatch : function() {
            setCtrHeight($ctr);
        }
    }).register("screen and (max-width: 768px)", {
        match : function() {
            setCtrHeight($ctr);
        },
        unmatch : function() {
            setCtrHeight($ctr);
        }
    });

    $ctr.find("li").each(function(i,o) {
        var $this = $(this);
        $this.attr("id", "image-" + i);
        var $img = $this.find("img");
        $this.css({
            "background-image": "url(" +$img.attr("src") + ")",
        });
        $img.hide();
        var $marker = $("<li />").html("&bull;").attr("data-marker", "image-" + i);
        $markers.append($marker);
    });
    $ctr.append($markers).append($prevBtn).append($nextBtn);
    $ctr.find(".markers").on("click", function(e){
        clearInterval(carouselInterval);
        $marker = $(e.target);
        var markerId = $marker.attr("data-marker");
        $ctr.find(".active").removeClass("active");
        $marker.addClass("active");
        $("#" + markerId).addClass("active");
        startCarousel($ctr);
    });
    $ctr.find("br").each(function(){
        $(this).remove();
    });
    $ctr.find("li:first-of-type").addClass("active");
    startCarousel($ctr);
}

function setupPortfolio(i, o) {
    var $port = $(o);
    $port.find("img").each(function(i,o){
        var $img = $(o);
        $img.closest("li").css("background-image", "url(" + $img.attr("src") + ")");
        $img.hide();
    })
}

function getNext($ctr, _restartTimer) {
    var $active = $ctr.find(".active");
    $active.removeClass("active");
    var $next = $active.nextAll("li").length > 0
        ? $active.next("li")
        : $ctr.find("li:first-child");
    $next.addClass("active");
    if (_restartTimer !== undefined && _restartTimer === true) {
        clearInterval(carouselInterval);
        startCarousel($ctr);
    }
}

function getPrev($ctr, _restartTimer) {
    var $active = $ctr.find(".active");
    $active.removeClass("active");
    var $prev = $active.prevAll("li").length > 0
        ? $active.prev("li")
        : $ctr.find("li:last-child");
    $prev.addClass("active");
    if (_restartTimer !== undefined && _restartTimer === true) {
        clearInterval(carouselInterval);
        startCarousel($ctr);
    }
}

function showPoppin() {
    var $newsletterPoppin = $("<div id='newsletter-poppin' />")
        .addClass("poppin");
    var $newsletterLink = $("<a />")
        .attr("href", "http://schanelyphotography.com/newsletter-signup/")
        .html("To receive $20 off your first photo session and also periodic updates, announcements, and promotions sign up for my newsletter! &raquo;");
    var $newsletterClose = $("<button />").addClass("close").html("&times;").on("click", function(e) {
        e.preventDefault();
        $(e.target).closest(".poppin").removeClass("on");
        $("body").removeClass("poppin-on");
    });

    $newsletterPoppin.append($newsletterLink).append($newsletterClose);

    $("body").prepend($newsletterPoppin);

    setTimeout(function(){
        $("body").addClass("poppin-on");
        $newsletterPoppin.addClass("on");
    },500);
}

function startCarousel($ctr) {
    carouselInterval = setInterval(function(){
        getNext($ctr);
    }, 5000);
}

function setCtrHeight($ctr) {
    var ctrHeight = $ctr.outerWidth()/1.618-40;
    $ctr.css("height", ctrHeight);
    console.log(ctrHeight);
}