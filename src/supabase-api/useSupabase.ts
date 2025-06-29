import { createClient } from "@supabase/supabase-js";
import type { CharacterFromAoApi, CharacterDB } from "../types/types";
const supabaseUrl = "https://lfimiqkahvapcsqbeeud.supabase.co";
const supabaseKey: string | undefined = import.meta.env.VITE_SUPABASE_KEY;
if (!supabaseKey) {
  throw new Error("Missing env var VITE_SUPABASE_KEY");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export const getCharDataFromDbFromBeforeYesterday =
  async (): Promise<Array<CharacterDB> | null> => {
    const today = new Date();
    const beforeYesterday = new Date(today);
    beforeYesterday.setDate(today.getDate() - 2);
    const beforeYesterdayDate = beforeYesterday.toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("characters")
      .select("*")
      .eq("updated_at", beforeYesterdayDate);
    if (error) {
      console.error("Error fetching characters:", error);
      return null;
    }
    return data;
  };

export const getCharDataFromDbFromYesterday =
  async (): Promise<Array<CharacterDB> | null> => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayDate = yesterday.toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("characters")
      .select("*")
      .eq("updated_at", yesterdayDate);
    if (error) {
      console.error("Error fetching characters:", error);
      return null;
    }
    return data;
  };

export const deleteCharDataFromDbFromToday = async () => {
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];

  const { error } = await supabase
    .from("characters")
    .delete()
    .eq("updated_at", todayDate);
  if (error) {
    console.error("Error deleting characters:", error);
    return null;
  }
};

export const insertDataToDb = async (
  charsToInsert: Array<CharacterFromAoApi>
) => {
  deleteCharDataFromDbFromToday();
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];
  const charsForDb = charsToInsert.map((char) => ({
    character_name: char.character_name,
    class_name: char.class_name,
    deaths: char.deaths,
    exp: char.exp,
    exp_next_level: char.exp_next_level,
    exp_percentage: char.exp_percentage,
    killed_npcs: char.killed_npcs,
    level: char.level,
    race_name: char.race_name,
    total_kills: char.total_kills,
    updated_at: todayDate,
  }));
  const { error } = await supabase.from("characters").insert(charsForDb);
  if (error) {
    console.log("Error insertando filas");
    return null;
  }
};
