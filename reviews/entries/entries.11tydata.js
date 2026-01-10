module.exports = {
  eleventyComputed: {
    title: data => {
      return data.book_title + " by " + data.author + " (Review)";
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