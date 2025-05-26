$("h1").css("font-size", "72px");
$("h1").css("color", "purple");

$("h1").click(function() {
    $(this).css("color", "green");
});

var t = "";
// $("input").keydown(function(event) {
//     if(event.key == 'Enter'){
//         alert(t);
//         t = "";
//         $(this).val('');
//     }
//     t = t + event.key;
// });

// $(document ).keydown(function (event)  {
//     $("h1").text(event.key);
// });

// $("h1").before("<button>New</button>");

$("input").keydown(function(event){

    if(event.key == 'Enter') {
        $("h1").after("<button class='b1'></button>");
        $(".b1").text(t);
        t = "";
        $("input").val("");
    }

    if(event.key != 'Enter')
        t += event.key;
}); 