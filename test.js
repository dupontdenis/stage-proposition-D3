const films = [
  { titre: "Inception", genre: "SF", note: 9, annee: 2010 },
  { titre: "Titanic", genre: "Romance", note: 8, annee: 1997 },
  { titre: "Interstellar", genre: "SF", note: 10, annee: 2014 },
  { titre: "Le Roi Lion", genre: "Animation", note: 9, annee: 1994 },
  { titre: "Avatar", genre: "SF", note: 7, annee: 2009 },
  { titre: "Gladiator", genre: "Action", note: 8, annee: 2000 },
  { titre: "Matrix", genre: "SF", note: 9, annee: 1999 },
  { titre: "Blade Runner 2049", genre: "SF", note: 8, annee: 2017 },
  { titre: "La La Land", genre: "Romance", note: 8, annee: 2016 },
  { titre: "Shrek", genre: "Animation", note: 8, annee: 2001 },
  { titre: "Dune", genre: "SF", note: 8, annee: 2021 },
  { titre: "Forrest Gump", genre: "Romance", note: 10, annee: 1994 },
  { titre: "Mad Max: Fury Road", genre: "Action", note: 9, annee: 2015 },
  { titre: "Seven", genre: "Thriller", note: 9, annee: 1995 },
];

const categoriser = (rate) => {
  if (rate <= 0.072) return "VeryRare"; // 1 / 15
  if (rate <= 0.15) return "Rare"; // 2 / 15
  if (rate <= 0.25) return "Medium"; // 3–4 / 15
  if (rate <= 0.35) return "Frequent"; // 5 / 15
  return "Dominant"; // 6+ / 15
};

function analyzeByKey(items, key) {
  const total = items.length;

  const occur = Object.groupBy(items, (item) => item[key]);

  const map = new Map();

  for (const [value, list] of Object.entries(occur)) {
    const count = list.length;
    const rate = Number((count / total).toFixed(4));

    map.set(value, {
      value,
      count,
      rate,
      category: categoriser(rate),
      items: list,
    });
  }

  return [...map.values()];
}

const data = analyzeByKey(films, "genre");
console.log(data);
