function splitSentences(text) {
  return text
    .split(/(?<=[.?!])/) // split after punctuation
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

function extractSentences(selector) {
  return Array.from(document.querySelectorAll(selector))
    .map(p => p.textContent.trim())
    .filter(text => text.length > 0) // ignore empty <p>
    .flatMap(splitSentences);        // break into sentences
}

// Extract Toki Pona and English
const tokiPonaSentences = extractSentences(".regular .tok p");
const englishSentences = extractSentences(".regular .en p");

console.log("Toki Pona:", tokiPonaSentences);
console.log("English:", englishSentences);

// Alignment check
if (tokiPonaSentences.length !== englishSentences.length) {
  console.warn(
    "Warning: Sentence counts differ!",
    tokiPonaSentences.length,
    englishSentences.length
  );
}

// (Optional) Build explicit pairs
const paired = tokiPonaSentences.map((tok, i) => ({
  tok,
  en: englishSentences[i] || null
}));

console.log("Pairs:", paired);


function buildTable(tokArray, enArray) {
  let table = `
    <table>
      <thead>
        <tr>
          <th lang="tok">toki pona</th>
          <th lang="en">English</th>
        </tr>
      </thead>
      <tbody>
  `;

  tokArray.forEach((tok, i) => {
    const en = enArray[i] || ""; // leave empty if no match
    table += `
        <tr>
          <td lang="tok">${tok}</td>
          <td lang="en">${en}</td>
        </tr>
    `;
  });

  table += `
      </tbody>
    </table>
  `;

  // Inject into .table (overwrite existing content)
  const injectDiv = document.querySelector(".inject1");
  if (injectDiv) {
    injectDiv.innerHTML = table;
  }
}

// Example usage:
buildTable(tokiPonaSentences, englishSentences);


function buildLines(tokArray, enArray) {
  let html = `<div class="lines">`;

  tokArray.forEach((tok, i) => {
    const en = enArray[i] || "";
    html += `
      <div class="line">
        <p lang="tok">${tok}</p>
        <details lang="en">
          <summary>en</summary>
          <p>${en}</p>
        </details>
      </div>
    `;
  });

  html += `</div>`;

  // Inject into .line (overwrite existing content)
  const container = document.querySelector(".inject2");
  if (container) {
    container.innerHTML = html;
  }
}

// Example usage:
buildLines(tokiPonaSentences, englishSentences);

function syncScriptCheckboxes() {
  const groups = [
    ["rc-1a", "rc-bl-1a", "rc-t-1a"], // English
    ["rc-1b", "rc-bl-1b", "rc-t-1b"], // Sitelen Pona
    ["rc-1c", "rc-bl-1c", "rc-t-1c"], // Sitelen Lasina
  ];

  groups.forEach(group => {
    const inputs = group.map(id => document.getElementById(id));

    inputs.forEach(input => {
      input.addEventListener("change", () => {
        const checked = input.checked;
        inputs.forEach(other => {
          if (other !== input) {
            other.checked = checked;
          }
        });
      });
    });
  });
}

// Call once on page load
syncScriptCheckboxes();


function enforceModeRequirements() {
  const modeRadios = document.querySelectorAll("input[name='mode']");

  modeRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (!radio.checked) return;

      const english = document.getElementById("rc-1a");
      const sitelenPona = document.getElementById("rc-1b");
      const sitelenLasina = document.getElementById("rc-1c");

      if (radio.id === "rc-2c" || radio.id === "rc-2d") {
        // Line mode or Table mode
        if (!english.checked) {
          english.checked = true;
          english.dispatchEvent(new Event("change"));
        }
        if (!sitelenPona.checked && !sitelenLasina.checked) {
          sitelenLasina.checked = true; // favour Lasina
          sitelenLasina.dispatchEvent(new Event("change"));
        }
      }

      if (radio.id === "rc-2b") {
        // Quiz mode
        if (english.checked) {
          english.checked = false;
          english.dispatchEvent(new Event("change"));
        }

        if (sitelenPona.checked && sitelenLasina.checked) {
          // Prefer Lasina, turn off Pona
          sitelenPona.checked = false;
          sitelenPona.dispatchEvent(new Event("change"));
        } else if (!sitelenPona.checked && !sitelenLasina.checked) {
          // If neither, default to Lasina
          sitelenLasina.checked = true;
          sitelenLasina.dispatchEvent(new Event("change"));
        }
      }
    });
  });
}

// Call once on page load
enforceModeRequirements();
