const READ_KEY = "reading mode";
const ENABLE_KEY = "reading mode is active";


 /*
    So here's how this works. 

    All of the keys for the various urls are passed over through local storage.
    A list of urls and associated word counts are passed through an inline script block. 

    First, using that list of urls and script block, this file makes a very complicated Story Stats object that represents all of the stories and files imaginable. 
    Secondly, it reads in all of the files that are read. 
    Thirdly, initializes and recursively performs all the calculations that it needs. It does so through inheritance. 
    

        A Calculator is something that has an array of something, and able to get calculatedData from that set of something that it has. 

        There are two kinds of Calculator objects:
        - Calculator objects that hold other Calculators, known as CalculateOverGroups
        - Calculator objects that hold basic page data, known as CalculateOverSingles

        The main object is called Story Stats. It is a Calculator of type CalculateOverGroups. The three Calculators that it holds each represent data from a type of text featured on the site: bite-sized, theme, and quest. 
        
        The Calculator holding Bite-Sized data is of type CalculateOverSingles. It's array holds page data.
        
        The Calculators holding Theme and Quest data are of type CalculateOverGroups. They each hold an array of MultiPageStory, a kind of CalculateOverSingles (the array of this MultiPageStory has all the page data for each story). MultiPageStories only differ in that they also have a URL identifier. 

        this is how the structure might look like when populated

        Story Stats
            CalculateOverSingles
                Single
                Single
                etc
            CalculateOverGroups
                MultiPageStories
                    Single
                    Single
                    etc
                MultiPageStories
                    Single
                    Single
                    etc
                etc
            CalculateOverGroups
                MultiPageStories
                    Single
                    Single
                    etc
                MultiPageStories
                    Single
                    Single
                    etc
                etc
    
    New story types will need to be hardcoded in. One current pitfall is that there is no 'type name' or anything associated with the highest level of CalculateOverSingles and CalculateOverGroups objects. So many of the genre checking stuff is purely done based on assuming that themes will be the first type in, bitesized will be the second, and quest will be third. 

    Additionally, StoryStats's method called tally and achieve stores the achievements (names, pictures, evaluation logic) as a set of generic objects. 
            
*/


