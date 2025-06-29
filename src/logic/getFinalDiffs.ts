import { getRankingFromAO20 } from "../ao-api/getRankingFromAO20.js";
import {
  deleteCharDataFromDbFromToday,
  getCharDataFromDbFromYesterday,
  getCharDataFromDbFromBeforeYesterday,
  insertDataToDb,
} from "../supabase-api/useSupabase.js";
import type {
  CharacterDiff,
  CharacterFromAoApi,
  CharacterDB,
} from "../types/types";
import { calculateDiffValuesVsBeforeYesterday } from "../util/calculateDiffValuesVsBeforeYesterday.js";
import { filterAO20ApiResults } from "../util/filterCharacters.js";

export const updateData = async () => {
  const charsFromRanking: CharacterFromAoApi[] = await getRankingFromAO20();
  console.log("Chars from ranking obtained");

  const filteredCharsFromRanking: CharacterFromAoApi[] =
    filterAO20ApiResults(charsFromRanking);
  console.log("Results filtered according to name list");

  await deleteCharDataFromDbFromToday();
  console.log("Removing old data from today from DB");

  await insertDataToDb(filteredCharsFromRanking);
  console.log("Inserting new data for today to DB");
};

export const getFinalDiffs = async (): Promise<CharacterDiff[] | null> => {
  const charsFromDBYesterday: CharacterDB[] | null =
    await getCharDataFromDbFromYesterday();
  console.log("Obtained data for yesterday from DB");

  const charsFromDBBeforeYesterday: CharacterDB[] | null =
    await getCharDataFromDbFromBeforeYesterday();
  console.log("Obtained data for before yesterday from DB");

  if (charsFromDBBeforeYesterday && charsFromDBYesterday) {
    console.log("Returning diffs array");
    const finalDiffs = calculateDiffValuesVsBeforeYesterday(
      charsFromDBBeforeYesterday,
      charsFromDBYesterday
    );

    return finalDiffs.sort((a, b) => b.exp - a.exp);
  }
  console.log("Something went wrong");
  return null;
};
