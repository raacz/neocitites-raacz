const fs = require("fs");
const path = require("path");

// --- Normalization + splitting helpers ---
function normalizeLasina(text) {
  return text.replace(/\s+/g, " ").trim();
}

function splitLasina(text) {
  return normalizeLasina(text).split(/(?<=[.!?])\s+/);
}

function normalizeSP(text) {
  return text
    .replace(/zz/g, "")                   // remove ligature helpers
    .replace(/<br\s*\/?>/gi, "|")         // unify <br> markers
    .replace(/\s+/g, " ")
    .trim();
}

function splitSP(text) {
  return normalizeSP(text)
    .split("|")
    .map(s => s.trim())
    .filter(Boolean);
}

// --- Alignment (basic, can upgrade later) ---
function alignSentences(tokSentences, enSentences, spSentences) {
  return tokSentences.map((t, i) => ({
    tok: t,
    en: enSentences[i] || "",
    sp: spSentences[i] || ""
  }));
}

module.exports = function () {
  const baseDir = __dirname; // "stories/" folder
  const storyDirs = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  const outBase = path.join(baseDir, "../_data/stories");
  fs.mkdirSync(outBase, { recursive: true });

  for (const storyName of storyDirs) {
    const dir = path.join(baseDir, storyName);

    const tok = fs.readFileSync(path.join(dir, "tok.md"), "utf8");
    const en  = fs.readFileSync(path.join(dir, "en.md"), "utf8");
    const sp  = fs.readFileSync(path.join(dir, "sp.md"), "utf8");

    const tokSentences = splitLasina(tok);
    const enSentences  = splitLasina(en);
    const spSentences  = splitSP(sp);

    const lines = alignSentences(tokSentences, enSentences, spSentences);

    const outPath = path.join(outBase, `${storyName}.json`);
    fs.writeFileSync(outPath, JSON.stringify(lines, null, 2), "utf8");
  }

  // Don’t inject anything into Eleventy context directly
  return {};
};