class Single {
    constructor(url, wordcount) {
        this.url = url;
        this.wordcount = wordcount;
        //this.hasAnimal;
        //this.hasDeath;
        this.completed = false;
    }
}
class CalculatedData {
    constructor(c) {
        let completedUnits = 0;
        let completedWords = 0
        let totalWords = 0;
        let totalUnits = 0;
        let totalGroups = 0;
        if (c instanceof CalculateOverSingles) {
            for (let single of c.units) {
                totalWords = totalWords + single.wordcount;
                totalUnits = totalUnits + 1;
                if (single.completed) {
                    completedUnits = completedUnits + 1;
                    completedWords = completedWords + single.wordcount;
                }
            }


        }
        if (c instanceof CalculateOverGroups) {
            for (let group of c.units) {
                totalGroups = totalGroups + 1;
                totalUnits = totalUnits + group.calculatedData.totalUnits;
                totalWords = totalWords + group.calculatedData.totalWords;
                completedWords = completedWords + group.calculatedData.completedWords;
                completedUnits = completedUnits + group.calculatedData.completedUnits;

                if (group instanceof MultiPageStory) {
                    let pagesCompleted = (group.calculatedData.completedWords / group.calculatedData.totalWords) * 100;
                    if (pagesCompleted == 100) {
                        if (this.completedGroups) this.completedGroups = this.completedGroups + 1;
                        else this.completedGroups = 1;
                    }

                }
            }
            this.totalGroups = totalGroups;

        }
        let completedPercentage = (completedWords / totalWords) * 100;
        this.completedUnits = completedUnits;
        this.completedWords = completedWords;
        this.completedPercentage = completedPercentage;
        this.totalWords = totalWords;
        this.totalUnits = totalUnits;

    }
}
class Calculator {
    constructor() {
        this.units = [];
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
        if(!urls){
            urls = ["nothing","nothing"]; //this is if its null, to get it going
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
                if (unit instanceof MultiPageStory) {
                    map.set(unit.url, unit.pagesOutOf());
                }
                unit.getAsRead(map);

            }
            else {
                map.set(unit.url, unit.completed);
            }
        }
        return map;
    }

}
class CalculateOverGroups extends Calculator {
    constructor() {
        super();
    }
}
class CalculateOverSingles extends Calculator {
    constructor() {
        super();
    }

}
class MultiPageStory extends CalculateOverSingles {
    constructor(url) {
        super();
        this.url = url;
    }
    pagesOutOf() {
        return this.calculatedData.completedUnits + "/" + this.calculatedData.totalUnits;
    }
}
class StoryStats extends CalculateOverGroups {
    constructor() {
        super();
    }
    tallyAndAchieve() {
        this.calculatedData = new CalculatedData(this);

        let achievements = [];

        let thematic = {
            name: "Well-Travelled Thematic",
            descriptionText: "Complete all the Theme Stories",
            image: "StrollingDoodle.svg",
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
    getStoriesCompleted() {
        let total = 0;
        let complete = 0;
        for (let unit of this.units) {
            console.log(unit);
            if (unit instanceof CalculateOverSingles) {
                complete = complete + unit.calculatedData.completedUnits;
                total = total + unit.calculatedData.totalUnits;
            } else {
                complete = complete + unit.calculatedData.completedGroups;
                total = total + unit.calculatedData.totalGroups;
            }
        }

        return complete + " out of " + total;
    }

}

document.addEventListener('DOMContentLoaded', () => {
    let notActive = document.getElementsByClassName("prechallenge");
    let isActive = document.getElementsByClassName("postchallenge");
    let acceptChallengeButton = document.getElementById("challenge-accepted");
    let exitChallengeButton = document.getElementById("exit-challenge");
    let enabled = localStorage.getItem(ENABLE_KEY);

    
    let wipe = document.getElementById("wipe-data");
    wipe.addEventListener("click", function(){
        let confirmation = document.getElementById("confirmation");
        confirmation.showModal();
        let confirmwipe = document.getElementById("confirm-wipe");
        let actuallyno = document.getElementById("confirm-donot-wipe");
        actuallyno.addEventListener("click", function(){
            confirmation.close();
        });
        confirmwipe.addEventListener("click", function(){
            localStorage.clear();
            window.location.reload(true);
        })
    });

    /*wipeData.addEventListener(
        //todo
    );*/


    if (enabled) {
        gameIsActive();
    } else {
        gameIsInactive();
    }
    /*

    The game maintains active and inactive states for people who want to 'opt out' of the game, concerning it has too much pressure. it recalculated everything, every single time the game is opened again. In the future, consider storing info so that we can save on performance.  

    */



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
    function populateCalculator(storydata) {
        let allstats = new StoryStats();
        let bitesized = new CalculateOverSingles();
        let theme = new CalculateOverGroups();
        let quest = new CalculateOverGroups();

        let i = 0
        while (i < storydata.length) {

            if (storydata[i].type.includes("lili")) {
                let lili = new Single(storydata[i].url, storydata[i].count);
                bitesized.units.push(lili);
            }
            if (storydata[i].type.includes("suli")) {

                let suli = new MultiPageStory(storydata[i].url);
                let numberOfChildren = storydata[i].count;
                i++;
                for (let j = 0; j < numberOfChildren; j++) {

                    let page = new Single(storydata[i].url, storydata[i].count);
                    suli.units.push(page);
                    i++;
                }
                theme.units.push(suli);
                i--;
            }
            if (storydata[i].type.includes("wawa")) {

                let wawa = new MultiPageStory(storydata[i].url);
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
        allstats.units.push(theme);
        allstats.units.push(bitesized);
        allstats.units.push(quest);
        return allstats;
    }

    function populateAchievements(storyStats) {
        let unachieved = document.getElementsByClassName("unearned")[0];
        unachieved.innerHTML = "";

        let achieved = document.getElementsByClassName("earned")[0];
        achieved.innerHTML = "";

        let acounter = 0;

        let message = document.createElement("li");
        message.classList.add("temporal-message");


        for (let achievement of storyStats.achievements) {
            console.log(achievement.name);
            let newLI = document.createElement("li");
            let newDiv = document.createElement("div");
            let newHeading = document.createElement("h3");
            let newImg = document.createElement("img");
            let newSpan = document.createElement("span");

            newDiv.classList.add("img-wrap");
            newDiv.appendChild(newImg);
            newImg.src = "../assets/achievements/open-doodles/svg/" + achievement.image;
            newImg.alt = "";

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
            if (typeof statData === 'string') {
                values[i].innerText = statData;
            } else if (typeof statData === 'boolean') {
                if (statData) values[i].innerText = "✅";
                else values[i].innerText = "❌";
            } else {
                values[i].innerText = "🙆";
            }
            //console.log(read.get(keys[i].attributes.href));
        }

        //all caption values populated (eg: Theme Texts 6/6)
        let tallyType = document.getElementsByClassName("tally");
        for (let i = 0; i < storyStats.units.length; i++) {
            let type = storyStats.units[i];
            let completed = -1;
            if (type instanceof CalculateOverSingles) {
                completed = type.calculatedData.completedUnits;
            }
            if (type instanceof CalculateOverGroups) {
                completed = type.calculatedData.completedGroups;
            }

            tallyType[i].innerText = completed + "/" + type.units.length;
        }


        //in the future, try turning this into a function so that it is more readable. 

        //various stats to be displayed
        let percentageBox = document.getElementById("progress-bar");
        console.log(percentageBox);
        percentageBox.style.width = Math.round(storyStats.calculatedData.completedPercentage) + "%";

        let percentComplete = storyStats.calculatedData.completedPercentage.toFixed(2) + "%";

        let stats = document.getElementById("stats_percentDone");
        stats.innerText = "Your Progress:" + " " + percentComplete;

        stats = document.getElementById("stats_wordTotal");
        stats.innerText = "Total Words Read:" + "\n" + storyStats.calculatedData.completedWords + " words";

        stats = document.getElementById("stats_pageTotal");
        stats.innerText = "Total Pages Read:" + "\n" + storyStats.calculatedData.completedUnits + " pages";


        stats = document.getElementById("stats_storyTotal");
        stats.innerText = "Stories Completed: \n" + storyStats.getStoriesCompleted();


        stats = document.getElementById("stats_achievementsTotal");
        stats.innerText = "Achievements Secured:\n" + storyStats.achieved + " out of " + storyStats.achievements.length;
        console.log(storyStats.achieved);

    }





});


