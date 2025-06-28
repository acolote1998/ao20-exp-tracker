import {
  getCharDataFromDbFromToday,
  getCharDataFromDbFromYesterday,
  insertDataToDb,
} from "../supabase-api/useSupabase";
import { getRankingFromAO20 } from "../ao-api/getRankingFromAO20";
import { useState } from "react";
import type { CharacterFromAoApi, CharacterDB } from "../types/types";
import { filterAO20ApiResults } from "../util/filterCharacters";
import { calculateDiffValuesVsYesterday } from "../util/calculateDiffValuesVsYesterday";
const Index = () => {
  const [charsFromRanking, setCharsFromRanking] = useState<
    Array<CharacterFromAoApi>
  >([]);
  const [charsFromDBYesterday, setCharsFromDBYesterday] = useState<
    CharacterDB[] | null
  >(null);
  const [charsFromDbToday, setCharsFromDbToday] = useState<
    CharacterDB[] | null
  >(null);
  return (
    <div>
      <button
        onClick={async () => {
          setCharsFromRanking(await getRankingFromAO20());
        }}
      >
        Get Char From Api
      </button>
      <br></br>
      <button
        onClick={() => {
          setCharsFromRanking(filterAO20ApiResults(charsFromRanking));
        }}
      >
        Filter Char to char name list
      </button>
      <br></br>
      <button
        onClick={async () => {
          console.log(await insertDataToDb(charsFromRanking));
        }}
      >
        Insert To DB
      </button>
      <br></br>
      <button
        onClick={async () => {
          console.log(await getCharDataFromDbFromToday());
          setCharsFromDbToday(await getCharDataFromDbFromToday());
        }}
      >
        Get Chars From DB for today
      </button>
      <br></br>
      <button
        onClick={async () => {
          console.log(await getCharDataFromDbFromYesterday());
          setCharsFromDBYesterday(await getCharDataFromDbFromYesterday());
        }}
      >
        Get Chars From DB for yesterday
      </button>
      <br></br>
      <button
        onClick={async () => {
          if (charsFromDBYesterday && charsFromDbToday) {
            console.log(
              calculateDiffValuesVsYesterday(
                charsFromDBYesterday,
                charsFromDbToday
              )
            );
          }
        }}
      >
        Calculate Diffs
      </button>
    </div>
  );
};

export default Index;
