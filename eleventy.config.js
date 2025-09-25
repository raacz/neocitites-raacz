import YAML from "yaml";


export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");

    eleventyConfig.addPassthroughCopy("scripts");


    eleventyConfig.addFilter("slugify", function(str) {
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

  eleventyConfig.setTemplateFormats([
    "html",
    "liquid",
    "njk",
    "md",
    "json"
  ]);


  eleventyConfig.addFilter("postDate", (dateObj) => {
  return dateObj.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  });

eleventyConfig.addFilter("shortDate", (dateObj) => {
  const d = new Date(dateObj);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
});


	eleventyConfig.addDataExtension("yml", (contents) => YAML.parse(contents));


eleventyConfig.addFilter('sortByTitle', values => {
  return values.slice().sort((a, b) => a.data.title.localeCompare(b.data.title))
})


};

