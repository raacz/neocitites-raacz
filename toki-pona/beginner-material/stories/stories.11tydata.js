// matchers.js

// --------------------
// TOK SENTENCE SPLITTER
// --------------------
function splitTokSentences(text) {
  // split into paragraphs
  const paragraphs = text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);

  let sentences = [];
  for (let p of paragraphs) {
    // split on . ? !
    let parts = p.split(/([.?!])/).filter(Boolean);
    let buffer = "";
    for (let part of parts) {
      buffer += part;
      if (/[.?!]/.test(part)) {
        sentences.push(buffer.trim());
        buffer = "";
      }
    }
    if (buffer.trim()) {
      sentences.push(buffer.trim());
    }
  }
  return sentences;
}

// --------------------
// EN SENTENCE SPLITTER
// --------------------
function splitEnSentences(text) {
  const paragraphs = text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);

  let sentences = [];
  for (let p of paragraphs) {
    let parts = p.split(/([.?!])/).filter(Boolean);
    let buffer = "";
    for (let part of parts) {
      buffer += part;
      if (/[.?!]/.test(part)) {
        sentences.push(buffer.trim());
        buffer = "";
      }
    }
    if (buffer.trim()) {
      sentences.push(buffer.trim());
    }
  }
  return sentences;
}

// --------------------
// SP SENTENCE SPLITTER
// --------------------
function splitSpSentences(text) {
  const paragraphs = text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);

  let sentences = [];
  for (let p of paragraphs) {
    let parts = p.split(/\n/).map(s => s.trim()).filter(Boolean);
    sentences.push(...parts);
  }
  return sentences;
}

// --------------------
// WORD COUNT HELPER
// --------------------
function wordCount(str) {
  return str.split(/[\s+-]+/).filter(Boolean).length;
}

// --------------------
// TOK-EN PAIRING
// --------------------
function pairTokEn(tokText, enText) {
  const tokSentences = splitTokSentences(tokText);
  const enSentences = splitEnSentences(enText);

  let pairs = [];
  let count = Math.max(tokSentences.length, enSentences.length);

  for (let i = 0; i < count; i++) {
    pairs.push({
      tok: tokSentences[i] || "",
      en: enSentences[i] || ""
    });
  }

  if (tokSentences.length !== enSentences.length) {
    console.warn(
      `⚠️ Tok/EN mismatch: ${tokSentences.length} tok vs ${enSentences.length} en`
    );
  }

  return pairs;
}

// --------------------
// TOK-SP PAIRING
// --------------------
function pairTokSp(tokText, spText) {
  const tokSentences = splitTokSentences(tokText);
  const spSentences = splitSpSentences(spText);

  let pairs = [];
  let spIndex = 0;

  for (let t of tokSentences) {
    let tCount = wordCount(t);

    // grab at least one sp sentence
    let current = spSentences[spIndex] || "";
    let combined = current;
    let combinedCount = wordCount(combined);

    while (
      combinedCount < tCount * 0.6 && // allow fuzziness
      spIndex + 1 < spSentences.length
    ) {
      spIndex++;
      combined += " " + spSentences[spIndex];
      combinedCount = wordCount(combined);
    }

    pairs.push({ tok: t, sp: combined.trim() });
    spIndex++;
  }

  if (tokSentences.length !== pairs.length) {
    console.warn(
      `⚠️ Tok/SP mismatch: ${tokSentences.length} tok vs ${spSentences.length} sp`
    );
  }

  return pairs;
}

// --------------------
// COMBINED TRIPLE MATCHER
// --------------------
function pairTokEnSp(tokText, enText, spText) {
  const tokEnPairs = pairTokEn(tokText, enText);
  const tokSpPairs = pairTokSp(tokText, spText);

  let triples = tokEnPairs.map((pair, i) => ({
    tok: pair.tok,
    en: pair.en,
    sp: tokSpPairs[i] ? tokSpPairs[i].sp : ""
  }));

  return triples;

}




module.exports = function() {
  const baseDir = __dirname;
  const dirs = fs.readdirSync(baseDir).filter(d => fs.statSync(path.join(baseDir, d)).isDirectory());

  let allData = {};

  for (let dir of dirs) {
    const files = fs.readdirSync(path.join(baseDir, dir));
    let entry = {};

    for (let f of files) {
      if (f.endsWith(".md")) {
        const slug = f.replace(".md", "");
        entry[slug] = fs.readFileSync(path.join(baseDir, dir, f), "utf8");
      }
    }
    let tokLine = splitTokSentences(entry["tok"]);
    let enLine = pairTokEn(entry["tok"], entry["en"]); 
    let spLine = pairTokSp(entry["tok"], entry["sp"]);


    allData[dir] = {
      en: entry["en"] || "",
      sp: entry["sp"] || "",
      tok: entry["tok"] || "",
      enLine: enLine || "",
      spLine: spLine || "",
      tokLine: tokLine || ""
    };
    console.log(allData[dir]);
  }

  return {
    eleventyComputed: {
      story: data => allData[data.page.fileSlug] || {}
    }
  };
};
// matchers.js

