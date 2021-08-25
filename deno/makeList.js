import { CSV } from "https://js.sabae.cc/CSV.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";

const data = await dir2array("..");
console.log(data);

const res = [];
for (const d of data) {
  if (!d.endsWith(".csv") || d.startsWith("deno/")) {
    continue;
  }
  const list = await CSV.fetch("../" + d);
  console.log(list[0]);
  const head = { csv: d };
  if (list[0][0] == "#LINK") {
    for (const l of list) {
      if (l[0] == null || l[0] == "" || l[0] == "#property") {
        break;
      }
      console.log(l[0])
      head[l[0].substring(1)] = l[1];
    }
  }
  //console.log(head);
  res.push(head);
}
await Deno.writeTextFile("opendata.csv", CSV.encode(CSV.fromJSON(res)));
