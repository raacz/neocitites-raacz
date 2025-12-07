// Revised matcher: paragraph-aligned, tok-driven (never drop tok/en lines)

function splitParagraphs(text) {
  if (!text) return [];
  return text
    .replace(/\r/g, "")                 // normalize CRLF
    .replace(/\n[ \t]*\n/g, "\n\n")     // collapse whitespace-only lines into paragraph breaks
    .split(/\n{2,}/)                    // split on 2+ newlines
    .map(p => p.trim())
    .filter(p => p.length > 0);         // remove empty paragraphs
}


// Sentence splitter that respects double quotes and curly single quotes (‘ ’ and “ ”)
// NOTE: ASCII apostrophe (') is NOT treated as a quote marker (so contractions are safe).
/*function splitSentencesRespectQuotes(paragraph) {
  if (!paragraph) return [];

  const doubleQuoteChars = new Set(['"', '\u201C', '\u201D']); // " and curly double
  /*const singleQuoteChars = new Set(['\u2018', '\u2019']);      // ‘ ’ (curly single)

  let sentences = [];
  let buf = '';
  let inDouble = false;

  for (let i = 0; i < paragraph.length; i++) {
    const ch = paragraph[i];
    buf += ch;

    if (doubleQuoteChars.has(ch)) {
      inDouble = !inDouble;
      continue;
    }

    // Only split on sentence punctuation if we're not inside any quote
    if (!inDouble && (ch === '.' || ch === '!' || ch === '?')) {
      // consume any following punctuation/closing quotes/closing parens
      let j = i + 1;
      while (j < paragraph.length && /[.!?'"”’)\]]/.test(paragraph[j])) {
        buf += paragraph[j];
        // toggle quote states if we see curly/double closers inside the run
        if (doubleQuoteChars.has(paragraph[j])) inDouble = !inDouble;
        j++;
      }
      i = j - 1;
      sentences.push(buf.trim());
      buf = '';
    }
  }

  if (buf.trim()) sentences.push(buf.trim());
  return sentences;
}*/

// Revamped version by Claude, Sentence splitter that breaks on sentence-ending punctuation even inside quotes
// NOTE: ASCII apostrophe (') is NOT treated as a quote marker (so contractions are safe).
function splitSentencesRespectQuotes(paragraph) {
  if (!paragraph) return [];

  const doubleQuoteChars = new Set(['"', '\u201C', '\u201D']); // " and curly double

  let sentences = [];
  let buf = '';
  let inDouble = false;

  for (let i = 0; i < paragraph.length; i++) {
    const ch = paragraph[i];
    buf += ch;

    if (doubleQuoteChars.has(ch)) {
      inDouble = !inDouble;
      continue;
    }

    // Split on sentence punctuation regardless of quote state
    if (ch === '.' || ch === '!' || ch === '?' || ch === '。') {
      // consume any following punctuation/closing quotes/closing parens
      let j = i + 1;
      while (j < paragraph.length && /[.!?'""')\]]/.test(paragraph[j])) {
        buf += paragraph[j];
        // toggle quote states if we see curly/double closers inside the run
        if (doubleQuoteChars.has(paragraph[j])) inDouble = !inDouble;
        j++;
      }
      i = j - 1;
      sentences.push(buf.trim());
      buf = '';
    }
  }

  if (buf.trim()) sentences.push(buf.trim());
  return sentences;
}

// SP splitter: paragraphs -> split on single newline (line breaks)
function splitSpFragments(paragraph) {
  if (!paragraph) return [];
  return paragraph
    .split(/\n/)
    .map(s => s.trim())
    .filter(Boolean);
}

