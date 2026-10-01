// Analyse du DOM et génération du dataset pour D3

export function analyzeDOM() {
  // Récupère toutes les balises du DOM
  const tags = [...document.querySelectorAll("body *")].map((el) => el.tagName);

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

  return [...tagMap.values()];
}
