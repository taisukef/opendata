import HTMLParser from "https://dev.jspm.io/node-html-parser";
import { CSV } from "https://js.sabae.cc/CSV.js";

const fetchHTML = async () => {
  const url = "http://www.city.echizen.lg.jp/office/010/021/open-data-echizen.html";
  const txt = await (await fetch(url)).text();
  await Deno.writeTextFile("index.html", txt);
  console.log(txt);  
};
// await fetchHTML();

const txt = await Deno.readTextFile("index.html");
const dom = HTMLParser.parse(txt);
const tables = dom.querySelectorAll("table");
console.log(tables.length);

const data = [];
for (const table of tables) {
  const trs = table.querySelectorAll("tr");
  for (const tr of trs) {
    const tds = tr.querySelectorAll("td");
    if (tds.length == 0) {
      continue;
    }
    const data1 = tds.map(td => {
      /*
      const a = td.querySelector("a");
      */
      return td.text;
    });
    data.push(data1);
    console.log(data1);
  }
}
await Deno.writeTextFile("scraped.csv", CSV.encode(data));
console.log(data.length);
