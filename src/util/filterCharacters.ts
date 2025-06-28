import characterNames from "./characterList";
import type { CharacterFromAoApi } from "../types/types";

export const filterAO20ApiResults = (
  charactersFromApi: Array<CharacterFromAoApi>
) => {
  return charactersFromApi.filter((char) =>
    characterNames.includes(char.character_name.toLowerCase())
  );
};
