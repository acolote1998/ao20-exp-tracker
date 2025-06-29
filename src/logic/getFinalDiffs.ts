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
  console.log("Chars from ranking obtained");

  const filteredCharsFromRanking: CharacterFromAoApi[] =
    filterAO20ApiResults(charsFromRanking);
  console.log("Results filtered according to name list");

  await deleteCharDataFromDbFromToday();
  console.log("Removing old data from today from DB");

  await insertDataToDb(filteredCharsFromRanking);
  console.log("Inserting new data for today to DB");

  const charsFromDBToday: CharacterDB[] | null =
    await getCharDataFromDbFromToday();
  console.log("Obtained data for today from DB");

  const charsFromDBYesterday: CharacterDB[] | null =
    await getCharDataFromDbFromYesterday();
  console.log("Obtained data for yesterday from DB");

  if (charsFromDBYesterday && charsFromDBToday) {
    console.log("Returning diffs array");
    return calculateDiffValuesVsYesterday(
      charsFromDBYesterday,
      charsFromDBToday
    );
  }
  console.log("Something went wrong");
  return null;
};
