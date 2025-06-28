import {
  getCharDataFromDbFromToday,
  getCharDataFromDbFromYesterday,
  insertDataToDb,
} from "../supabase-api/useSupabase";
import { getRankingFromAO20 } from "../ao-api/getRankingFromAO20";
import { useState } from "react";
import type { CharacterFromAoApi } from "../types/types";
import { filterAO20ApiResults } from "../util/filterCharacters";
const Index = () => {
  const [charsFromRanking, setCharsFromRanking] = useState<
    Array<CharacterFromAoApi>
  >([]);
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
        }}
      >
        Get Chars From DB for today
      </button>
    </div>
  );
};

export default Index;
