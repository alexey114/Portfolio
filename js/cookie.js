    const closeCookie = $(".modal__close_cookie");
    const cookie = $(".cookie");

    closeCookie.on("click", function(event) {
         event.preventDefault();

         cookie.addClass("closed");
    });