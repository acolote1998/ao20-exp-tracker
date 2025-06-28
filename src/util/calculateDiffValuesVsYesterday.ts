import type { CharacterDB } from "../types/types";
const calculateDiffValuesVsYesterday = (
  charsYesterday: CharacterDB[],
  charsToday: CharacterDB[]
) => {
  const namesYesterday = charsYesterday.map((c) => c.character_name);
  const namesToday = charsToday.map((c) => c.character_name);

  const commonNames = namesYesterday.filter((name) =>
    namesToday.includes(name)
  );

  const filteredYesterday = charsYesterday.filter((c) =>
    commonNames.includes(c.character_name)
  );

  const filteredToday = charsToday.filter((c) =>
    commonNames.includes(c.character_name)
  );

  const diffArray: CharacterDB[] = filteredToday.map((c) => {
    const y = filteredYesterday.find(
      (char) => char.character_name === c.character_name
    );

    return {
      character_name: c.character_name,
      class_name: c.class_name,
      deaths: c.deaths - (y?.deaths ?? 0),
      exp: c.exp - (y?.exp ?? 0),
      exp_next_level: c.exp_next_level - (y?.exp_next_level ?? 0),
      exp_percentage: c.exp_percentage - (y?.exp_percentage ?? 0),
      killed_npcs: c.killed_npcs - (y?.killed_npcs ?? 0),
      level: c.level - (y?.level ?? 0),
      race_name: c.race_name,
      total_kills: c.total_kills - (y?.total_kills ?? 0),
    };
  });
  return {};
};
