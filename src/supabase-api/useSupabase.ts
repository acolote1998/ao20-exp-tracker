import { createClient } from "@supabase/supabase-js";
import type {
  CharacterFromAoApi,
  CharacterDB,
  BadgeForCharacter,
} from "../types/types";
const supabaseUrl = "https://lfimiqkahvapcsqbeeud.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmaW1pcWthaHZhcGNzcWJlZXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMTg2OTEsImV4cCI6MjA2NjY5NDY5MX0.phD5ByV4rVLXIgAUNE8nqt3zZG3cXE5THS-7todbqfk";
const supabase = createClient(supabaseUrl, supabaseKey);

export const getBadgesForCharacter = async (
  characterName: string,
  badgeName: string
): Promise<Array<BadgeForCharacter> | null> => {
  const { data, error } = await supabase
    .from("badges")
    .select("*")
    .eq("character_name", characterName)
    .eq("name", badgeName);
  if (error) {
    console.error("Error fetching badges for character:", error);
    return null;
  }
  return data;
};

export const getBadgesByNameAndCharacterForToday = async (
  characterName: string,
  badgeName: string
): Promise<Array<BadgeForCharacter> | null> => {
  const today = new Date();
  const todaysDate = today.toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("badges")
    .select("*")
    .eq("character_name", characterName)
    .eq("name", badgeName)
    .eq("created_at", todaysDate);
  if (error) {
    console.error("Error fetching badges for character:", error);
    return null;
  }
  return data;
};

export const insertBadgeToDb = async (
  badgeToInsert: string,
  characterName: string
) => {
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];
  const badgeToSend = {
    created_at: todayDate,
    name: badgeToInsert,
    character_name: characterName,
  };
  const { data, error } = await supabase
    .from("badges")
    .insert(badgeToSend)
    .select();
  if (error) {
    console.log("Error insertando filas");
    return null;
  }
  return data.length;
};

export const getCharDataFromDbFromToday =
  async (): Promise<Array<CharacterDB> | null> => {
    const today = new Date();
    const todaysDate = today.toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("characters")
      .select("*")
      .eq("updated_at", todaysDate);
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

  const { data, error } = await supabase
    .from("characters")
    .delete()
    .eq("updated_at", todayDate)
    .select();
  if (error) {
    console.error("Error deleting characters:", error);
    return null;
  }
  return data.length; //returns the amount of deleted rows
};

export const insertDataToDb = async (
  charsToInsert: Array<CharacterFromAoApi>
) => {
  await deleteCharDataFromDbFromToday();
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
    faction_score: char.faction_score,
  }));
  const { data, error } = await supabase
    .from("characters")
    .insert(charsForDb)
    .select();
  if (error) {
    console.log("Error insertando filas");
    return null;
  }
  return data.length;
};
