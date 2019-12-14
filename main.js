const wordcut = require("wordcut");
wordcut.init();

const header = d3.select("#header");
const motto = d3.select("#motto");
const t = motto.transition().duration(2000);

d3.csv("data.csv").then(data => {
  let freqs = {};
  for (let i = 0; i < data.length; i++) {
    data[i].words = wordcut.cut(data[i].motto).split("|");
    data[i].words.forEach(word => {
      if (freqs.hasOwnProperty(word)) {
        freqs[word]++;
      } else {
        freqs[word] = 1;
      }
    });
  }
  console.log(freqs);

  let counter = 0;
  let update = () => {
    let datum = data[counter % data.length];

    header.select(".year").text(datum.year);
    header.select(".pm").text(datum.pm);

    motto.selectAll(".word")
      .data(datum.words, d => d)
      .join(
        enter => enter.append("span")
          .classed("word", true)
          .classed("new", true)
          .text(d => d),
          // .call(enter => enter.transition(t).attr("y", 0)),
        update => update
          .classed("new", false),
          // .call(update => update.transition(t).attr("x", (d, i) => i * 16)),
        exit => exit
          .classed("old", true)
          .remove()
          // .call(exit => exit.transition(t).style("opacity", 0).remove())
      );

    counter++;
  }

  update();
  setInterval(update, 5000);
});
