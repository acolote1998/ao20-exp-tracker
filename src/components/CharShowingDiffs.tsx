import type { CharacterDiff } from "../types/types";

const CharShowingDiffs = ({
  character_name,
  // class_name,
  deaths,
  exp,
  exp_percentage,
  killed_npcs,
  level,
  levelDiff,
  // race_name,
  total_kills,
}: CharacterDiff) => {
  return (
    <div className="bg-gray-800 rounded-md justify-center text-center">
      <div className="m-3">
        <span className="text-pink-700 text-2xl font-medium">
          {character_name}
        </span>
      </div>
      {/* <p>{race_name}</p> */}
      {/* <p>{class_name}</p> */}
      <div className="m-3">
        <div className="grid grid-cols-3 text-gray-300 text-lg font-bold bg-gray-700">
          <p>KILLS</p>
          <p>MUERTES</p>
          <p>KD</p>
        </div>
        <div className="grid grid-cols-3 text-gray-300 bg-gray-600">
          <p>{total_kills}</p>
          <p>{deaths}</p>
          <p
            className={`${
              total_kills / deaths >= 1 && "text-green-300 font-extrabold"
            }`}
          >
            {(total_kills / deaths).toFixed(2)}
          </p>
        </div>
      </div>
      <div className="m-3">
        <div className="grid grid-cols-4 text-gray-300 text-lg font-bold bg-gray-700">
          <p>LVL</p>
          <p>EXP</p>
          <p>%</p>
          <p>NPCs</p>
        </div>
        <div className="grid grid-cols-4 text-gray-300 bg-gray-600">
          <p>{level}</p>
          {levelDiff === 0 && <p>{exp}</p>}
          <p>{exp_percentage.toFixed(2)}%</p>
          <p className="text-gray-300">{killed_npcs}</p>
        </div>
      </div>

      {levelDiff > 0 && (
        <p className="text-green-300 font-extrabold text-xl">Subio de nivel</p>
      )}
    </div>
  );
};

export default CharShowingDiffs;