// Word-count helper that ignores 'zz' and tokens that are only ligature punctuation.
// Strips leading/trailing punctuation for counting but preserves square-bracket groups.
function wordCount(str) {
  if (!str) return 0;

  // First, replace bracketed content with a placeholder token
  const normalized = str.replace(/\[[^\]]+\]/g, 'BRACKET');

  return normalized
    .split(/[\s+\-]+/) // split on whitespace, +, or -
    .map(tok => tok.replace(/^[^A-Za-z0-9\[]+|[^A-Za-z0-9\]]+$/g, '')) // trim punctuation except []
    .filter(Boolean)
    .filter(tok => {
      const lower = tok.toLowerCase();
      if (lower === 'zz') return false; // ignore zz entirely
      if (/^[\^+\-\[\]]+$/.test(tok)) return false; // ignore pure ligature tokens
      return true;
    }).length;
}
// Merge fragments so that for each base sentence we produce one merged fragment.
// Always returns an array with the same length as baseSents. If fragments run out,
// remaining base items get empty strings. Any leftover fragments after filling
// all baseSents are appended to the last result (to avoid dropping them).
/*function pairByWordCount(baseSents, frags, options = {}) {
  const threshold = options.threshold ?? 0.8;
  const overshoot = options.overshoot ?? 1.6;
  const pairs = [];
  let fragIndex = 0;

  for (let b = 0; b < baseSents.length; b++) {
    const base = baseSents[b] || '';
    const baseCount = Math.max(1, wordCount(base)); // avoid zero denominator

    if (fragIndex >= frags.length) {
      // no fragments left — produce empty string for this base sentence
      pairs.push('');
      continue;
    }

    // start with current fragment
    let combined = frags[fragIndex] || '';
    let combinedCount = wordCount(combined);
    console.log(combined, combinedCount);
 
    // Merge until we reach threshold or run out
    while (combinedCount < baseCount * threshold && fragIndex + 1 < frags.length) {
      fragIndex++;
      combined = (combined ? (combined + ' ') : '') + ("<br>"+frags[fragIndex] || '');
      combinedCount = wordCount(combined);
      if (combinedCount > baseCount * overshoot) break; // avoid runaway overshoot
    }

    pairs.push(combined.trim());
    fragIndex++;
  }

  // If fragments remain, append them to the last pair (do not drop them)
  if (fragIndex < frags.length) {
    const tail = frags.slice(fragIndex).join(' ');
    if (pairs.length === 0) {
      pairs.push(tail.trim());
    } else {
      pairs[pairs.length - 1] = ((pairs[pairs.length - 1] || '') + ' ' + "<br>"+tail).trim();
    }
  }

  return pairs;
}*/

