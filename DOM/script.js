let modeBtn = $('.mode');
let curr = "light";

modeBtn.on("click", () => {
    if(curr === "light"){
        curr = "dark";
        $('body').toggleClass('dark-mode')
    }

    else{
        curr = "light";
        $('body').toggleClass('dark-mode')

    }

    console.log("Current mode: ", curr)
});