module.exports = {
  tags: "asl",
  permalink: false,
  layout: "_layouts/post.html",
  eleventyComputed: {
    vocab: function (data) {
      if (data.processedVocab == false) {
      } else {
        let date = "error";
        let vocab = [];
        let active = false;
        for (let token of data.page.rawInput.split("\n")) {
          if (token === "#### Vocab") {
            active = true;
            const d = new Date(data.date);
            const year = d.getUTCFullYear();      // Use UTC methods
            const month = String(d.getUTCMonth() + 1).padStart(2, "0");
            const day = String(d.getUTCDate()).padStart(2, "0");
            date = `${year}-${month}`;
            console.log(date);
            //date = data.date.slice(0, 7);
            //console.log(date);
          } else if (active == true) {
            if (token === "") {
              active = false;
            }
            else {
              let string = token;
              let pair = {
                word: string.slice(1).trim(),
                date: date,
              }
              vocab.push(pair);

            }
          }
        }
        return vocab;
      }
    },
    processedVocab: function () {
      return true;
    }
  }
};