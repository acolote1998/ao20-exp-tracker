import type { CharacterDiff } from "../types/types";
import { ArrowUpCircle } from "lucide-react"; // Optional: only if using icons
import { Sword } from "./icons/Sword";
import { Death } from "./icons/Death";
import { BestKda } from "./icons/BestKda";
import { MostKills } from "./icons/MostKills";
import { MostNpcs } from "./icons/MostNpcs";
import { MostExp } from "./icons/MostXp";
const CharShowingDiffs = ({
  character_name,
  deaths,
  exp,
  exp_percentage,
  killed_npcs,
  level,
  levelDiff,
  total_kills,
  best_kd,
  most_kills,
  most_npcs,
  most_xp,
  exp_percentage_updated,
}: CharacterDiff) => {
  const kd = deaths === 0 ? total_kills : total_kills / deaths;
  const leveledUp = levelDiff > 0;
  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg text-gray-100 p-4 space-y-4 w-full max-w-md mx-auto overflow-hidden">
      {/* Name and Level-up */}
      <div className="relative">
        <h2 className="text-2xl font-semibold text-pink-500 text-center">
          {character_name}
        </h2>

        {leveledUp && (
          <div className="absolute top-1 right-2 flex items-center text-green-400 text-sm font-medium">
            <ArrowUpCircle className="w-5 h-5 mr-1" />
            Subió de nivel
          </div>
        )}
      </div>

      {/* XP Bar */}
      <div className="w-full bg-gray-700 rounded-full h-5 relative overflow-hidden">
        <div
          style={{ width: `${exp_percentage_updated}%` }}
          className="bg-red-700 h-full transition-all duration-300 ease-out"
        />
        <p className="absolute w-full text-center text-sm font-medium text-white top-1/2 -translate-y-1/2">
          {exp_percentage_updated}%
        </p>
      </div>

      {/* Kills / Deaths / KD */}
      <div>
        <div className="grid grid-cols-3 bg-gray-700 rounded-t-md text-center text-md font-bold text-gray-300 items-center justify-center pt-2 pb-2">
          <div className="flex justify-center">
            <Sword width={24} height={24} />
          </div>
          <div className="flex justify-center">
            <Death width={20} height={20} />
          </div>
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

      {/* Level / EXP / % / NPCs*/}
      <div>
        <div
          className={`grid grid-cols-${
            levelDiff === 0 ? "4" : "3"
          } bg-gray-700 rounded-t-md text-center text-md font-bold text-gray-300`}
        >
          <p>LVL</p>
          <p>EXP</p>
          {levelDiff === 0 && <p>%</p>}
          <p>NPCs</p>
        </div>
        <div
          className={`grid grid-cols-${
            levelDiff === 0 ? "4" : "3"
          } bg-gray-600 rounded-b-md text-center py-1 text-lg font-medium`}
        >
          <p>{levelDiff === 0 ? level : level - 1}</p>
          <div>{new Intl.NumberFormat("es-AR").format(exp)}</div>
          {levelDiff === 0 && <p>{exp_percentage.toFixed(2)} %</p>}
          <p>{killed_npcs}</p>
        </div>
      </div>
      <div>
        {(best_kd || most_kills || most_npcs || most_xp) && (
          <>
            <div className="flex bg-gray-700 rounded-t-md text-center text-md font-bold text-gray-300 justify-center">
              <p>Medallas</p>
            </div>

            <div className="flex justify-around bg-gray-600 rounded-b-md text-center py-1 text-lg font-medium">
              {best_kd && (
                <div className="flex flex-col items-center justify-center align-middle mt-2">
                  <BestKda width={40} height={40} />
                  <p className="font-normal text-sm mt-2">Mejor KD</p>
                </div>
              )}
              {most_kills && (
                <div className="flex flex-col items-center justify-center align-middle mt-2">
                  <MostKills width={40} height={40} />
                  <p className="font-normal text-sm mt-2">Mas Kills</p>
                </div>
              )}
              {most_npcs && (
                <div className="flex flex-col items-center justify-center align-middle mt-2">
                  <MostNpcs width={48} height={48} />
                  <p className="font-normal text-sm mt-2">Mas NPCs</p>
                </div>
              )}
              {most_xp && (
                <div className="flex flex-col items-center justify-center align-middle mt-2">
                  <MostExp width={48} height={48} />
                  <p className="font-normal text-sm mt-2">Mas XP</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CharShowingDiffs;
