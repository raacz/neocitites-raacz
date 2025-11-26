const REGULAR = "regular";
const QUIZ = "quiz";
const LBL = "line-by-line";
const TABLE = "table";

const INACTIVE = "inactive"
class Sona {
    constructor() { //initial states
        this.sona = {
            initialized: false,
            text: {
                tok: true,
                en: false,
                sp: false,
            },
            image_settings: {
                img: true,
                description: true,
                attribution: true,
            },
            mode: REGULAR,
            line_mode: INACTIVE,
            sp_style: "indented",
        };
    }
    updateText(newText, state = true) {
        for (let text of Object.keys(this.sona.text)) {
            if (text === newText) {
                this.sona.text[text] = state;
            }
        }
        this.updateStorage();
    }
    updateImageSettings(newImageSetting, state = true) {
        for (let setting of Object.keys(this.sona.image_settings)) {
            if (setting === newImageSetting) {
                this.sona.image_settings[setting] = state;
            }
        }
        this.updateStorage();
    }
    updateLineMode(newLineMode){
        this.sona.line_mode = newLineMode;
        this.updateStorage();
    }
    updateSPStyle(newSPStyle){
        this.sona.sp_style = newSPStyle;
        this.updateStorage();
    }
    updateMode(newMode) { //only to be used when actually clicked by the user, not updated programmatically
        if (newMode === LBL) {
            if (this.sona.mode !== LBL) {
                this.enterLineByLine();
                /*console.log("LBL entered");*/
            }
        }
        else {
            if (this.sona.mode === LBL) {
                this.exitLineByLine();
                /*console.log("LBL exited");*/

            }
            this.sona.mode = newMode;
        }
        this.updateStorage();
    }
    updateStorage(){
        sessionStorage.setItem('Sona', JSON.stringify(this.sona));
    }

    restoreFromStorage() {
        if(sessionStorage['Sona']){
            this.sona = JSON.parse(sessionStorage['Sona']);
            this.sona.initialized = true;
        }
    }
    enterLineByLine() {
        let text = this.sona.text;
        if (
            //if en or tok and no sp
            (text.en || text.tok) && !text.sp) { //choose en/tok mode
            this.sona.line_mode = "tok_en";

        } else if //sp and no english
            (!text.en && text.sp) {
            //choose sp/tok mode
            this.sona.line_mode = "sp_tok";

        } else if //activates if nothing
            (!text.en && !text.tok && !text.sp) {
            this.sona.line_mode = "tok_en";
        } else //activates if both en and sp, if all
        {
            this.sona.line_mode = "sp_en";
        }

        //Ensure a clean slate for when we come backtmodext
        for (let state of Object.keys(this.sona.text)) {

            this.sona.text[state] = false;
        }

        this.sona.mode = LBL;
    }
    exitLineByLine(new_mode) {
        //ensure a clean slate for when we come back
        let line_mode = this.sona.line_mode;


        if (line_mode === "tok_en") {
            this.sona.text.en = true;
            this.sona.text.tok = true;
        } else if (line_mode === "sp_tok") {
            this.sona.text.sp = true;
            this.sona.text.tok = true;
        } else if (line_mode === "sp_en") {
            this.sona.text.sp = true;
            this.sona.text.en = true;

        } else {
            console.log("Fatal error: Line by line unassigned.");
        }
        this.sona.mode = new_mode;

        this.sona.line_mode = INACTIVE;

    }
    trueStates(object) {
        let trueStates = [];
        for (let [property, state] of Object.entries(object)) {
            if (state === true) {
                trueStates.push(property);
            }
        }
        return trueStates;
    }
    testSetting(texts, mode, img) {
        for (let state of Object.keys(this.sona.text)) {
            if (texts.includes(state)) {
                this.sona.text[state] = true;

            }
            else {
                this.sona.text[state] = false;
            }
        }
        if (mode === LBL) {
            this.enterLineByLine();
        }
        else {
            //pseudo-exiting line-by-line mode
            if (this.sona.mode == LBL) {
                this.sona.line_mode = INACTIVE;
            }
            this.sona.mode = mode;


        }
        for (let state of Object.keys(this.sona.image_settings)) {
            if (img.includes(state)) {
                this.sona.image_settings[state] = true;

            }
            else {
                this.sona.image_settings[state] = false;
            }
        }

        this.declareState();
    }
    declareState() {
        console.log("DECLARING STATES");
        console.log(this.sona);

        console.log("Current Mode:");
        console.log((this.sona.mode).toString());

        console.log("Current Languages:");
        if (this.sona.mode !== LBL) {
            console.log(this.trueStates(this.sona.text).toString());

        }
        else
            console.log((this.sona.line_mode).toString());
        console.log("Current Image Settings:");
        console.log(this.trueStates(this.sona.image_settings).toString());
    }
}

const sona = new Sona();
initialize();


/**
 * has initialized state (tells true if localstorage is present)
 * has state linebyline is active (suspends calculation/syncing temporarily)
 * 
 * has map for sp/tok/en //text
 * has map for 4 modes //mode
 * has map for attr/image/description //imgsettings
 * has 
 * 
 *  has method enter line by line states
 *  has method leave line by line states
 *
 */

