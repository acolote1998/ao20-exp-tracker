import { useState, useEffect } from "react";
import type {
  CharacterFromAoApi,
  CharacterDB,
  CharacterDiff,
} from "../types/types";
import {
  getCharDataFromDbFromToday,
  getCharDataFromDbFromYesterday,
  insertDataToDb,
  deleteCharDataFromDbFromToday,
} from "../supabase-api/useSupabase";
import { getRankingFromAO20 } from "../ao-api/getRankingFromAO20";
import { filterAO20ApiResults } from "../util/filterCharacters";
import { calculateDiffValuesVsYesterday } from "../util/calculateDiffValuesVsYesterday";
import CharShowingDiffs from "../components/CharShowingDiffs";
import { getFinalDiffs } from "../logic/getFinalDiffs";

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
  const [charDiffs, setCharDiffs] = useState<CharacterDiff[] | null>(null);
  useEffect(() => {
    const fetchDiffs = async () => {
      const diffs = await getFinalDiffs();
      setCharDiffs(diffs);
    };

    fetchDiffs();
  }, []);

  return (
    <>
      <div className="text-white">
        <button
          onClick={() => {
            console.log(charDiffs);
          }}
        >
          Test me
        </button>
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
            console.log(await deleteCharDataFromDbFromToday());
          }}
        >
          deleteCharDataFromDbFromToday
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
              setCharDiffs(
                calculateDiffValuesVsYesterday(
                  charsFromDBYesterday,
                  charsFromDbToday
                )
              );
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
      {charDiffs !== null && (
        <div className="grid lg:grid-cols-5 sm:grid-cols-3 gap-2">
          {charDiffs.map(
            (char) =>
              char.exp > 0 && (
                <CharShowingDiffs key={char.character_name} {...char} />
              )
          )}
        </div>
      )}
    </>
  );
};

export default Index;