function pairByWordCount(baseSents, frags, options = {}) {
  const overshoot = options.overshoot ?? 1.6;
  const undershoot = options.undershoot ?? 0.9; // Add undershoot parameter
  const pairs = [];
  let fragIndex = 0;

  // Helper to normalize words for matching (a=aaa, n=nnn)
  function normalizeWord(word) {
    if (!word) return null;
    const lower = word.toLowerCase();
    // Normalize repeated a's to single 'a'
    if (/^a+$/.test(lower)) return 'a';
    // Normalize repeated n's to single 'n'
    if (/^n+$/.test(lower)) return 'n';
    return lower;
  }

  // Helper to get first/last meaningful word
  function getFirstWord(str) {
    if (!str) return null;
    const words = str
      .split(/[\s+\-]+/)
      .map(tok => tok.replace(/^[^A-Za-z0-9\[]+|[^A-Za-z0-9\]]+$/g, ''))
      .filter(Boolean)
      .filter(tok => {
        const lower = tok.toLowerCase();
        if (lower === 'zz' || lower === 'te' || lower === 'to') return false;
        if (/^[\^+\-\[\]]+$/.test(tok)) return false;
        return true;
      });
    return words.length > 0 ? normalizeWord(words[0]) : null;
  }

  function getLastWord(str) {
    if (!str) return null;
    const words = str
      .split(/[\s+\-]+/)
      .map(tok => tok.replace(/^[^A-Za-z0-9\[]+|[^A-Za-z0-9\]]+$/g, ''))
      .filter(Boolean)
      .filter(tok => {
        const lower = tok.toLowerCase();
        if (lower === 'zz' || lower === 'te' || lower === 'to') return false;
        if (/^[\^+\-\[\]]+$/.test(tok)) return false;
        return true;
      });
    if (words.length === 0) return null;
    const lastWord = words[words.length - 1];
    return {
      word: normalizeWord(lastWord),
      isCapitalized: /^[A-Z]/.test(lastWord)
    };
  }

  // Check if string contains any bracketed group [...]
  function hasBracketedGroup(str) {
    if (!str) return false;
    return /\[/.test(str);
  }

  for (let b = 0; b < baseSents.length; b++) {
    const base = baseSents[b] || '';
    const baseFirstWord = getFirstWord(base);
    const baseLastWordObj = getLastWord(base);
    const baseCount = Math.max(1, wordCount(base));

    if (fragIndex >= frags.length) {
      // no fragments left — produce empty string for this base sentence
      //console.warn(`Warning: Ran out of fragments at base sentence ${b}. Remaining base sentences: ${baseSents.length - b} \n${baseSents}`);
      pairs.push('');
      continue;
    }

    // start with current fragment
    let combined = frags[fragIndex] || '';

    // Merge until first and last words match the base
    while (fragIndex + 1 < frags.length) {
      const currentFirstWord = getFirstWord(combined);
      const currentLastWordObj = getLastWord(combined);
      const combinedCount = wordCount(combined);

      let firstMatches = currentFirstWord === baseFirstWord;
      let lastMatches = false;

      if (baseLastWordObj.isCapitalized) {
        // If base last word is capitalized, match any bracketed group in combined
        lastMatches = hasBracketedGroup(combined);
      } else {
        // Normal matching - last word must match
        lastMatches = currentLastWordObj && currentLastWordObj.word === baseLastWordObj.word;
      }

      // Check if we've matched both first and last words
      if (firstMatches && lastMatches) {
        // Check undershoot protection - don't accept if too short
        if (combinedCount >= baseCount * undershoot) {
          break;
        }
        // If undershooting, continue merging
      }

      // Check overshoot protection
      if (combinedCount > baseCount * overshoot) break;

      fragIndex++;
      combined = (combined ? (combined + ' ') : '') + ("<br>" + frags[fragIndex] || '');
    }

    pairs.push(combined.trim());
    fragIndex++;
  }

  // If fragments remain, append them to the last pair (do not drop them)
  if (fragIndex < frags.length) {
    const tail = frags.slice(fragIndex).join(' ');
    if (pairs.length === 0) {
      pairs.push(tail.trim());
    } else {
      pairs[pairs.length - 1] = ((pairs[pairs.length - 1] || '') + ' ' + "<br>" + tail).trim();
    }
  }

  return pairs;
}

/**
 * High-level: paragraph-aligned triple matcher.
 * - Uses tok paragraph count as authoritative (tok/en must not be chopped).
 * - If en or sp have fewer paragraphs, uses empty string / empty fragments.
 *
 * Returns: array of { tok, en, sp } in order (one object per tok sentence).
 */
function pairTokEnSpByParagraph(tokText, enText, spText) {
  const tokPars = splitParagraphs(tokText);
  const enPars = splitParagraphs(enText);
  const spPars = splitParagraphs(spText);

  if (tokPars.length !== enPars.length || tokPars.length !== spPars.length) {
    /*console.warn(
      `⚠️ Paragraph-count mismatch (tok=${tokPars.length}, en=${enPars.length}, sp=${spPars.length}) ${tokPars}`
    );*/

  }

  const triples = [];

  // iterate over paragraphs (using tok count as anchor)
  const spFlat = [];
  for (let pi = 0; pi < tokPars.length; pi++) {
    const tokPara = tokPars[pi] || "";
    const enPara = enPars[pi] || "";
    const spPara = spPars[pi] || "";

    // step 1: sentence-level pairing tok ↔ en
    const tokSents = splitSentencesRespectQuotes(tokPara);
    const enSents = splitSentencesRespectQuotes(enPara);
    /* debug sentence fragments
    console.log(pi+":")
    console.log(tokSents);
    console.log(enSents);
    */


    let tokEnPairs = [];
    let sentCount = Math.max(tokSents.length, enSents.length);
    for (let si = 0; si < sentCount; si++) {
      tokEnPairs.push({
        tok: tokSents[si] || "",
        en: enSents[si] || "",
        sp: "" // fill later
      });
    }


    // step 2: merge SP fragments into the existing tokEnPairs
    const spFrags = splitSpFragments(spPara);

    const spMerged = pairByWordCount(tokSents, spFrags, { threshold: 0.7, overshoot: 1.8 });
    spFlat.push(spMerged);



    // assign sp into the same indexes as tok/en
    for (let si = 0; si < tokEnPairs.length; si++) {
      tokEnPairs[si].sp = spMerged[si] || "";
      triples.push(tokEnPairs[si]);
    }

    // warning if sp doesn’t align
    if (tokEnPairs.length !== spMerged.length) {
      console.warn(`⚠️ Tok/SP mismatch in paragraph ${pi}: tokEnPairs=${tokEnPairs.length}, spMerged=${spMerged.length}`);
    }

  }
  const bundle = {
    triples: triples,
    spFlattened: spFlat,
  }
  return bundle;



}

//--------------------------------------------------------------------------//
// ^ NI LI IJO WAN
// v ni li IJO ANTE
// ona li TU. pali anpa li kepeken ilo sewi

const fs = require("fs");
const path = require("path");

module.exports = function () {
  /*let dirs = fs.globSync('*en.md', { cwd: baseDir });
  dirs = dirs.map(en_md => path.dirname(en_md));
  dirs = dirs.filter(dir => path.basename(dir) !== "story-x");

  let allData = {};

  for (let dir of dirs) {
                  let hi = path.join(baseDir, dir);


  }*/



  return {
    eleventyComputed: {
      story: data => {
        if ((data.tags !== undefined && data.page.inputPath !== undefined) && !data.tags.includes("dnp")) {
          for (let tag of data.tags) {
            //list all tags that need to be multilingually processed here
            //using the tag file means only index.md will be caught for each
            let dir = path.join(data.eleventy.env.root, path.normalize(data.page.inputPath));
            dir = dir.replace("index.md", "");
            if ((tag === "lili" || tag === "sequence")) {

              //this grabs the root name from eleventy.env.root
              // eg) /home/lakuse/VSCodium/new-neocities/
              // and merges it with the input path
              // eg) ./toki-pona/beginner-material/stories/story-29/page-5/index.md
              // normalizing it ensures it merges properly 
              // eg) toki-pona/beginner-material/stories/story-29/page-5/index.md

              //below grabs all multilngual files of this dir and merges them 
              const files = fs.readdirSync(dir);

              let entry = {};

              for (let f of files) {
                if (f.endsWith(".md")) {
                  const slug = f.replace(".md", "");
                  entry[slug] = fs.readFileSync(path.join(dir, f), "utf8");
                }
              }
              let bundle = pairTokEnSpByParagraph(entry["tok"], entry["en"], entry["sp"]);
              let [tokLines, enLines, spLines] = [
                bundle.triples.map(t => t.tok),
                bundle.triples.map(t => t.en),
                bundle.triples.map(t => t.sp)
              ];
              const allData = {
                en: entry["en"] || "",
                sp: entry["sp"] || "",
                tok: entry["tok"] || "",
                enLines: enLines || "",
                spLines: spLines || "",
                tokLines: tokLines || "",
                spFlattened: bundle.spFlattened,
              };
              return allData;
            }
            else {
              return null;
            }
          }
        }
      },
      genre: data => {
        if (data.media) {
          //if (!data.alt && !data.eleventyExcludeFromCollections) {
            //console.warn("No alt text for " + data.title + ", " + data.page.url);

          //}
          const match = data.media.match(/\/([^\/]+)-[a-zA-Z0-9]+\.jpg$/);
          return match ? match[1] : 'nomedia';


        } else {
          return 'nomedia';
        }
      }
    }
  };
};

/*
// ---------- Quick test (if run directly) ----------
if (require.main === module) {
  const tok = `mi wile e kala e kasi ala e waso ala.\n\nmi moku.`;
  const en = `I want fish and no tree and no bird.\n\nI eat.`;
  const sp = `mi wile e kala\nzz zz e pan suwi\nzz zz e kasi ala\nzz zz e waso ala\n\nmi moku\n`;

  console.log(JSON.stringify(pairTokEnSpByParagraph(tok, en, sp), null, 2));
}*/


