let isMobile = {
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

jQuery(function($) {
  if (isMobile.any()) {
    console.log("is Mobile");
    $(document.body).addClass("isMobile");
  }
  if (!isMobile.any()) {
    console.log("is desktop");
    $(document.body).addClass("isDesktop");
    let sources = document.querySelectorAll(".herovideo video source");
    let video = document.querySelector(".herovideo video");
    for (let i = 0; i < sources.length; i++) {
      sources[i].setAttribute("src", sources[i].getAttribute("data-src"));
    }
    video.load();
  }
});
