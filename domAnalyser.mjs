// Analyse du DOM et génération du dataset pour D3

export function analyzeDOM() {
  const tags = [];

  const explore = (el) => {
    for (const child of el.children) {
      tags.push(child.nodeName);
      explore(child);
    }
  };

  explore(document.body);

  const categoriser = (rate) => {
    if (rate < 0.05) return "VeryRare";
    if (rate < 0.15) return "Rare";
    if (rate < 0.3) return "Medium";
    if (rate < 0.5) return "Frequent";
    return "Dominant";
  };

  const total = tags.length;
  const occur = Object.groupBy(tags, (t) => t);

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

  return [...tagMap.values()]; // dataset final pour D3
}
