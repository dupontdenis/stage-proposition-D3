// Affichage D3 : titre + histogramme vertical

export function renderHistogram(data) {
  // Titre
  d3.select("body")
    .insert("h1", ":first-child")
    .attr("id", "tag-title")
    .text("Histogramme des occurrences des balises HTML");

  // Conteneur du graphe
  const container = d3
    .select("body")
    .insert("div", ":nth-child(2)")
    .attr("id", "tag-bars-vertical");

  // Groupes
  const groups = container
    .selectAll("div")
    .data(data)
    .enter()
    .append("div")
    .style("position", "relative")
    .style("text-align", "center");

  // Barres
  groups
    .append("div")
    .attr("class", "vbar")
    .attr("data-category", (d) => d.category)
    .attr("data-count", (d) => d.count);

  // Hover
  groups
    .append("span")
    .attr("class", "hover-count")
    .text((d) => d.count);

  // Labels
  groups
    .append("div")
    .attr("class", "vlabel")
    .text((d) => d.tag);
}
