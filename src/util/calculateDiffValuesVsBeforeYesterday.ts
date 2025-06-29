import type { CharacterDB } from "../types/types";
export const calculateDiffValuesVsBeforeYesterday = (
  charsBeforeYesterday: CharacterDB[],
  charsYesterday: CharacterDB[]
) => {
  const namesBeforeYesterday = charsBeforeYesterday.map(
    (c) => c.character_name
  );
  const namesYesterday = charsYesterday.map((c) => c.character_name);

  const commonNames = namesBeforeYesterday.filter((name) =>
    namesYesterday.includes(name)
  );

  const filteredBeforeYesterday = charsBeforeYesterday.filter((c) =>
    commonNames.includes(c.character_name)
  );

  const filteredYesterday = charsYesterday.filter((c) =>
    commonNames.includes(c.character_name)
  );

  const diffArray = filteredYesterday.map((c) => {
    const y = filteredBeforeYesterday.find(
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
      level: c.level,
      levelDiff: c.level - (y?.level ?? 0), // always included
      race_name: c.race_name,
      total_kills: c.total_kills - (y?.total_kills ?? 0),
    };
  });
  return diffArray;
};
