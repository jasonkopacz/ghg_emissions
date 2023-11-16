import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`# Greenhouse Gas Emissions Per State #
### In Billions of Tons ###`
)}

function _2(md){return(
md`Data is taken from the [EPA's Greenhouse gas emissions query builder](https://enviro.epa.gov/query-builder/ghg)

Hover to display the state name and emission amount`
)}

function _chart(d3,topojson,us,sortedMap,Legend,valuemap,textmap)
{
  const path = d3.geoPath();
  const format = d => `${d}%`;
  
  const states = topojson.feature(us, us.objects.states);
  const statemap = new Map(states.features.map(d => [d.id, d]));
  const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);

  const namemap = new Map(us.objects.states.geometries.map(d => [d.properties.name, d.id]))
  
  const minScale = (sortedMap[sortedMap.length - 1][1]).toFixed(5);
  // const maxScale = (sortedMap[0][1]).toFixed(5);
  const maxScale = 3
  
  const color = d3.scaleQuantize([minScale, maxScale], d3.schemeGreens[9]);
  

  const svg = d3.create("svg")
      .attr("width", 975)
      .attr("height", 610)
      .attr("viewBox", [0, 0, 975, 610])
      .attr("style", "max-width: 100%; height: auto;");

  svg.append("g")
      .attr("transform", "translate(610,20)")
      .append(() => Legend(d3.scaleSequential([0, 7], d3.interpolateGreens), {title: "Greenhouse Gas Emissions (billion tons)", width: 260}));

  svg.append("g")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .join("path")
      .attr("fill", d => color(valuemap.get(d.properties.name)))
      .attr("d", path)
    .append("title")
      .text(d => `${d.properties.name}\n${textmap.get(d.properties.name)} tons`)
      

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-linejoin", "round")
      .attr("d", path);

  return svg.node();
}


function _4(md){return(
md`This dataset regrettably doesn’t include FIPS numeric identifiers for states; it only has state names. This map lets us look up the FIPS code for a state by name.`
)}

function _namemap(us){return(
new Map(us.objects.states.geometries.map(d => [d.properties.name, d.id]))
)}

function _6(md){return(
md`The TopoJSON file below contains shapes and properties for all U.S. States, pre-projected with the Albers USA to a bounding box of 975&times;610 pixels.`
)}

function _us(FileAttachment){return(
FileAttachment("counties-albers-10m.json").json()
)}

function _9(md){return(
md`Alternatively, use [Observable Plot](https://observablehq.com/plot)’s concise API to create [maps](https://observablehq.com/@observablehq/plot-mapping) with the [geo mark](https://observablehq.com/plot/marks/geo). Again, we index the data for faster access:`
)}

function _emissions(FileAttachment){return(
FileAttachment("ghg - stateEmissions.csv").csv({typed: true})
)}

function _valuemap(emissions){return(
new Map(emissions.map(d => [d.State, d.Emissions.replaceAll(",", "") / 1000000000]))
)}

function _textmap(emissions){return(
new Map(emissions.map(d => [d.State, d.Emissions]))
)}

function _sortedMap(d3,valuemap){return(
d3.sort(valuemap, (a, b) => d3.ascending(a.value, b.value))
)}

function _minScale(sortedMap){return(
parseFloat((sortedMap[sortedMap.length - 1][1]).toFixed(5))
)}

function _maxScale(sortedMap){return(
parseFloat((sortedMap[0][1]).toFixed(5))
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["counties-albers-10m.json", {url: new URL("./files/1ec3edc43ba66c0db419744c479d1b5118bb405587189f3ad739a10853f6f933d86824e809f4b4ad18053ab33fb5dc7c5f3d6bc601654c8ea976afd5b321f517.json", import.meta.url), mimeType: "application/json", toString}],
    ["ghg - stateEmissions.csv", {url: new URL("./files/c3e53e6c82a83a29e25b52ec02d32e1c234a7690103e64f2e192b5c1116e6cf438c8131c782752c5013f789198b5d5790f993fe393d91922f16147effc8d96f2.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("chart")).define("chart", ["d3","topojson","us","sortedMap","Legend","valuemap","textmap"], _chart);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("namemap")).define("namemap", ["us"], _namemap);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("us")).define("us", ["FileAttachment"], _us);
  const child1 = runtime.module(define1);
  main.import("Legend", child1);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("emissions")).define("emissions", ["FileAttachment"], _emissions);
  main.variable(observer("valuemap")).define("valuemap", ["emissions"], _valuemap);
  main.variable(observer("textmap")).define("textmap", ["emissions"], _textmap);
  main.variable(observer("sortedMap")).define("sortedMap", ["d3","valuemap"], _sortedMap);
  main.variable(observer("minScale")).define("minScale", ["sortedMap"], _minScale);
  main.variable(observer("maxScale")).define("maxScale", ["sortedMap"], _maxScale);
  return main;
}
