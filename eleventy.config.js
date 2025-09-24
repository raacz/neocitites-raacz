import yaml from "yaml";


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
    "md"
  ]);


  eleventyConfig.addFilter("postDate", (dateObj) => {
  return dateObj.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  });
    
  eleventyConfig.addDataExtension("yml,yaml", (contents, filePath) => {
		return {};
	});



};

