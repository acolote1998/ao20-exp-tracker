import { getRankingFromAO20 } from "../ao-api/getRankingFromAO20.js";
import {
  deleteCharDataFromDbFromToday,
  getCharDataFromDbFromYesterday,
  getCharDataFromDbFromToday,
  insertDataToDb,
} from "../supabase-api/useSupabase.js";
import type {
  CharacterDiff,
  CharacterFromAoApi,
  CharacterDB,
} from "../types/types";
import { calculateDiffValuesVsYesterday } from "../util/calculateDiffValuesVsYesterday.js";
import characterNames from "../util/characterList.js";
import { filterAO20ApiResults } from "../util/filterCharacters.js";

const retryAsync = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 60000 // 1 minute
): Promise<T> => {
  let lastError;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      console.warn(
        `⚠️ Attempt ${attempt} failed. Retrying in ${delayMs / 1000}s...`
      );
      if (attempt < retries) {
        await new Promise((res) => setTimeout(res, delayMs));
      }
    }
  }
  throw lastError;
};

export const updateData = async () => {
  const charsFromRanking: CharacterFromAoApi[] = await retryAsync(
    getRankingFromAO20,
    3,
    60000
  );

  console.log(`✅ Characters fetched from API: ${charsFromRanking.length}`);
  console.log(
    charsFromRanking.length === 1000
      ? "✅ All 1000 characters were fetched"
      : "⚠️ Not all characters were fetched"
  );

  const filteredCharsFromRanking: CharacterFromAoApi[] =
    filterAO20ApiResults(charsFromRanking);
  console.log(
    `🔍 Characters after filtering by name list: ${filteredCharsFromRanking.length}`
  );
  console.log(
    filteredCharsFromRanking.length === characterNames.length
      ? "✅ All expected characters were filtered"
      : "⚠️ Some expected characters are missing from the filter"
  );

  console.log("🗑️ Deleting old data from today in DB...");
  const deletedRows = await retryAsync(deleteCharDataFromDbFromToday, 3, 60000);
  console.log(
    deletedRows && deletedRows > 0
      ? `✅ ${deletedRows} rows deleted`
      : "⚠️ No rows deleted"
  );

  console.log("💾 Inserting new data for today...");
  const insertedRows = await retryAsync(
    () => insertDataToDb(filteredCharsFromRanking),
    3,
    60000
  );
  console.log(
    insertedRows && insertedRows > 0
      ? `✅ ${insertedRows} rows inserted`
      : "❌ No rows inserted"
  );
};

export const getFinalDiffs = async (): Promise<CharacterDiff[] | null> => {
  const charsFromDBToday: CharacterDB[] | null =
    await getCharDataFromDbFromToday();
  console.log(
    `📅 Data from today fetched: ${charsFromDBToday?.length ?? 0} records`
  );

  const charsFromDBYesterday: CharacterDB[] | null =
    await getCharDataFromDbFromYesterday();
  console.log(
    `📅 Data from yesterday fetched: ${
      charsFromDBYesterday?.length ?? 0
    } records`
  );

  if (charsFromDBToday && charsFromDBYesterday) {
    console.log("🔍 Calculating diffs between today and yesterday...");
    const finalDiffs = calculateDiffValuesVsYesterday(
      charsFromDBYesterday,
      charsFromDBToday
    );

    console.log(`✅ Diff calculation complete.`);
    return finalDiffs.sort((a, b) => {
      // First: sort by levelDiff descending
      if (b.levelDiff !== a.levelDiff) {
        return b.levelDiff - a.levelDiff;
      }
      // Then: if levelDiff is the same, sort by EXP descending
      return b.exp - a.exp;
    });
  }

  console.error("⚠️ Could not fetch all required data to calculate diffs.");
  return null;
};
