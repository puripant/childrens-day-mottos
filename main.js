const wordcut = require("wordcut");
wordcut.init();

const header = d3.select("#header");
const motto = d3.select("#motto");

d3.csv("data.csv").then(data => {
  // let freqs = {};
  for (let i = 0; i < data.length; i++) {
    data[i].words = wordcut.cut(data[i].motto).split("|");
    // data[i].words.forEach(word => {
    //   if (freqs.hasOwnProperty(word)) {
    //     freqs[word]++;
    //   } else {
    //     freqs[word] = 1;
    //   }
    // });
  }
  // console.log(freqs);

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
          .text(d => d)
          .style("color", "rgb(235, 48, 124)")
          .style("opacity", 0)
          .style("letter-spacing", "-5em")
          .call(enter => enter.transition().duration(2000).delay(500)
            .style("opacity", 1)
            .style("letter-spacing", "0")
          ),
        update => update
          .call(update => update.transition().duration(1000)
            .style("color", "black")
          ),
        exit => exit
          .call(exit => exit.transition().duration(1000)
            .style("opacity", 0)
            .style("letter-spacing", "-1em")
            .remove()
          )
      );

    counter++;
  }

  update();
  setInterval(update, 5000);
});
