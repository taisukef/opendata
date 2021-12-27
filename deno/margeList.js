import { CSV } from "https://js.sabae.cc/CSV.js";

const data1 = CSV.toJSON(await CSV.fetch("opendata_0.csv"));
const data2 = CSV.toJSON(await CSV.fetch("../opendata_echizen_city.csv"));

data2.forEach(d => {
  const d2 = data1.find(d2 => d.csv.indexOf(d2.csv) >= 0);
  if (!d2) {
    console.log(d);
    throw new Error("not found!")
  }
  delete d.csv;
  Object.assign(d, d2);
});
await Deno.writeTextFile("opendata.csv", CSV.stringify(data2));
