document.getElementById("mainMenuButton").addEventListener("click", function() {
    let button = document.getElementById("langSelectorCheckbox");
    button.checked = false;
    button = document.getElementById("mainMenuCheckbox");
    button.checked = !button.checked;
});


document.getElementById("langSelectorButton").addEventListener("click", function() {
    let button = document.getElementById("mainMenuCheckbox");
    button.checked = false;
    button = document.getElementById("langSelectorCheckbox");
    button.checked = !button.checked;
});


document.addEventListener("click", function(event) {
    const mainMenuButton = document.getElementById("mainMenuButton");
    const mainMenuContent = document.getElementsByClassName("mainMenuContent")[0];
    const mainMenuCheckbox = document.getElementById("mainMenuCheckbox");
    if (mainMenuCheckbox.checked) {
        if (event.target != mainMenuContent && !mainMenuContent.contains(event.target) &&
            event.target != mainMenuButton && !mainMenuButton.contains(event.target)){
            mainMenuCheckbox.checked = false;
        }
    }

    const langSelectorButton = document.getElementById("langSelectorButton");
    const langSelectorContent = document.getElementsByClassName("langSelectorContent")[0];
    const langSelectorCheckbox = document.getElementById("langSelectorCheckbox");
    if (langSelectorCheckbox.checked) {
        if (event.target != langSelectorContent && !langSelectorContent.contains(event.target) &&
            event.target != langSelectorButton && !langSelectorButton.contains(event.target)){
            langSelectorCheckbox.checked = false;
        }
    }
});



window.onscroll = function(){
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("scroll-to-top").classList.add("show");
    } else {
        document.getElementById("scroll-to-top").classList.remove("show");
    }
};



