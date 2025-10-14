import YAML from "yaml";

export default function (eleventyConfig) {



  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("toki-pona/beginner-material/assets");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addDataExtension("yml", (contents) => YAML.parse(contents));
  eleventyConfig.setTemplateFormats([
    "html",
    "liquid",
    "njk",
    "md",
    "json"
  ]);

  eleventyConfig.addFilter("slugify", function (str) {
    if (!str) return "";

    return str
      .toString()
      .normalize("NFD")                  // split accented characters
      .replace(/[\u0300-\u036f]/g, "")   // remove accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")      // remove invalid chars
      .replace(/\s+/g, "-")              // collapse whitespace into dash
      .replace(/-+/g, "-");              // collapse multiple dashes
  });

  //used primarily for liliwc collection below
  eleventyConfig.addFilter("wordcount", (content) => {
    const wordCount = content
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    return wordCount;
  });

  //filters a date to appear as March 16, 2020
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return dateObj.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  //filters a date to appear as 2020-20-20
  eleventyConfig.addFilter("shortDate", (dateObj) => {
    const d = new Date(dateObj);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  // ensures that bite sized pieces can be sorted/sequenced by word count 
  eleventyConfig.addCollection("liliwc", async (collectionsApi) => {
    function compareNumbers(a, b) {
      return a.data.wordcount - b.data.wordcount;
    }
    const lilicol = collectionsApi.getFilteredByTag("lili");
    for (let lili of lilicol) {
      lili.data.wordcount = lili.data.story.tok.split(/\s+/)
        .filter((word) => word.length > 0).length;
    }
    lilicol.sort(compareNumbers);
    for (let i = 0; i < lilicol.length; i++) {
      let beforeText = "Previous";
      let nextText = "Next";
      let beforeLink = "";
      let nextLink = "";
      if (i == 0) {
        beforeLink = "/toki-pona/beginner-material/lili/";
        beforeText = "All Bite Sized";
      } else {
        beforeLink = lilicol[i - 1].url;
      }
      if (i == lilicol.length - 1) {
        nextLink = "/toki-pona/beginner-material/lili/";
        nextText = "All Bite Sized";

      } else {
        nextLink = lilicol[i + 1].url;
      }
      lilicol[i].data.beforeLink = beforeLink;
      lilicol[i].data.beforeText = beforeText;
      lilicol[i].data.nextText = nextText;
      lilicol[i].data.nextLink = nextLink;
    }
    return lilicol;
  });

  //ensures that all theme stories are lumped in a box with their pages sorted so they can be shuffled through
  eleventyConfig.addCollection("stories", function (collectionApi) {
    let pages = collectionApi.getFilteredByGlob('**/story-[0-9][0-9]/page-[0-9]/index.md');
    let stories = new Set(); //ensures unique values
    for (let story of pages) {

      //page num used for title and child index
      let pagenum = story.fileSlug.match(/\d+/g)[0];

      story.data.title = "Page " + pagenum;
      story.data.childIndex = pagenum;

      //story # used for parent index
      let storynum = story.url.match(/\d+/g)[0];

      story.data.parentIndex = storynum; // reads the first number in the url
      stories.add(storynum);
    }
    //ensure set numbers are ordered
    const parentindices = Array.from(stories); parentindices.sort((a, b) => a - b);
    for (let i = 0; i < parentindices.length; i++) {
      let filteredpages = pages.filter((page) => page.data.parentIndex == parentindices[i]);
      for (let page of filteredpages) {
        page.data.beforeText = "Previous Page";
        let beforeChild = parseInt(page.data.childIndex) - 1;
        let beforeParent = parentindices[i];
        page.data.nextText = "Next Page";
        let nextChild = parseInt(page.data.childIndex) + 1;
        let nextParent = parentindices[i];
        let ci = parseInt(page.data.childIndex);
        if (ci == 1) {
          page.data.beforeText = "Previous Story";
          beforeChild = 1;
          if (i !== 0) {
            beforeParent = parentindices[i - 1];
          } else {
            beforeParent = parentindices[parentindices.length - 1];
          }
        }
        if (ci == filteredpages.length) {
          page.data.nextText = "Next Story";
          nextChild = 1;
          if (i !== parentindices.length - 1) {
            nextParent = parentindices[i + 1];
          } else {
            nextParent = parentindices[0];
          }
        }
        page.data.beforeLink = "/toki-pona/beginner-material/stories/story-" + beforeParent + "/page-" + beforeChild + "/";
        page.data.nextLink = "/toki-pona/beginner-material/stories/story-" + nextParent + "/page-" + nextChild + "/";
      }
    }
    return pages;
  });


  //excludes everything from btext site in order to preserve a second site map
  eleventyConfig.addCollection("laksite", function (collectionApi) {
    let bsite = collectionApi.getFilteredByGlob("!**/beginner-material/**");
    return bsite;
  });

  //btextsite is intended to only get the 'information' pages in the beginner text site
  eleventyConfig.addCollection("btextsite", function (collectionApi) {
    let bsite = collectionApi.getFilteredByGlob("toki-pona/beginner-material/*");

    //"toki-pona/beginner-material/**/!({en,sp,tok}).{md,html}" (glob file that returns all beginner site pages)


    return bsite;
  });

  eleventyConfig.addCollection("allstories", function (collectionApi) {
    let allstories = collectionApi.getFilteredByGlob(
      ['toki-pona/beginner-material/stories/story-[0-9]+/**{index.md,index.html}']);


    allstories =  allstories.sort((a, b) => {
      let nanpaA = a.url.match(/\d+/g).map(Number);
      let nanpaB = b.url.match(/\d+/g).map(Number);
      if (nanpaA[0] < nanpaB[0]) return -1;
      if (nanpaA[0] > nanpaB[0]) return 1;
      if (nanpaA[1] === undefined) return -1;
      if (nanpaB[1] === undefined) return 1;
      if (nanpaA[1] < nanpaB[1]) return -1;
      if (nanpaA[1] > nanpaB[1]) return 1;
      return 0;
    });
    

    return allstories;
  });
};

