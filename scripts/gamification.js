const READ_KEY = "reading mode";
const ENABLE_KEY = "reading mode is active";



class Single {
    constructor(url, wordcount) {
        this.url = url;
        this.wordcount = wordcount;
        this.specialWords = [];
        this.completed = false;
    }
}
class CalculatedData {
    constructor(c) {


        let completedWords = 0
        let totalWords = 0;
        let completedPercentage;

        let completedGroups = 0;
        let totalGroups = 0;

        let completedSingles = 0;
        let totalSingles = 0;

        let completedUnits = 0;
        let totalUnits = 0;

        let specialWords = [];

        for (let item of c.units) {
            if (item instanceof Single) {
                totalWords = totalWords + item.wordcount;
                totalSingles = totalSingles + 1;
                if (item.completed) {
                    completedSingles = completedSingles + 1;
                    completedWords = completedWords + item.wordcount;
                }
            }
            if (item instanceof Calculator) {
                totalSingles = totalSingles + item.calculatedData.totalSingles;
                completedSingles = completedSingles + item.calculatedData.completedSingles;


                totalWords = totalWords + item.calculatedData.totalWords;
                completedWords = completedWords + item.calculatedData.completedWords;
                if (item.units[0] instanceof Single) {
                    totalGroups = totalGroups + 1;
                    if (item.calculatedData.totalUnits == item.calculatedData.completedUnits) {
                        completedGroups = completedGroups + 1;
                    }
                } else {
                    totalGroups = totalGroups + item.calculatedData.totalGroups;
                    completedGroups = completedGroups + item.calculatedData.completedGroups;
                }
            }
        }
        if (totalSingles != 0) {
            this.totalSingles = totalSingles;
            this.completedSingles = completedSingles;


        }
        if (totalGroups != 0) {
            this.totalGroups = totalGroups;
            this.completedGroups = completedGroups;

            totalUnits = totalUnits + totalGroups;
            completedUnits = completedUnits + completedGroups;
        }else{
            totalUnits = totalUnits + totalSingles;
            completedUnits = completedUnits + completedSingles;
        }


        completedPercentage = (completedWords / totalWords) * 100;
        this.completedWords = completedWords;
        this.totalWords = totalWords;

        if (completedPercentage == 100) {
            this.completed = true;
        } else {
            this.completed = false;

        }

        this.completedPercentage = completedPercentage;

        this.totalUnits = totalUnits;
        this.completedUnits = completedUnits;

    }
}
class Calculator {
    constructor(url) {
        this.units = [];
    }
    setCalculatorUrl(url) {
        this.url = url;
    }
    initialize() {
        for (let unit of this.units) {
            if (unit instanceof Calculator) {

                if (unit.initialize()) {
                }
                unit.calculatedData = new CalculatedData(unit);
            }
            if (unit instanceof Single) {
                return true;
            }
        }
        return true;
    }
    setAsRead(urls) {
        if (!urls) {
            urls = ["nothing", "nothing"]; //this is if its null, to get it going
        }

        for (let unit of this.units) {
            if (unit instanceof Calculator) {
                unit.setAsRead(urls);
            } else {
                if (urls.includes(unit.url)) {
                    unit.completed = true;
                }
            }
        }

    }
    getAsRead(map) {
        for (let unit of this.units) {
            if (unit instanceof Calculator) {
                unit.getAsRead(map);
                if (unit.units[0] instanceof Single) {
                    map.set(unit.url, unit.outOf());
                }
            }
            else {
                map.set(unit.url, unit.completed);
            }
        }
        return map;
    }
    outOf() {
        let mi = {
            string: this.calculatedData.completedUnits + "/" + this.calculatedData.totalUnits,
            boolean: this.calculatedData.completed,
        }
        return mi;
    }

}
class StoryStats extends Calculator {
    constructor() {
        super();
    }
    tallyAndAchieve() {
        this.calculatedData = new CalculatedData(this);

        let achievements = [];

        let thematic = {
            name: "Topically Well-Travelled",
            descriptionText: "Complete all the Topic Stories",
            image: "StrollingDoodle.svg",
            alt: "Strollin' round town, your arms a-swingin,' you've seen some things and your confidence is growin'",
            logic: function (parent) {
                if (parent.units[0].calculatedData.completedGroups == parent.units[0].units.length)
                    return true;
                return false;
            },
        }
        achievements.push(thematic);

        let voracious = {
            name: "Voracious Learner",
            descriptionText: "Complete all the Bite-Sized Stories",
            image: "IceCreamDoodle.svg",
            alt: "Look at you luggin' round that massive ice cream cone, you're a cherry on top!",
            logic: function (parent) {
                if (parent.units[1].calculatedData.completedUnits == parent.units[1].units.length)
                    return true;
                return false;
            },

        }
        //console.log("voracious is " + voracious.logic(this));
        achievements.push(voracious);

        let slayer = {
            name: "Dragon Slayer",
            descriptionText: "Complete all the Quest Stories",
            image: "MeditatingDoodle.svg",
            alt: "Damn you're zen, lotus meditation hair swirlin' and whirlin' above you, warrior will-o-wisp.",
            logic: function (parent) {
                if (parent.units[2].calculatedData.completedGroups == parent.units[2].units.length)
                    return true;
                return false;
            },
        }
        //console.log("slayer is " + slayer.logic(this));
        achievements.push(slayer);



        let half = {
            name: "Half In, Half Out",
            descriptionText: "Reach 50% progress",
            image: "UnboxingDoodle.svg",
            alt: "Oooh caught in a fever dream, pulling your numb legs to climb outta that cardboard box, you are your own deliverer.",
            logic: function (parent) {
                if (parent.calculatedData.completedPercentage >= 50)
                    return true;
                return false;
            },
        }
        //console.log("reader is " + reader.logic(this));
        achievements.push(half);

        let reader = {
            name: "Hopefully, Time Well Spent",
            descriptionText: "Complete all stories released so far to the site",
            image: "ReadingDoodle.svg",
            alt: "Nose so far in a book, smells so good, criss-cross applesauce, we'll resume daily life some other time.",
            logic: function (parent) {
                if (parent.calculatedData.completedPercentage == 100)
                    return true;
                return false;
            },
        }
        //console.log("reader is " + reader.logic(this));
        achievements.push(reader);




        /*let animal = {
            name: "Animal Lover",
            descriptionText: "Complete all stories that contain the word 'soweli', 'kala', 'akesi', 'pipi' or 'waso'",
            image: "DoogieDoodle.svg",
            logic: function (){
                return false;
            },
        }
        //console.log("animal is " + animal.logic(this));
        achievements.push(animal);*/

        /*let macabre = {
            name: "Member of the Macabre",
            descriptionText: "Complete all stories that contain the word 'moli.'",
            image: "ZombieingDoodle.svg",
            logic: function (){
                return false;
            },
        }
        //console.log("zombie is " + zombie.logic(this));
        achievements.push(macabre);*/

        this.achievements = achievements;

    }
    setAchievements(counter) {
        this.achieved = counter;
    }
    getStories() {
        let total = 0;
        let complete = 0;
        for (let unit of this.units) {
            if (unit.units[0] instanceof Single) {
                complete = complete + unit.calculatedData.completedUnits;
                total = total + unit.calculatedData.totalUnits;
            } else {
                complete = complete + unit.calculatedData.completedGroups;
                total = total + unit.calculatedData.totalGroups;
            }
        }
        return {
            total : total,
            completed : complete,
        };
    }


}

