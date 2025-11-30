const THEME_KEY = "current theme set to";
const LIGHT_HIGH_KEY = "light mode with higher contrast";
const DARK_HIGH_KEY = "dark mode with higher contrast";
const LIGHT_LOW_KEY = "light mode with lower contrast";
const DARK_LOW_KEY = "dark mode with lower contrast";




const popovertrigger = document.getElementById("home-settings-toggle");
const popover = document.getElementById("targettheme");
const dismiss = document.getElementById("dismiss-light-dark");
dismiss.addEventListener("click", (event) => {
    popover.togglePopover();

});





const html = document.querySelector("html");
const enabled = localStorage.getItem(THEME_KEY);
let current = "system";

if (enabled) {
    console.log("Display theme preferences were retrieved successfully: " + enabled);
    if (enabled === DARK_HIGH_KEY) {
        current = "dark high";
        setTheme(DARK_HIGH_KEY);

    }
    if (enabled === LIGHT_HIGH_KEY) {
        current = "light high";
        setTheme(LIGHT_HIGH_KEY);

    }
    if (enabled === DARK_LOW_KEY) {
        current = "dark low";
        setTheme(DARK_LOW_KEY);

    }
    if (enabled === LIGHT_LOW_KEY) {
        current = "light low";
        setTheme(LIGHT_LOW_KEY);

    }
}

//check to see if we're a reading page
//Then we're on a reading page and need to set event listeners
//set event listeners to radio buttons 
const checkboxes = {
    'light high': document.getElementById("6a"),
    'dark high': document.getElementById("6b"),
    'system': document.getElementById("6e"),
    'light low': document.getElementById("6c"),
    'dark low': document.getElementById("6d"),
}
for (let key of Object.keys(checkboxes)) {
    if (key === current) {
        checkboxes[key].checked = true;
    }
    checkboxes[key].addEventListener("change", (event) => {
        storeTheme(key)
    });
}

function storeTheme(key) {
    if (key === "light high") {
        localStorage.setItem(THEME_KEY, LIGHT_HIGH_KEY);
        setTheme(LIGHT_HIGH_KEY);
        console.log("Light radio button activated");
    }
    if (key === "dark high") {
        localStorage.setItem(THEME_KEY, DARK_HIGH_KEY);
        setTheme(DARK_HIGH_KEY);
        console.log("dark radio button activated");
    }
    if (key === "light low") {
        localStorage.setItem(THEME_KEY, LIGHT_LOW_KEY);
        setTheme(LIGHT_LOW_KEY);
        console.log("Light radio button activated");
    }
    if (key === "dark low") {
        localStorage.setItem(THEME_KEY, DARK_LOW_KEY);
        setTheme(DARK_LOW_KEY);
        console.log("dark radio button activated");
    }
    if (key === "system") {
        localStorage.removeItem(THEME_KEY);
        removeTheme();
        console.log("system radio button activated");
    }
    //store the new theme to the json
    //setTheme()
}

function removeTheme() {
    //potential needed for error catching if(html.)
    html.removeAttribute('data-custom-theme');
}

function setTheme(key) {
    html.setAttribute('data-custom-theme', key);
    //potentially needed for error catching html.setAttribute('data-custom-theme-status', 'active');

    //<html data-selected-theme="pink"></html>
    //needs to also reset to system default. is that possible? it should be possible...
}
