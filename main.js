const wordcut = require("wordcut");
wordcut.init();

const header = d3.select("#header");
const motto = d3.select("#motto");
const t = motto.transition().duration(2000);

const start_year = 2558;
const mottos = {
  2558: "ความรู้ คู่คุณธรรม นำสู่อนาคต",
  2559: "เด็กดี หมั่นเพียร เรียนรู้ สู่อนาคต",
  2560: "เด็กไทย ใส่ใจศึกษา พาชาติมั่นคง",
  2561: "รู้คิด รู้เท่าทัน สร้างสรรค์เทคโนโลยี",
  2562: "เด็ก เยาวชน จิตอาสา ร่วมพัฒนาชาติ",
  2563: "เด็กไทยยุคใหม่ รู้รักสามัคคี รู้หน้าที่พลเมืองไทย",
}
let freqs = {};
for (let i = start_year; i < start_year + Object.keys(mottos).length; i++) {
  mottos[i] = wordcut.cut(mottos[i]).split("|");
  mottos[i].forEach(word => {
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
  let year = start_year + (counter % Object.keys(mottos).length);

  header.text(year);

  motto.selectAll(".word")
    .data(mottos[year], d => d)
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

setInterval(update, 5000);