document.addEventListener('DOMContentLoaded', () => {
    let notActive = document.getElementsByClassName("prechallenge");
    let isActive = document.getElementsByClassName("postchallenge");
    let acceptChallengeButton = document.getElementById("challenge-accepted");
    let exitChallengeButton = document.getElementById("exit-challenge");
    let enabled = localStorage.getItem(ENABLE_KEY);

    //wipe data function. dialog to confirm. 
    let wipe = document.getElementById("wipe-data");
    wipe.addEventListener("click", function () {
        let confirmation = document.getElementById("confirmation");
        confirmation.showModal();
        let confirmwipe = document.getElementById("confirm-wipe");
        let actuallyno = document.getElementById("confirm-donot-wipe");
        actuallyno.addEventListener("click", function () {
            confirmation.close();
        });
        confirmwipe.addEventListener("click", function () {
            localStorage.clear();
            window.location.reload(true);
        })
    });


    if (enabled === "true") {
        gameIsActive();
    } else {
        gameIsInactive();
    }
    /*

    The game maintains active and inactive states for people who want to 'opt out' of the game, concerning it has too much pressure. it recalculated everything, every single time the game is opened again. In the future, consider storing info so that we can save on performance.  

    */


    //These four functions manage play/unplayed state. gameIsActive runs the game
    function exposeChallengeState(state) {
        if (state) {
            for (item of notActive) {
                item.style.display = "none";
            }
            for (item of isActive) {
                item.style.display = "block";
            }
        } else {
            for (item of notActive) {
                item.style.display = "block";
            }
            for (item of isActive) {
                item.style.display = "none";
            }
        }
    }
    function gameIsInactive() {
        toggle(false);
        acceptChallengeButton.addEventListener("click", () => {
            gameIsActive();
        });

    }
    function toggle(state) {
        enabled = state;
        localStorage.setItem(ENABLE_KEY, state);
        exposeChallengeState(state);
    }
    function gameIsActive() {
        toggle(true);
        exitChallengeButton.addEventListener("click", () => {
            gameIsInactive();
        });
        storyStats = populateCalculator(storyData);
        storyStats.setAsRead(localStorage.getItem(READ_KEY));
        storyStats.initialize();
        storyStats.tallyAndAchieve();
        populateAchievements(storyStats);
        populateDOM(storyStats);
    }

    //tediously walks through and assigns wordcount and url data from the inlinescript JSON object.
    //in the future this should also pass a list of objects with words and true/false values 
    function populateCalculator(storydata) {
        let allstats = new StoryStats();
        let bitesized = new Calculator();
        let theme = new Calculator();
        let quest = new Calculator();

        let i = 0
        while (i < storydata.length) {
            //currently hardcoded by tag name
            if (storydata[i].type.includes("lili")) {
                let lili = new Single(storydata[i].url, storydata[i].count);
                bitesized.units.push(lili);
            }
            if (storydata[i].type.includes("suli")) {

                let suli = new Calculator();
                suli.setCalculatorUrl(storydata[i].url);
                // hey this technically could also take story.data[i] as a total groups value

                let numberOfChildren = storydata[i].count;
                i++;
                for (let j = 0; j < numberOfChildren; j++) {
                    let page = new Single(storydata[i].url, storydata[i].count);
                    suli.units.push(page);
                    i++;
                }
                theme.units.push(suli);
                i--; //correction for overshooting
            }
            if (storydata[i].type.includes("wawa")) {

                let wawa = new Calculator();
                wawa.setCalculatorUrl(storydata[i].url);

                let numberOfChildren = storydata[i].count;
                i++;
                for (let j = 0; j < numberOfChildren; j++) {

                    let page = new Single(storydata[i].url, storydata[i].count);
                    wawa.units.push(page);
                    i++;
                }
                quest.units.push(wawa);
                i--;
            }
            i++;
        }
        //yeah this could be done better
        allstats.units.push(theme);
        allstats.units.push(bitesized);
        allstats.units.push(quest);
        return allstats;
    }
    //populate achievements occurs after storyStats has been populated with 'read completion data', after all the CalculatedData objects have been initialized, and after all of the achievements have been loaded. 
    //populateAchivements must run before populateDOM so that an accurate 'you've achieved this much' can be loaded into Stats. 
    function populateAchievements(storyStats) {
        let unachieved = document.getElementsByClassName("unearned")[0];
        unachieved.innerHTML = "";

        let achieved = document.getElementsByClassName("earned")[0];
        achieved.innerHTML = "";

        let acounter = 0;

        let message = document.createElement("li");
        message.classList.add("temporal-message");


        for (let achievement of storyStats.achievements) {
            let newLI = document.createElement("li");
            let newDiv = document.createElement("div");
            let newHeading = document.createElement("h3");
            let newImg = document.createElement("img");
            let newSpan = document.createElement("span");

            newDiv.classList.add("img-wrap");
            newDiv.appendChild(newImg);
            newImg.src = "../assets/achievements/open-doodles/svg/" + achievement.image;
            newImg.alt = achievement.alt;


            newHeading.innerText = achievement.name;
            newSpan.innerText = achievement.descriptionText;

            newLI.appendChild(newHeading);
            newLI.appendChild(newDiv);
            newLI.appendChild(newSpan);

            if (achievement.logic(storyStats)) {
                achieved.appendChild(newLI);
                acounter++;
            } else {
                unachieved.appendChild(newLI);
            }


        }
        storyStats.setAchievements(acounter);
        if (acounter == 0) {
            message.innerText = "You haven't earned any achievements yet."
            achieved.append(message);
        }
        if (acounter == storyStats.achievements.length) {
            message.innerText = "I'm shocked to say this but you've literally completed all the achievements. I'm so proud of you!"
            unachieved.append(message);
        }

    }

    function populateDOM(storyStats) {

        //all table values populated
        let keys = document.getElementsByClassName("target");
        let values = document.getElementsByClassName("delivery");
        let read = storyStats.getAsRead(new Map());



        for (let i = 0; i < keys.length; i++) {
            let key = keys[i].attributes.href.nodeValue.trim();
            let statData = read.get(key);
            ;
            if (typeof statData === 'boolean') {
                if (statData) {
                    values[i].innerText = "Read";
                    values[i].classList.add("complete");

                }
                else {
                    values[i].innerText = "Unread";
                    values[i].classList.add("incomplete");
                }
            } else { //outof must have been triggered
                values[i].innerText = statData.string;
                if (statData.boolean) {
                    values[i].classList.add("complete");
                } else {
                    values[i].classList.add("incomplete");

                }
            }
            //console.log(read.get(keys[i].attributes.href));
            /*                if (statData) values[i].replaceWith(cloneNode(completedNode));
              else values[i].replaceWith(cloneNode(incompleteNode));

          */
        }

        //all caption values populated (eg: Theme Texts 6/6)
        let tallyByType = document.getElementsByClassName("tally");
        for (let i = 0; i < storyStats.units.length; i++) {
            let type = storyStats.units[i];
            let completed = -1;
            completed = type.calculatedData.completedUnits;

            tallyByType[i].innerText = completed + "/" + type.calculatedData.totalUnits;
        }

        document.getElementById("total-pages").innerText = storyStats.calculatedData.totalSingles;


        //in the future, try turning this into a function so that it is more readable. 

        //various stats to be displayed
        let percentageBox = document.getElementById("progress-bar");
        percentageBox.style.width = Math.round(storyStats.calculatedData.completedPercentage) + "%";

        let percentComplete = storyStats.calculatedData.completedPercentage.toFixed(2) + "%";

        let stats = document.getElementById("stats_percentDone");
        stats.innerText = "Your Progress:" + " " + percentComplete;

        stats = document.getElementById("stats_wordTotal");
        stats.innerText = "Total Words Read:" + "\n" + storyStats.calculatedData.completedWords + " words";

        stats = document.getElementById("stats_pageTotal");
        stats.innerText = "Total Pages Read:" + "\n" + storyStats.calculatedData.completedSingles + " out of "+storyStats.calculatedData.totalSingles;


        stats = document.getElementById("stats_storyTotal");
        let stories = storyStats.getStories();
        stats.innerText = "Stories Completed: \n" + stories.completed+" out of "+stories.total;

        stats = document.getElementById("stats_achievementsTotal");
        stats.innerText = "Achievements Secured:\n" + storyStats.achieved + " out of " + storyStats.achievements.length;
        console.log(storyStats);

    }





});


