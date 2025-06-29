import { useState, useEffect } from "react";
import type { CharacterDiff } from "../types/types";
import CharShowingDiffs from "../components/CharShowingDiffs";
import { getFinalDiffs } from "../logic/getFinalDiffs";

const Index = () => {
  const [charDiffs, setCharDiffs] = useState<CharacterDiff[] | null>(null);
  const today = new Date();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const beforeYesterday = new Date(today);
  beforeYesterday.setDate(today.getDate() - 2);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
  };

  const yesterdayDate = formatDate(yesterday);
  const beforeYesterdayDate = formatDate(beforeYesterday);

  useEffect(() => {
    const fetchDiffs = async () => {
      const diffs = await getFinalDiffs();
      setCharDiffs(diffs);
    };

    fetchDiffs();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-red-600 text-5xl font-extrabold text-center m-10">
          OBSCURE
        </h1>
        <h3 className="text-white text-3xl font-semibold text-center m-5">
          {beforeYesterdayDate} - {yesterdayDate}
        </h3>
        {charDiffs !== null && (
          <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-2">
            {charDiffs.map(
              (char) =>
                char.exp > 0 && (
                  <CharShowingDiffs key={char.character_name} {...char} />
                )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
