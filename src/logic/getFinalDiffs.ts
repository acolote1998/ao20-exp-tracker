import { getRankingFromAO20 } from "../ao-api/getRankingFromAO20";
import {
  deleteCharDataFromDbFromToday,
  getCharDataFromDbFromToday,
  getCharDataFromDbFromYesterday,
  insertDataToDb,
} from "../supabase-api/useSupabase";
import type {
  CharacterDiff,
  CharacterFromAoApi,
  CharacterDB,
} from "../types/types";
import { calculateDiffValuesVsYesterday } from "../util/calculateDiffValuesVsYesterday";
import { filterAO20ApiResults } from "../util/filterCharacters";

export const getFinalDiffs = async (): Promise<CharacterDiff[] | null> => {
  const charsFromRanking: CharacterFromAoApi[] = await getRankingFromAO20();
  const filteredCharsFromRanking: CharacterFromAoApi[] =
    filterAO20ApiResults(charsFromRanking);
  await deleteCharDataFromDbFromToday();
  await insertDataToDb(filteredCharsFromRanking);
  const charsFromDBToday: CharacterDB[] | null =
    await getCharDataFromDbFromToday();
  const charsFromDBYesterday: CharacterDB[] | null =
    await getCharDataFromDbFromYesterday();
  if (charsFromDBYesterday && charsFromDBToday) {
    return calculateDiffValuesVsYesterday(
      charsFromDBYesterday,
      charsFromDBToday
    );
  }
  console.log("Something went wrong");
  return null;
};
