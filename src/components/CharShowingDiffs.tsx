import type { CharacterDiff } from "../types/types";

const CharShowingDiffs = ({
  character_name,
  class_name,
  deaths,
  exp,
  exp_percentage,
  killed_npcs,
  level,
  levelDiff,
  race_name,
  total_kills,
}: CharacterDiff) => {
  return (
    <div>
      <p>{character_name}</p>
      <p>{race_name}</p>
      <p>{class_name}</p>
      <p>Muertes 24hs: {deaths}</p>
      <p>{total_kills} kills en 24hs</p>
      <p>{(total_kills / deaths).toFixed(2)} KD en 24hs</p>
      {levelDiff === 0 && <p>Exp 24hs: {exp}</p>}
      <p>Level: {level}</p>
      {levelDiff > 0}
      <p>Subio de level?: Si</p>
      <p>{exp_percentage}% exp 24hs</p>
      <p>{killed_npcs} NPCs en 24hs</p>
    </div>
  );
};

export default CharShowingDiffs;
