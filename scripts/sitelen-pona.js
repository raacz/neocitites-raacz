document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementsByClassName("table")[0];
    const regular = document.getElementsByClassName("regular")[0];

    const raw = table.querySelectorAll('.sp');
    const here = regular.querySelector(".sp");

    let justAString = "";

    let flattened = [];
    for(let i of raw){
        let clean = i.innerText.replace(/zz/g, "");
        clean = clean.replace(/\s+/g, ' ').trim();
        clean = clean + ".";

        justAString = justAString + clean;
        flattened.push(clean);
    }

    //which punctuation ending is active
    console.log(sona);


});
