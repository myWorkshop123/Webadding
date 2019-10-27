$(document).keydown(function (event) {
    $("h1").text(event.key);

})

//  another way of adding the javascript event listener is

$(document).on("click", function () {
    // The function body 
})