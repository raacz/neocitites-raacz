module.exports = {
  eleventyComputed: {
    title: data => {
      return "Review: " + data.book_title + " by " + data.author;
    },
    permalink: data => {
      return false;
    },
    slug: function (data) {
      // `this.ctx` gives you access to filters, globals, etc.
      return this.slugify(data.book_title);
    }
  }
};