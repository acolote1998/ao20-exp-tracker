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
  console.log(`✅ Characters fetched from API: ${charsFromRanking.length}`);
  console.log(
    charsFromRanking.length === 1000
      ? "✅ All 2000 characters were fetched"
      : "⚠️ Not all characters were fetched"
  );

  const filteredCharsFromRanking: CharacterFromAoApi[] =
    filterAO20ApiResults(charsFromRanking);
  console.log(
    `🔍 Characters after filtering by name list: ${filteredCharsFromRanking.length}`
  );
  console.log(
    filteredCharsFromRanking.length === 11
      ? "✅ All expected characters were filtered"
      : "⚠️ Some expected characters are missing from the filter"
  );

  console.log("🗑️ Deleting old data from today in DB...");
  const deletedRows = await deleteCharDataFromDbFromToday();
  console.log(
    deletedRows && deletedRows > 0
      ? `✅ ${deletedRows} rows deleted`
      : "⚠️ No rows deleted"
  );

  console.log("💾 Inserting new data for today...");
  const insertedRows = await insertDataToDb(filteredCharsFromRanking);
  console.log(
    insertedRows && insertedRows > 0
      ? `✅ ${insertedRows} rows inserted`
      : "❌ No rows inserted"
  );
};

export const getFinalDiffs = async (): Promise<CharacterDiff[] | null> => {
  const charsFromDBYesterday: CharacterDB[] | null =
    await getCharDataFromDbFromYesterday();
  console.log(
    `📅 Data from yesterday fetched: ${
      charsFromDBYesterday?.length ?? 0
    } records`
  );

  const charsFromDBBeforeYesterday: CharacterDB[] | null =
    await getCharDataFromDbFromBeforeYesterday();
  console.log(
    `📅 Data from before yesterday fetched: ${
      charsFromDBBeforeYesterday?.length ?? 0
    } records`
  );

  if (charsFromDBBeforeYesterday && charsFromDBYesterday) {
    console.log(
      "🔍 Calculating diffs between yesterday and before yesterday..."
    );
    const finalDiffs = calculateDiffValuesVsBeforeYesterday(
      charsFromDBBeforeYesterday,
      charsFromDBYesterday
    );

    console.log(`✅ Diff calculation complete.`);
    return finalDiffs.sort((a, b) => b.exp - a.exp);
  }

  console.error("⚠️ Could not fetch all required data to calculate diffs.");
  return null;
};
