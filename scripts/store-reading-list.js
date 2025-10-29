const READ_KEY = "reading mode";
const ENABLE_KEY = "reading mode is active";



//if reading list is enabled in local storage
// create a checkbox
// check to see if the url is present
// set checked state based on that
// set event listener on that button: 
// store url with the key 'read' 

document.addEventListener('DOMContentLoaded', () => {
    const enabled = localStorage.getItem(ENABLE_KEY);
    if (enabled){
    //set display of checkbox to visible
    const label = document.getElementById("reading-list-label-content");
    document.getElementsByClassName("reading-list-checkbox")[0].style.display = "block";

    const checkbox = document.getElementById("reading-list");
    const storyId = document.querySelector('[data-story-id]').dataset.storyId;
    let readStories = JSON.parse(localStorage.getItem(READ_KEY)) || [];




    function setDisplayState(state) {
        if (state) {
            checkbox.checked = true;
            label.innerText = "Marked as Read!";
        }
        else {
            checkbox.checked = false;
            label.innerText = "Mark as Read";

        }
    }
    function storeUpdate(state) {
        if (state) {
            readStories.push(storyId);
        } else {
            readStories.splice(readStories.indexOf(storyId), 1);
        }
        localStorage.setItem(READ_KEY, JSON.stringify(readStories));
    }

    setDisplayState(readStories.includes(storyId));

    function activated(state) {
        setDisplayState(state);
        storeUpdate(state);
    }


    checkbox.addEventListener('change', (event) => {
        activated(event.target.checked);
    });}

    //this is a test of using character key shortcuts to trigger pini
    //but heavily interferes with native sr mappings
    //perhaps revisit at a later time. 
    /*addWordKBShortcut("pini");
    


    function addWordKBShortcut(word) {
        typed = '';
        const targetWord = word;

        document.addEventListener('keydown', (e) => {
            // Only track letters when Shift is held down
            if (!e.shiftKey) {
                typed = ''; // reset if shift not held
                return;
            }

            // Check if it's a letter key
            if (/^[a-z]$/i.test(e.key)) {
                typed += e.key.toLowerCase();

                // Trim buffer length
                if (typed.length > targetWord.length) {
                    typed = typed.slice(-targetWord.length);
                }

                // Check for match
                if (typed === targetWord) {
                    typed = ''; // reset buffer
                    // 🔥 do your secret thing here:
                    activated(!checkbox.checked);
                }
            }
        });
    }*/
});
