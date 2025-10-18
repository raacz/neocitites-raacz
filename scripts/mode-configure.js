const inputs = {
    text : {
        'en': document.getElementById('rc-1a'),
        'sp': document.getElementById('rc-1b'),
        'tok': document.getElementById('rc-1c'),
    },
    mode: {
        'regular': document.getElementById('rc-2a'),
        'quiz': document.getElementById('rc-2b'),
        'line-by-line': document.getElementById('rc-2c'),
        'table': document.getElementById('rc-2d'),
    },
    image_settings : {
        'img': document.getElementById('rc-3a'),
        'description': document.getElementById('rc-3b'),
        'attribution': document.getElementById('rc-3c'),
    },
    line_mode: {
        'tok_en': document.getElementById('rc-bl-1a'),
        'sp_tok': document.getElementById('rc-bl-1b'),
        'sp_en': document.getElementById('rc-bl-1c'),
    }
};

function synchText () {
    for (let [text, state] of Object.entries(sona.sona.text)) {
        for (let key of Object.keys(inputs.text)) {
            if(text == key){
                inputs.text[key].checked = state;
            }
        }
    }
}
function synchImageSettings () {
    for (let [setting, state] of Object.entries(sona.sona.image_settings)) {
        for (let key of Object.keys(inputs.image_settings)) {
            if(setting == key){
                inputs.image_settings[key].checked = state;
            }
        }
    }
}
function synchMode () {
    for (let key of Object.keys(inputs.mode)) {
        if(sona.sona.mode == key){
            inputs.mode[key].checked = true;
        }
        else{
            inputs.mode[key].checked = false;
        }
    }
}
function synchLineMode () {
    for (let key of Object.keys(inputs.line_mode)) {
        if(sona.sona.line_mode == key){
            inputs.line_mode[key].checked = true;
        }
        else{
            inputs.line_mode[key].checked = false;
        }
    }
}




function lineCalibration(){
    synchText();
    synchLineMode();  
}

function synchfromStorage(){
    synchMode();
    synchImageSettings();
    lineCalibration()
}

function sendTextUpdates(){
    for (let key of Object.keys(inputs.text)) {
        inputs.text[key].addEventListener("change", (event) =>{
            sona.updateText(key, event.target.checked);
            console.log(key, event.target.checked);

        });
    }
}

function sendImageUpdates(){
    for (let key of Object.keys(inputs.image_settings)) {
        inputs.image_settings[key].addEventListener("change", (event) =>{
            sona.updateImageSettings(key, event.target.checked);
        });
    }
}
function sendLBLUpdates(){
    for (let key of Object.keys(inputs.line_mode)) {
        inputs.line_mode[key].addEventListener("change", (event) =>{
            sona.updateLineMode(key);

        });
    }
}

function initiateModeUpdates(){
        for (let key of Object.keys(inputs.mode)) {
        inputs.mode[key].addEventListener("change", (event) =>{ 
            if(sona.sona.line_mode === "inactive"){
                sona.updateMode(key);
                if(key === "line-by-line"){
                    lineCalibration();
                 }
            }else{                
                sona.updateMode(key);
                lineCalibration();
            }
        });
    }
}


function initialize(){

    //grab the object from storage
    sona.restoreFromStorage();
    //if storage is there
        //initialize from storage
    //synch to storage
    synchfromStorage();
    sendTextUpdates();
    sendImageUpdates();
    sendLBLUpdates();
    initiateModeUpdates();
}

