function store(key, value) {
  sessionStorage.setItem(key, value);
  console.log(value + " stored to " + key);
}

// Checkbox pairs that should stay synced

let isActive = false;
const syncPairs = [
  { main: 'rc-1a', twin: 'rc-t-1a' },
  { main: 'rc-1b', twin: 'rc-t-1b' },
  { main: 'rc-1c', twin: 'rc-t-1c' }
];

// Get all checkbox elements
const checkboxes = {
  'rc-1a': document.getElementById('rc-1a'),
  'rc-t-1a': document.getElementById('rc-t-1a'),
  'rc-1b': document.getElementById('rc-1b'),
  'rc-t-1b': document.getElementById('rc-t-1b'),
  'rc-1c': document.getElementById('rc-1c'),
  'rc-t-1c': document.getElementById('rc-t-1c'),
  'rc-bl-1a': document.getElementById('rc-bl-1a'),
  'rc-bl-1b': document.getElementById('rc-bl-1b'),
  'rc-bl-1c': document.getElementById('rc-bl-1c'),
  'rc-2a': document.getElementById('rc-2a'),
  'rc-2b': document.getElementById('rc-2b'),
  'rc-2c': document.getElementById('rc-2c'),
  'rc-2d': document.getElementById('rc-2d')
};
// Calculate rc-bl checkbox states based on rc-1a, rc-1b, rc-1c
function calculateRcBlStates() {
  const english = checkboxes['rc-1a'].checked;
  const pona = checkboxes['rc-1b'].checked;
  const lasina = checkboxes['rc-1c'].checked;

  checkboxes['rc-bl-1a'].checked = false;
  checkboxes['rc-bl-1b'].checked = false;
  checkboxes['rc-bl-1c'].checked = false;

  //tokipona/english
  if ((english && !pona && lasina) || (!english && !pona && lasina) || (english && !pona && !lasina)) {
    let change = 'rc-bl-1a';
    checkboxes[change].checked = true;
    store("line", change);
  }
  else if ((!english && pona && lasina) || (!english && pona && !lasina)) {

    let change = 'rc-bl-1b';
    checkboxes[change].checked = true;
    store("line", change);


  }
  else {
    let change = 'rc-bl-1c';
    checkboxes[change].checked = true;
    store("line", change);


  }
}

// Sync a pair of checkboxes
function syncCheckboxPair(sourceId, targetId) {
  checkboxes[targetId].checked = checkboxes[sourceId].checked;
}

// Handle sync pairs (rc-1a/rc-t-1a, etc.) when user changes them
syncPairs.forEach(pair => {
  checkboxes[pair.main].addEventListener('change', () => {
    syncCheckboxPair(pair.main, pair.twin);
  });

  checkboxes[pair.twin].addEventListener('change', () => {
    syncCheckboxPair(pair.twin, pair.main);
  });
});

// Handle "unchecked" behavior - when rc-2a, rc-2b, or rc-2d changes while rc-2c is checked
function handleUncheckedBehavior() {
  // Check which rc-bl checkbox is checked and set rc-1x values accordingly
  if (checkboxes['rc-bl-1a'].checked) {
    // rc-bl-1a = rc-1b is unchecked, rc-1a and rc-1c are checked
    checkboxes['rc-1b'].checked = false;
    checkboxes['rc-1a'].checked = true;
    checkboxes['rc-1c'].checked = true;
  } else if (checkboxes['rc-bl-1b'].checked) {
    // rc-bl-1b = rc-1a is unchecked, rc-1b and rc-1c are checked
    checkboxes['rc-1a'].checked = false;
    checkboxes['rc-1b'].checked = true;
    checkboxes['rc-1c'].checked = true;
  } else if (checkboxes['rc-bl-1c'].checked) {
    // rc-bl-1c = rc-1c is unchecked, rc-1a and rc-1b are checked
    checkboxes['rc-1c'].checked = false;
    checkboxes['rc-1a'].checked = true;
    checkboxes['rc-1b'].checked = true;
  }

  // Sync rc-1x to rc-t-1x
  syncPairs.forEach(pair => {
    syncCheckboxPair(pair.main, pair.twin);
  });
}

// Monitor rc-2a, rc-2b, rc-2d for changes while rc-2c is checked
['rc-2a', 'rc-2b', 'rc-2d'].forEach(id => {
  checkboxes[id].addEventListener('change', () => {
    if (isActive === true) {
      handleUncheckedBehavior();
      isActive = false;
    }
  });
});

// Handle rc-2c checkbox behavior
checkboxes['rc-2c'].addEventListener('change', () => {
  if (checkboxes['rc-2c'].checked) {
    calculateRcBlStates();
    isActive = true;
  }
});

// Initial sync on load
syncPairs.forEach(pair => {
  syncCheckboxPair(pair.main, pair.twin);
});




/** 000000000000000000000000000000000000000 */

//session storage 
document.addEventListener('DOMContentLoaded', () => {
  let menu = document.getElementsByTagName("input");
  let numerator = 1;
  for (let item of menu) {
    console.log(item.id);
    item.addEventListener('change', (event) => {
      console.log("change event on" + event.id);
      if (event.target.type !== "radio") {
        console.log(event.target.id + event.target.checked);
        store(event.target.id, event.target.checked);
        console.log("non-radio");
      }
      else if (event.target.name === "version") {
        console.log("line" + event.target.id);
        store("line", event.target.id);
        console.log("line");
      }
      else if (event.target.name === "mode") {
        console.log("radio" + event.target.id);
        store("radio", event.target.id);
        console.log("radio");
      }
    });
  }

  const modes = {
    'rc-2a': document.getElementById('rc-2a'),
    'rc-2b': document.getElementById('rc-2b'),
    'rc-2c': document.getElementById('rc-2c'),
    'rc-2d': document.getElementById('rc-2d')
  };

  const versions = {
    'rc-bl-1a': document.getElementById('rc-bl-1a'),
    'rc-bl-1b': document.getElementById('rc-bl-1b'),
    'rc-bl-1c': document.getElementById('rc-bl-1c')
  };



  window.addEventListener("load", (event) => {
    for (let i = 0; i < menu.length; i++) {
      console.log(menu[i] + "is preprocessing");
      if (menu[i].type !== "radio") {
        let change = sessionStorage.getItem(menu[i].id);
        menu[i].checked = JSON.parse(change);
        console.log(change + "was changed");
      }
      else if(menu[i].name === "version"){
      /*logic for line-by-line storing and restoration*/
        let change = sessionStorage.getItem("line");
        for (let mode of Object.values(versions)) {
          if (mode.id === change) {
            mode.checked = true;
          }
          else {
            mode.checked = false;
          }
        }
      }
      else if (menu[i].type === "radio") {
        let change = sessionStorage.getItem("radio");
        for (let mode of Object.values(modes)) {
          if (mode.id === change) {
            mode.checked = true;
            if(mode.id === "rc-2c"){
              handleUncheckedBehavior();
            }
          }
          else {
            mode.checked = false;
          }
        }
      }
    }
  });




 
});

