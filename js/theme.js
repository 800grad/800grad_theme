//@prepros-prepend plugins/jquery.min.js
//@prepros-prepend plugins/fontawesome.iloveu.min.js

;(function($) {

    $.fn.unveil = function(threshold, callback) {

        var $w = $(window),
            th = threshold || 0,
            retina = window.devicePixelRatio > 1,
            attrib = retina? "data-src-retina" : "data-src",
            images = this,
            loaded;

        this.one("unveil", function() {
            var source = this.getAttribute(attrib);
            source = source || this.getAttribute("data-src");
            if (source) {
                $(this).is('img') ? $(this).attr("src", source) : $(this).css('background-image', 'url("' + source + '")');
                $(this).addClass('unvieled');
                if (typeof callback === "function") callback.call(this);
            }
        });

        var debouncedUnveil = debounce(unveil, 100);

        function unveil() {
            var inview = images.filter(function() {
                var $el = $(this);
                if ($el.is(":hidden")) return;

                var wt = $w.scrollTop(),
                    wb = wt + $w.height(),
                    et = $el.offset().top,
                    eb = et + $el.height();

                return eb >= wt - th && et <= wb + th;
            });

            loaded = inview.trigger("unveil");
            images = images.not(loaded);
        }

        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this,
                    args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }

        $w.on("scroll.unveil resize.unveil lookup.unveil touchmove.unveil", debouncedUnveil);

        unveil();

        return this;

    };

})(window.jQuery || window.Zepto);

$(document).ready(function() {
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
            );
        }
    };

    $(function($) {
        if (isMobile.any()) {
            console.log("is Mobile");
            $(document.body).addClass("isMobile");
        }
        if (!isMobile.any()) {
            console.log("is desktop");
            $(document.body).addClass("isDesktop");
            var sources = document.querySelectorAll(".herovideo source");
            var video = document.querySelector(".herovideo");
            for (var i = 0; i < sources.length; i++) {
                sources[i].setAttribute("src", sources[i].getAttribute("data-src"));
            }
            video.classList.add('unvieled');
            video.load();
        }
    });

    $("img").unveil();
    $("source").unveil();
    $(".banner").unveil();
});