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


    //used primarily for liliwc collection below
  eleventyConfig.addFilter("wordcount", (content) => {
    const wordCount = content
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    return wordCount;
  });


  //adds pagination data to a text type with no subpages
  //hubLink is the link that the starting text and ending text should link to, hubText defines the text for this link
  //currently only used for bite-sized pieces
  function sortByWordCount(toSort, hubLink, hubText) {
    function compareNumbers(a, b) {
      return a.data.wordcount - b.data.wordcount;
    }
    let sortThis = toSort;
    for (let entry of sortThis) {
      entry.data.wordcount = entry.data.story.tok.split(/\s+/)
        .filter((word) => word.length > 0).length;
    }
    sortThis.sort(compareNumbers);
    for (let i = 0; i < sortThis.length; i++) {
      let beforeText = "Previous";
      let nextText = "Next";
      let beforeLink = "";
      let nextLink = "";
      if (i == 0) {
        beforeLink = hubLink;
        beforeText = hubText;
      } else {
        beforeLink = sortThis[i - 1].url;
      }
      if (i == sortThis.length - 1) {
        nextLink = hubLink;
        nextText = hubText;
      } else {
        nextLink = sortThis[i + 1].url;
      }
      sortThis[i].data.beforeLink = beforeLink;
      sortThis[i].data.beforeText = beforeText;
      sortThis[i].data.nextText = nextText;
      sortThis[i].data.nextLink = nextLink;
    }
    return sortThis;
  }

  //this adds pagination data, titles and parentName to a collection with subpages, as well as giving mediaFiles (used to create the 'collage') and pageURLs (used for the sitemap) to the parent story
  //relies heavily on the stories and subpages being names properly
  //currently used for both wawa and suli
  function processPaginatedStory(tag, collectionsApi) {

    let stories = collectionsApi.getFilteredByTag(tag);
    let storyNumbers = []; //this will be sent to sortBySequence- simply grabs indices of all stories that require this tretment
    for (let story of stories) {
      let storynum = story.url.match(/\d+/g)[0];
      storyNumbers.push(storynum);
      // insert a function here to process extra data (media and child pages)

    }
    storyNumbers = storyNumbers.sort((a, b) => a - b);

    //for each of the stories
    for (let i = 0; i < storyNumbers.length; i++) {
      let pageURLs = [];
      let mediaFiles = [];

      //retrieve all the pages related to that story
      let filteredpages = collectionsApi.getFilteredByGlob('**/story-' + storyNumbers[i] + '/page-[0-9]/index.md');


      //for each of the pages
      for (let page of filteredpages) {
        pageURLs.push(page.url);
        mediaFiles.push(page.data.media);


        //typical Before and Next attributes

        let childIndex = page.url.match(/\d+/g)[1];

        let beforeText = "Previous Page"
        let beforeChild = parseInt(childIndex) - 1;
        let beforeParent = storyNumbers[i];

        let nextText = "Next Page";
        let nextChild = parseInt(childIndex) + 1;
        let nextParent = storyNumbers[i];

        let currentIndex = parseInt(childIndex);

        if (currentIndex == 1) {
          beforeText = "Previous Story";
          beforeChild = -1;
          if (i !== 0) {
            beforeParent = storyNumbers[i - 1];
          } else {
            beforeParent = storyNumbers[storyNumbers.length - 1];
          }
          stories[i].data.beforeStory = "/toki-pona/beginner-material/stories/story-" + beforeParent + "/";
        }
        if (currentIndex == filteredpages.length) {
          nextText = "Next Story";
          nextChild = -1;
          if (i !== storyNumbers.length - 1) {
            nextParent = storyNumbers[i + 1];
          } else {
            nextParent = storyNumbers[0];
          }
          stories[i].data.nextStory = "/toki-pona/beginner-material/stories/story-" + nextParent + "/";
        }
        page.data.title = "Page " + childIndex;
        page.data.parentName = stories[i].data.title;
        page.data.childIndex = childIndex;
        page.data.beforeText = beforeText;
        page.data.nextText = nextText;

        if (beforeChild == -1) {
          page.data.beforeLink = "/toki-pona/beginner-material/stories/story-" + beforeParent + "/";
        } else {
          page.data.beforeLink = "/toki-pona/beginner-material/stories/story-" + beforeParent + "/page-" + beforeChild + "/";
        }
        if (nextChild == -1) {
          page.data.nextLink = "/toki-pona/beginner-material/stories/story-" + nextParent + "/";
        } else {
          page.data.nextLink = "/toki-pona/beginner-material/stories/story-" + nextParent + "/page-" + nextChild + "/";
        }
      }

      stories[i].data.pageURLs = pageURLs.sort();
      stories[i].data.mediaFiles = mediaFiles.sort();
    }
  }

  eleventyConfig.addCollection("stories", async (collectionsApi) => {
    processPaginatedStory('suli', collectionsApi);
    processPaginatedStory('wawa', collectionsApi);
    return false;
  });



  // ensures that bite sized pieces can be sorted/sequenced by word count 
  eleventyConfig.addCollection("liliwc", async (collectionsApi) => {
    return sortByWordCount(collectionsApi.getFilteredByTag("lili"), "/toki-pona/beginner-material/lili/", "All Bite Sized");

  });

  //sets pagination data for all sequenced stories.






  ////////////////////FOR THE SITEMAP////////////////////
  //excludes everything from btext site in order to preserve a second site map
  eleventyConfig.addCollection("laksite", function (collectionApi) {
    let bsite = collectionApi.getFilteredByGlob("!**/beginner-material/**");
    return bsite;
  });

  //btextsite is intended to only get the 'information' pages in the beginner text site
  eleventyConfig.addCollection("btextsite", function (collectionApi) {
    let bsite = collectionApi.getFilteredByGlob("toki-pona/beginner-material/*");

    //"toki-pona/beginner-material/**/!({en,sp,tok}).{md,html}" (glob file that returns all beginner site pages) in the main directory (not nested in stories)
    return bsite;
  });

  eleventyConfig.addCollection("allstories", function (collectionApi) {
    let allstories = collectionApi.getFilteredByGlob(
      ['toki-pona/beginner-material/stories/story-[0-9]+/**{index.md,index.html}']);


    allstories = allstories.sort((a, b) => {
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