// --------------------
// TOK SENTENCE SPLITTER
// --------------------
function splitTokSentences(text) {
  // split into paragraphs
  const paragraphs = text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);

  let sentences = [];
  for (let p of paragraphs) {
    // split on . ? !
    let parts = p.split(/([.?!])/).filter(Boolean);
    let buffer = "";
    for (let part of parts) {
      buffer += part;
      if (/[.?!]/.test(part)) {
        sentences.push(buffer.trim());
        buffer = "";
      }
    }
    if (buffer.trim()) {
      sentences.push(buffer.trim());
    }
  }
  return sentences;
}

// --------------------
// EN SENTENCE SPLITTER
// --------------------
function splitEnSentences(text) {
  const paragraphs = text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);

  let sentences = [];
  for (let p of paragraphs) {
    let parts = p.split(/([.?!])/).filter(Boolean);
    let buffer = "";
    for (let part of parts) {
      buffer += part;
      if (/[.?!]/.test(part)) {
        sentences.push(buffer.trim());
        buffer = "";
      }
    }
    if (buffer.trim()) {
      sentences.push(buffer.trim());
    }
  }
  return sentences;
}

// --------------------
// SP SENTENCE SPLITTER
// --------------------
function splitSpSentences(text) {
  const paragraphs = text.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);

  let sentences = [];
  for (let p of paragraphs) {
    let parts = p.split(/\n/).map(s => s.trim()).filter(Boolean);
    sentences.push(...parts);
  }
  return sentences;
}

// --------------------
// WORD COUNT HELPER
// --------------------
function wordCount(str) {
  return str.split(/[\s+-]+/).filter(Boolean).length;
}

// --------------------
// TOK-EN PAIRING
// --------------------
function pairTokEn(tokText, enText) {
  const tokSentences = splitTokSentences(tokText);
  const enSentences = splitEnSentences(enText);

  let pairs = [];
  let count = Math.max(tokSentences.length, enSentences.length);

  for (let i = 0; i < count; i++) {
    pairs.push({
      tok: tokSentences[i] || "",
      en: enSentences[i] || ""
    });
  }

  if (tokSentences.length !== enSentences.length) {
    console.warn(
      `⚠️ Tok/EN mismatch: ${tokSentences.length} tok vs ${enSentences.length} en`
    );
  }

  return pairs;
}

// --------------------
// TOK-SP PAIRING
// --------------------
function pairTokSp(tokText, spText) {
  const tokSentences = splitTokSentences(tokText);
  const spSentences = splitSpSentences(spText);

  let pairs = [];
  let spIndex = 0;

  for (let t of tokSentences) {
    let tCount = wordCount(t);

    // grab at least one sp sentence
    let current = spSentences[spIndex] || "";
    let combined = current;
    let combinedCount = wordCount(combined);

    while (
      combinedCount < tCount * 0.6 && // allow fuzziness
      spIndex + 1 < spSentences.length
    ) {
      spIndex++;
      combined += " " + spSentences[spIndex];
      combinedCount = wordCount(combined);
    }

    pairs.push({ tok: t, sp: combined.trim() });
    spIndex++;
  }

  if (tokSentences.length !== pairs.length) {
    console.warn(
      `⚠️ Tok/SP mismatch: ${tokSentences.length} tok vs ${spSentences.length} sp`
    );
  }

  return pairs;
}

// --------------------
// COMBINED TRIPLE MATCHER
// --------------------
function pairTokEnSp(tokText, enText, spText) {
  const tokEnPairs = pairTokEn(tokText, enText);
  const tokSpPairs = pairTokSp(tokText, spText);

  let triples = tokEnPairs.map((pair, i) => ({
    tok: pair.tok,
    en: pair.en,
    sp: tokSpPairs[i] ? tokSpPairs[i].sp : ""
  }));

  return triples;

}




const fs = require("fs");
const path = require("path");

module.exports = function() {
  const baseDir = __dirname;
  const dirs = fs.readdirSync(baseDir).filter(d => fs.statSync(path.join(baseDir, d)).isDirectory());

  let allData = {};

  for (let dir of dirs) {
    const files = fs.readdirSync(path.join(baseDir, dir));
    let entry = {};

    for (let f of files) {
      if (f.endsWith(".md")) {
        const slug = f.replace(".md", "");
        entry[slug] = fs.readFileSync(path.join(baseDir, dir, f), "utf8");
      }
    }
    let triples = pairTokEnSp(entry["tok"], entry["en"], entry["sp"]);
    let [tokLines, enLines, spLines] = [
    triples.map(t => t.tok),
    triples.map(t => t.en),
    triples.map(t => t.sp)
    ];

    allData[dir] = {
      en: entry["en"] || "",
      sp: entry["sp"] || "",
      tok: entry["tok"] || "",
      enLines: enLines || "",
      spLines: spLines || "",
      tokLines: tokLines || "",
    };
    console.log(allData[dir]);
  }
return {
  eleventyComputed: {
    story: data => {
      // data.page.inputPath might be './test/test-1/index.md'
      const folderName = path.basename(path.dirname(data.page.inputPath));
      return allData[folderName] || {};
    }
  }
};

};
