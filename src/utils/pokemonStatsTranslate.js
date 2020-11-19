export default function pokemonStatsTranslate(stats) {
  const dictionary = {
    hp: "Здр",
    attack: "Атк",
    defense: "Зщт",
    ["special-attack"]: "Сп-атк",
    ["special-defense"]: "Сп-зщт",
    speed: "Скр",
  };
  return stats.map((item) => {
    item.stat.name = dictionary[item.stat.name];
    return item;
  });
}
