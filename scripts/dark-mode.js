const THEME_KEY = "current theme set to";
const LIGHT_KEY = "light mode";
const DARK_KEY = "dark mode";

    

document.addEventListener("DOMContentLoaded", () => {
    const html = document.querySelector("html");
    const enabled = localStorage.getItem(THEME_KEY);
    let current = "system";

    if(enabled){
        console.log("value was found");
        if (enabled === DARK_KEY){
            current = "dark";
            setTheme(DARK_KEY);

        }
        if (enabled === LIGHT_KEY){
            current = "light";
            setTheme(LIGHT_KEY);

        }
    }

        //setTheme()

    //check to see if we're a reading page
    if (document.getElementById("rc-5a")){
        //Then we're on a reading page and need to set event listeners
        //set event listeners to radio buttons 
        const checkboxes = {
            'light' : document.getElementById("rc-5a"),
            'dark' : document.getElementById("rc-5b"),
            'system' : document.getElementById("rc-5c"),
        }
        for(let key of Object.keys(checkboxes)){
            if (key === current){
                checkboxes[key].checked = true;
            }
            checkboxes[key].addEventListener("change", (event) =>{
                storeTheme(key)
            });
        }

    }
    function storeTheme(key){
        if (key === "light"){
            localStorage.setItem(THEME_KEY, LIGHT_KEY);
            setTheme(LIGHT_KEY);
            console.log("Light radio button activated");
        }
        if (key === "dark"){
            localStorage.setItem(THEME_KEY, DARK_KEY);
            setTheme(DARK_KEY);
            console.log("dark radio button activated");
        }
        if (key === "system"){
            localStorage.removeItem(THEME_KEY);
            removeTheme();
            console.log("system radio button activated");
        }
        //store the new theme to the json
        //setTheme()
    }

    function removeTheme(){
        //potential needed for error catching if(html.)
        html.removeAttribute('data-custom-theme');
    }

    function setTheme(key){
        html.setAttribute('data-custom-theme', key);
        //potentially needed for error catching html.setAttribute('data-custom-theme-status', 'active');

        //<html data-selected-theme="pink"></html>
        //needs to also reset to system default. is that possible? it should be possible...

    }
});