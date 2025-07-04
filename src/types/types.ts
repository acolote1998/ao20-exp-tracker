export type CharacterFromAoApi = {
  character_name: string;
  ciudadanos_matados: number;
  class_id: number;
  class_name: string;
  criminales_matados: number;
  deaths: number;
  elo: number;
  exp: number;
  exp_next_level: number;
  exp_percentage: string; // looks like a percentage as a string "94.41"
  faction_score: number;
  gender_name: string;
  genre_id: number;
  head_id: number;
  is_locked_in_mao: number; // 0 or 1, could also be boolean if you prefer
  killed_npcs: number;
  level: number;
  puntos_pesca: number;
  race_id: number;
  race_name: string;
  total_kills: number;
};

export type CharacterDB = {
  character_name: string;
  class_name: string;
  deaths: number;
  exp: number;
  exp_next_level: number;
  exp_percentage: number; // adjust if needed
  killed_npcs: number;
  level: number;
  race_name: string;
  total_kills: number;
  updated_at: string; // assuming `todayDate` is an ISO string (e.g. from `new Date().toISOString()`)
};

export type CharacterDiff = {
  character_name: string;
  class_name: string;
  deaths: number;
  exp: number;
  exp_next_level: number;
  exp_percentage: number;
  exp_percentage_updated: number;
  killed_npcs: number;
  level: number;
  levelDiff: number; // difference in level
  race_name: string;
  total_kills: number;
  most_kills?: boolean;
  best_kd?: boolean;
  most_xp?: boolean;
  most_npcs?: boolean;
  external?: boolean;
  exp_updated: number;
};
