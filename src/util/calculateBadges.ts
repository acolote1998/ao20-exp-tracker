import type { CharacterDiff } from "../types/types";
import { externalCharacters } from "./characterList.js";
export const calculateBadges = (chars: CharacterDiff[]) => {
  if (!chars.length) return;

  let most_kills = 0;
  let most_kills_name = chars[0].character_name;

  let best_kd = 0.01;
  let best_kd_name: string | null = null;

  let most_xp = 0;
  let most_xp_name = chars[0].character_name;

  let most_npcs = 0;
  let most_npcs_name = chars[0].character_name;

  chars.forEach((char) => {
    if (!externalCharacters.includes(char.character_name.toLocaleLowerCase())) {
      if (char.total_kills >= most_kills) {
        most_kills = char.total_kills;
        most_kills_name = char.character_name;
      }
      if (char.deaths === 0) {
        if (char.total_kills >= best_kd) {
          best_kd = char.total_kills;
          best_kd_name = char.character_name;
        }
      } else {
        const kd = char.total_kills / char.deaths;
        if (kd >= best_kd) {
          best_kd = kd;
          best_kd_name = char.character_name;
        }
      }
      if (char.exp >= most_xp) {
        most_xp = char.exp;
        most_xp_name = char.character_name;
      }
      if (char.killed_npcs >= most_npcs) {
        most_npcs = char.killed_npcs;
        most_npcs_name = char.character_name;
      }
    }
  });
  //   console.log(best_kd_name, "Best KD");
  //   console.log(most_kills_name, "Most Kills");
  //   console.log(most_npcs_name, "Most NPCs");
  //   console.log(most_xp_name, "Most XP");

  chars.forEach((char) => {
    if (!externalCharacters.includes(char.character_name.toLocaleLowerCase())) {
      if (char.character_name.toLowerCase() === most_kills_name.toLowerCase()) {
        char.most_kills = true;
      }
      if (char.character_name.toLowerCase() === most_npcs_name.toLowerCase()) {
        char.most_npcs = true;
      }
      if (char.character_name.toLowerCase() === most_xp_name.toLowerCase()) {
        char.most_xp = true;
      }
      if (
        best_kd_name &&
        char.character_name.toLowerCase() === best_kd_name.toLowerCase()
      ) {
        char.best_kd = true;
      }
    }
  });
};
