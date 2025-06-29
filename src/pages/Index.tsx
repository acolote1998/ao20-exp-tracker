import { useState, useEffect } from "react";
import type { CharacterDiff } from "../types/types";
import CharShowingDiffs from "../components/CharShowingDiffs";
import { getFinalDiffs } from "../logic/getFinalDiffs";

const Index = () => {
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
      {charDiffs !== null && (
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-2">
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
