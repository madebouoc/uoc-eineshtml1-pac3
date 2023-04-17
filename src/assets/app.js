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

function titleSticky(){
    const banner = document.querySelector('.banner');
    const horizMenu = document.querySelector('.horizMenu');
    while (banner.firstChild) {
        horizMenu.appendChild(banner.firstChild);
    }
}

function titleTop(){
    const banner = document.querySelector('.banner');
    const horizMenu = document.querySelector('.horizMenu');
    while (horizMenu.firstChild) {
        banner.appendChild(horizMenu.firstChild);
    }
}