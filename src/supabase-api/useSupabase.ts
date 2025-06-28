import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://lfimiqkahvapcsqbeeud.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getCharDataFromDbFromYesterday = async () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayDate = yesterday.toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .eq("created_at", yesterdayDate);
  if (error) {
    console.error("Error fetching characters:", error);
    return null;
  }
  return data;
};

export const getCharDataFromDbFromToday = async () => {
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .eq("created_at", todayDate);
  if (error) {
    console.error("Error fetching characters:", error);
    return null;
  }
  return data;
};

export const testInsertData = async () => {
  const { data, error } = await supabase.from("characters").insert([
    {
      character_name: "Purling",
      class_name: "CLASIN",
      deaths: 5,
      exp: 111,
      exp_next_level: 1111111,
      exp_percentage: 15,
      killed_npcs: 1,
      level: 18,
      race_name: "racinto",
      total_kills: 1,
    },
  ]);
  if (error) {
    console.log("Error insertando filas");
    return null;
  }
  console.log("Inserted row:", data);
};
