import type { CharacterDiff } from "../types/types";
import { ArrowUpCircle } from "lucide-react"; // Optional: only if using icons

const CharShowingDiffs = ({
  character_name,
  deaths,
  exp,
  exp_percentage,
  killed_npcs,
  level,
  levelDiff,
  total_kills,
}: CharacterDiff) => {
  const kd = deaths === 0 ? total_kills : total_kills / deaths;
  const leveledUp = levelDiff > 0;

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg text-gray-100 p-4 space-y-4 w-full max-w-md mx-auto">
      {/* Name */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-pink-500">
          {character_name}
        </h2>
        {leveledUp && (
          <div className="flex items-center justify-center text-green-400 mt-1 text-sm font-medium">
            <ArrowUpCircle className="w-5 h-5 mr-1" />
            Leveled Up!
          </div>
        )}
      </div>

      {/* Kills / Deaths / KD */}
      <div>
        <div className="grid grid-cols-3 bg-gray-700 rounded-t-md text-center text-sm font-bold text-gray-300">
          <p>Kills</p>
          <p>Deaths</p>
          <p>KD</p>
        </div>
        <div className="grid grid-cols-3 bg-gray-600 rounded-b-md text-center py-1 text-lg font-medium">
          <p>{total_kills}</p>
          <p>{deaths}</p>
          <p className={kd >= 1 ? "text-green-300 font-bold" : "text-gray-300"}>
            {kd.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Level / EXP / % / NPCs */}
      <div>
        <div className="grid grid-cols-4 bg-gray-700 rounded-t-md text-center text-sm font-bold text-gray-300">
          <p>Level</p>
          <p>EXP</p>
          <p>%</p>
          <p>NPCs</p>
        </div>
        <div className="grid grid-cols-4 bg-gray-600 rounded-b-md text-center py-1 text-lg font-medium">
          <p>{level}</p>
          <p>{levelDiff === 0 ? exp : "-"}</p>
          <p>{exp_percentage.toFixed(2)}%</p>
          <p>{killed_npcs}</p>
        </div>
      </div>
    </div>
  );
};

export default CharShowingDiffs;
