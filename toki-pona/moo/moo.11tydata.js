module.exports = {
  tags: "moo",
  permalink: false,
  eleventyComputed: {
    slug: function (data) {
      // `this.ctx` gives you access to filters, globals, etc.
      return this.slugify(data.title);
    }
  }
};