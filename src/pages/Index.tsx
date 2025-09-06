import { useState, useEffect } from "react";
import type { CharacterDiff } from "../types/types";
import CharShowingDiffs from "../components/CharShowingDiffs";
import { getFinalDiffs } from "../logic/getFinalDiffs";
import { calculateBadges } from "../util/calculateBadges";

const Index = () => {
  const [charDiffs, setCharDiffs] = useState<CharacterDiff[] | null>(null);

  useEffect(() => {
    const fetchDiffsAndSetBages = async () => {
      const diffs = await getFinalDiffs();
      if (diffs) calculateBadges(diffs);
      setCharDiffs(diffs);
    };

    fetchDiffsAndSetBages();
  }, []);

  return (
    <>
      <div>
        <h3 className="text-white text-3xl font-semibold text-center m-5">
          AYER
        </h3>
        <h1 className="text-red-600 text-5xl font-extrabold text-center m-10">
          OBSCURE
        </h1>

        {charDiffs !== null && (
          <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-2">
            {charDiffs.map(
              (char) =>
                (char.exp > 0 || char.levelDiff > 0) &&
                !char.external && (
                  <CharShowingDiffs key={char.character_name} {...char} />
                )
            )}
          </div>
        )}
        <h1 className="text-gray-400 text-3xl font-extrabold text-center m-10">
          MIX
        </h1>

        {charDiffs !== null && (
          <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-2">
            {charDiffs.map(
              (char) =>
                (char.exp > 1 || char.levelDiff > 0) &&
                char.external && (
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
