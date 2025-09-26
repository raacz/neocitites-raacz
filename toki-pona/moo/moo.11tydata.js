module.exports = {
  eleventyComputed: {
    tags: data => {
      return "moo";
    },
    permalink: data => {
      return false;
    },
        slug: function (data) {
      // `this.ctx` gives you access to filters, globals, etc.
      return this.slugify(data.title);
    }
  }
};