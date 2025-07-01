import { useState, useEffect } from "react";
import type { CharacterDiff } from "../types/types";
import CharShowingDiffs from "../components/CharShowingDiffs";
import { getFinalDiffs } from "../logic/getFinalDiffs";

const Index = () => {
  const [charDiffs, setCharDiffs] = useState<CharacterDiff[] | null>(null);

  useEffect(() => {
    const calculateBadges = (chars: CharacterDiff[]) => {
      if (!chars.length) return;

      let most_kills = 0;
      let most_kills_name = chars[0].character_name;

      let best_kd = 0.01;
      let best_kd_name = chars[0].character_name;

      let most_xp = 0;
      let most_xp_name = chars[0].character_name;

      let most_npcs = 0;
      let most_npcs_name = chars[0].character_name;

      chars.forEach((char) => {
        if (char.total_kills >= most_kills) {
          most_kills = char.total_kills;
          most_kills_name = char.character_name;
        }
        if (char.total_kills / char.deaths >= best_kd) {
          best_kd = char.total_kills / char.deaths;
          best_kd_name = char.character_name;
        }
        if (char.exp >= most_xp) {
          most_xp = char.exp;
          most_xp_name = char.character_name;
        }
        if (char.killed_npcs >= most_npcs) {
          most_npcs = char.killed_npcs;
          most_npcs_name = char.character_name;
        }
      });
      chars.forEach((char) => {
        if (
          char.character_name.toLowerCase() === most_kills_name.toLowerCase()
        ) {
          char.most_kills = true;
        }
        if (
          char.character_name.toLowerCase() === most_npcs_name.toLowerCase()
        ) {
          char.most_npcs = true;
        }
        if (char.character_name.toLowerCase() === most_xp_name.toLowerCase()) {
          char.most_xp = true;
        }
        if (char.character_name.toLowerCase() === best_kd_name.toLowerCase()) {
          char.best_kd = true;
        }
      });
    };

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
        <h1 className="text-red-600 text-5xl font-extrabold text-center m-10">
          OBSCURE
        </h1>
        <h3 className="text-white text-3xl font-semibold text-center m-5">
          AYER
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
