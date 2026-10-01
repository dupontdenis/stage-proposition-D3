// --- Analyse du DOM ---
const tags = [];

const explore = (el) => {
  for (const child of el.children) {
    tags.push(child.nodeName);
    explore(child);
  }
};

explore(document.body);

// --- Catégorisation ---
const categoriser = (rate) => {
  if (rate < 0.05) return "VeryRare";
  if (rate < 0.15) return "Rare";
  if (rate < 0.3) return "Medium";
  if (rate < 0.5) return "Frequent";
  return "Dominant";
};

const total = tags.length;
const occur = Object.groupBy(tags, (t) => t);

// --- Map propre ---
const tagMap = new Map();

for (const [tag, list] of Object.entries(occur)) {
  const count = list.length;
  const rate = count / total;

  tagMap.set(tag, {
    tag,
    count,
    rate,
    category: categoriser(rate),
  });
}

// Convertir en tableau pour D3
const data = [...tagMap.values()];

// --- Injection du titre juste après <body> ---
d3.select("body")
  .insert("h1", ":first-child")
  .attr("id", "tag-title")
  .text("Histogramme des occurrences des balises HTML");

// --- Injection du graphe juste après le titre ---
const container = d3
  .select("body")
  .insert("div", ":nth-child(2)")
  .attr("id", "tag-bars-vertical"); // ✔ aucun style inline

// --- D3 : groupes ---
const groups = container
  .selectAll("div")
  .data(data)
  .enter()
  .append("div")
  .style("position", "relative")
  .style("text-align", "center");

// --- Barres verticales ---
groups
  .append("div")
  .attr("class", "vbar")
  .attr("data-category", (d) => d.category)
  .attr("data-count", (d) => d.count);

// --- Hover ---
groups
  .append("span")
  .attr("class", "hover-count")
  .text((d) => d.count);

// --- Labels ---
groups
  .append("div")
  .attr("class", "vlabel")
  .text((d) => d.tag);
