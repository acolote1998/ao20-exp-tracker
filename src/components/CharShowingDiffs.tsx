import {
  getBadgesForCharacter,
  getBadgesByNameAndCharacterForToday,
  insertBadgeToDb,
} from "../supabase-api/useSupabase";
import { useEffect, useState } from "react";
import type { CharacterDiff } from "../types/types";
import { ArrowUpCircle } from "lucide-react"; // Optional: only if using icons
import { Sword } from "./icons/Sword";
import { Death } from "./icons/Death";
import { BronzeBestKda } from "./icons/Badges/Bronze/BronzeBestKda";
import { BronzeMostKills } from "./icons/Badges/Bronze/BronzeMostKills";
import { BronzeMostNpcs } from "./icons/Badges/Bronze/BronzeMostNpcs";
import { BronzeMostXp } from "./icons/Badges/Bronze/BronzeMostXp";
import { DiamondBestKda } from "./icons/Badges/Diamond/DiamondBestKd";
import { DiamondMostKills } from "./icons/Badges/Diamond/DiamondMostKills";
import { DiamondMostXp } from "./icons/Badges/Diamond/DiamondMostXp";
import { DiamondMostNpcs } from "./icons/Badges/Diamond/DiamondMostNpcs";
import { SilverMostXp } from "./icons/Badges/Silver/SilverMostXp";
import { SilverBestKda } from "./icons/Badges/Silver/SilverBestKda";
import { SilverMostKills } from "./icons/Badges/Silver/SilverMostKills";
import { SilverMostNpcs } from "./icons/Badges/Silver/SilverMostNpcs";
import { GoldBestKda } from "./icons/Badges/Gold/GoldBestKda";
import { GoldMostKills } from "./icons/Badges/Gold/GoldMostKills";
import { GoldMostNpcs } from "./icons/Badges/Gold/GoldMostNpcs";
import { GoldMostExp } from "./icons/Badges/Gold/GoldMostXp";
import { MasterBestKda } from "./icons/Badges/Master/MasterBestKda";
import { MasterMostKills } from "./icons/Badges/Master/MasterMostKills";
import { MasterMostXp } from "./icons/Badges/Master/MasterMostXp";
import { MasterMostNpcs } from "./icons/Badges/Master/MasterMostNpcs";
import { BronzeBestFactionScore } from "./icons/Badges/Bronze/BronzeBestFactionScore";
import { SilverBestFactionScore } from "./icons/Badges/Silver/SilverBestFactionScore";
import { GoldBestFactionScore } from "./icons/Badges/Gold/GoldBestFactionScore";
import { DiamondBestFactionScore } from "./icons/Badges/Diamond/DiamondBestFactionScore";
import { MasterBestFactionScore } from "./icons/Badges/Master/MasterBestFactionScore";

const CharShowingDiffs = ({
  exp_next_level_raw,
  character_name,
  deaths,
  exp,
  exp_percentage,
  exp_updated,
  killed_npcs,
  level,
  levelDiff,
  total_kills,
  best_kd,
  most_kills,
  most_npcs,
  most_xp,
  exp_percentage_updated,
  most_faction_score,
  faction_score,
}: CharacterDiff) => {
  const [mostKillsAmount, setMostKillsAmount] = useState<number>();
  const [mostNpcsAmount, setMostNpcsAmount] = useState<number>();
  const [mostXpAmount, setMostXpAmount] = useState<number>();
  const [bestKdAmount, setBestKdAmount] = useState<number>();
  const [mostFactionScoreAmount, setMostFactionScoreAmount] =
    useState<number>();
  useEffect(() => {
    const fetchBadges = async () => {
      if (best_kd) {
        const bestKdTodayData = await getBadgesByNameAndCharacterForToday(
          character_name,
          "best_kd"
        );
        if (bestKdTodayData?.length === 0) {
          await insertBadgeToDb("best_kd", character_name);
        }
        const bestKdData = await getBadgesForCharacter(
          character_name,
          "best_kd"
        );
        setBestKdAmount(bestKdData?.length);
      }
      if (most_kills) {
        const bestMostKillsTodayData =
          await getBadgesByNameAndCharacterForToday(
            character_name,
            "most_kills"
          );
        if (bestMostKillsTodayData?.length === 0) {
          await insertBadgeToDb("most_kills", character_name);
        }
        const mostKillsData = await getBadgesForCharacter(
          character_name,
          "most_kills"
        );
        setMostKillsAmount(mostKillsData?.length);
      }
      if (most_npcs) {
        const mostNpcsTodayData = await getBadgesByNameAndCharacterForToday(
          character_name,
          "most_npcs"
        );
        if (mostNpcsTodayData?.length === 0) {
          await insertBadgeToDb("most_npcs", character_name);
        }
        const mostNpcsData = await getBadgesForCharacter(
          character_name,
          "most_npcs"
        );
        setMostNpcsAmount(mostNpcsData?.length);
      }
      if (most_xp) {
        const mostXpTodaysData = await getBadgesByNameAndCharacterForToday(
          character_name,
          "most_xp"
        );
        if (mostXpTodaysData?.length === 0) {
          await insertBadgeToDb("most_xp", character_name);
        }
        const mostExpData = await getBadgesForCharacter(
          character_name,
          "most_xp"
        );
        setMostXpAmount(mostExpData?.length);
      }
      if (most_faction_score) {
        const mostFactionScoreTodaysData =
          await getBadgesByNameAndCharacterForToday(
            character_name,
            "most_faction_score"
          );
        if (mostFactionScoreTodaysData?.length === 0) {
          await insertBadgeToDb("most_faction_score", character_name);
        }
        const mostFactionScoreData = await getBadgesForCharacter(
          character_name,
          "most_faction_score"
        );
        setMostFactionScoreAmount(mostFactionScoreData?.length);
      }
    };
    fetchBadges();
  }, [
    character_name,
    best_kd,
    most_kills,
    most_npcs,
    most_xp,
    most_faction_score,
  ]);

  const kd = deaths === 0 ? total_kills : total_kills / deaths;
  const leveledUp = levelDiff > 0;
  const today = new Date();
  const levelUp = new Date(today);
  const amountOfDaysOfTraining = Math.ceil(
    (exp_next_level_raw - exp_updated) / exp
  ).toFixed(1);
  levelUp.setDate(today.getDate() + Number(amountOfDaysOfTraining));
  const levelUpDay = String(levelUp.getDate()).padStart(2, "0");
  const levelUpMonth = String(levelUp.getMonth() + 1).padStart(2, "0");
  const calculateCols = () => {
    let baseCols = 4;
    if (levelDiff > 0) {
      baseCols--;
    }
    if (killed_npcs === 0) {
      baseCols--;
    }
    return baseCols;
  };

  const colsClass =
    calculateCols() === 2
      ? "grid-cols-2"
      : calculateCols() === 3
      ? "grid-cols-3"
      : "grid-cols-4";

  const getBestKdaIcon = (amount: number) => {
    if (amount >= 55) return <MasterBestKda width={40} height={40} />;
    if (amount >= 40) return <DiamondBestKda width={40} height={40} />;
    if (amount >= 25) return <GoldBestKda width={40} height={40} />;
    if (amount >= 10) return <SilverBestKda width={40} height={40} />;
    if (amount > 0) return <BronzeBestKda width={40} height={40} />;
    return null;
  };

  const getMostKillsIcon = (amount: number) => {
    if (amount >= 55) return <MasterMostKills width={40} height={40} />;
    if (amount >= 40) return <DiamondMostKills width={40} height={40} />;
    if (amount >= 25) return <GoldMostKills width={40} height={40} />;
    if (amount >= 10) return <SilverMostKills width={40} height={40} />;
    if (amount > 0) return <BronzeMostKills width={40} height={40} />;
    return null;
  };

  const getMostNpcsIcon = (amount: number) => {
    if (amount >= 55) return <MasterMostNpcs width={48} height={48} />;
    if (amount >= 40) return <DiamondMostNpcs width={48} height={48} />;
    if (amount >= 25) return <GoldMostNpcs width={48} height={48} />;
    if (amount >= 10) return <SilverMostNpcs width={48} height={48} />;
    if (amount > 0) return <BronzeMostNpcs width={48} height={48} />;
    return null;
  };

  const getMostXpIcon = (amount: number) => {
    if (amount >= 55) return <MasterMostXp width={48} height={48} />;
    if (amount >= 40) return <DiamondMostXp width={48} height={48} />;
    if (amount >= 25) return <GoldMostExp width={48} height={48} />;
    if (amount >= 10) return <SilverMostXp width={48} height={48} />;
    if (amount > 0) return <BronzeMostXp width={48} height={48} />;
    return null;
  };

  const getMostFactionScoreIcon = (amount: number) => {
    if (amount >= 55) return <MasterBestFactionScore width={48} height={48} />;
    if (amount >= 40) return <DiamondBestFactionScore width={48} height={48} />;
    if (amount >= 25) return <GoldBestFactionScore width={48} height={48} />;
    if (amount >= 10) return <SilverBestFactionScore width={48} height={48} />;
    if (amount > 0) return <BronzeBestFactionScore width={48} height={48} />;
    return null;
  };

  return (
    <div
      className={`
        cursor-pointer relative
        duration-300
        ease-in-out
        transform
        hover:scale-102
        bg-gray-800
        rounded-2xl
        text-gray-100
        p-4
        space-y-4
        w-full
        max-w-md
        mx-auto
        overflow-hidden`}
    >
      {/* Name and Level-up */}
      <div className="relative">
        <h2 className="text-2xl font-semibold text-pink-500 text-center">
          {character_name}
        </h2>
        <div
          className={`flex justify-center text-gray-300 opacity-50 text-sm font-semibold group`}
        >
          <span className="inline-block group-hover:hidden">
            Siguiente nivel en{" "}
            {((exp_next_level_raw - exp_updated) / exp).toFixed(1)} dias
          </span>
          <span className="hidden group-hover:inline-block">
            Siguiente nivel el {levelUpDay}/{levelUpMonth}
          </span>
        </div>

        {leveledUp && (
          <div className="absolute top-1 right-2 flex items-center text-green-400 text-sm font-medium">
            <ArrowUpCircle className="w-5 h-5 mr-1" />
            Subió de nivel
          </div>
        )}
      </div>
      {/* XP Bar */}
      <div className="w-full bg-gray-700 rounded-full h-5 relative overflow-hidden">
        <div className="h-5 flex">
          {levelDiff === 0 && (
            <div
              style={{ width: `${exp_percentage_updated - exp_percentage}%` }}
              className="bg-red-700 transition-all duration-300 ease-out"
            />
          )}
          <div
            style={{
              width: `${
                levelDiff === 0 ? exp_percentage : exp_percentage_updated
              }%`,
            }}
            className="bg-green-600 transition-all duration-300 ease-out"
          />
        </div>

        <div className="absolute w-full text-center text-sm font-medium text-white top-1/2 -translate-y-1/2 group">
          <span className="inline-block group-hover:hidden">
            {exp_percentage_updated}%
          </span>
          <span className="hidden group-hover:inline-block">
            {new Intl.NumberFormat("es-AR").format(exp_updated)}
          </span>
        </div>
      </div>
      {/* Kills / Deaths / KD / PF */}
      <div>
        <div className="grid grid-cols-4 bg-gray-700 rounded-t-md text-center text-md font-bold text-gray-300 items-center justify-center pt-2 pb-2">
          <div className="flex justify-center">
            <Sword width={24} height={24} />
          </div>
          <div className="flex justify-center">
            <Death width={20} height={20} />
          </div>
          <p>KD</p>
          <p>PF</p>
        </div>
        <div className="grid grid-cols-4 bg-gray-600 rounded-b-md text-center py-1 text-lg font-medium">
          <p>{total_kills}</p>
          <p>{deaths}</p>
          <p className={kd >= 1 ? "text-green-300 font-bold" : "text-gray-300"}>
            {kd.toFixed(2)}
          </p>
          <p>{faction_score}</p>
        </div>
      </div>
      {/* Level / EXP / % / NPCs*/}
      <div>
        <div
          className={`grid ${colsClass}
           bg-gray-700 rounded-t-md text-center text-md font-bold text-gray-300`}
        >
          <p>LVL</p>
          <p>EXP</p>
          {levelDiff === 0 && <p>%</p>}
          {killed_npcs > 0 && <p>NPCs</p>}
        </div>
        <div
          className={`grid ${colsClass}
           bg-gray-600 rounded-b-md text-center py-1 text-lg font-medium`}
        >
          <p
            className={`${
              levelDiff === 0 ? "text-white" : "text-green-400 font-black"
            }`}
          >
            {level}
          </p>
          <div>{new Intl.NumberFormat("es-AR").format(exp)}</div>
          {levelDiff === 0 && <p>{exp_percentage.toFixed(2)} %</p>}
          {killed_npcs > 0 && <p>{killed_npcs}</p>}
        </div>
      </div>
      <div>
        {(best_kd ||
          most_kills ||
          most_npcs ||
          most_xp ||
          most_faction_score) && (
          <>
            <div className="flex bg-gray-700 rounded-t-md text-center text-md font-bold text-gray-300 justify-center">
              <p>Medallas</p>
            </div>

            <div className="flex justify-around bg-gray-600 rounded-b-md text-center py-1 text-lg font-medium">
              {best_kd && (
                <div className="flex flex-col items-center justify-center align-middle mt-2">
                  {bestKdAmount != null && getBestKdaIcon(bestKdAmount)}
                  <p className="font-normal text-sm mt-2">Mejor KD</p>
                  <p className="font-normal text-sm mt-2">x{bestKdAmount}</p>
                </div>
              )}
              {most_kills && (
                <div className="flex flex-col items-center justify-center align-middle mt-2">
                  {mostKillsAmount != null && getMostKillsIcon(mostKillsAmount)}
                  <p className="font-normal text-sm mt-2">Mas Kills</p>
                  <p className="font-normal text-sm mt-2">x{mostKillsAmount}</p>
                </div>
              )}
              {most_npcs && (
                <div className="flex flex-col items-center justify-center align-middle mt-2">
                  {mostNpcsAmount != null && getMostNpcsIcon(mostNpcsAmount)}
                  <p className="font-normal text-sm mt-2">Mas NPCs</p>
                  <p className="font-normal text-sm mt-2">x{mostNpcsAmount}</p>
                </div>
              )}
              {most_xp && (
                <div className="flex flex-col items-center justify-center align-middle mt-2">
                  {mostXpAmount != null && getMostXpIcon(mostXpAmount)}
                  <p className="font-normal text-sm mt-2">Mas XP</p>
                  <p className="font-normal text-sm mt-2">x{mostXpAmount}</p>
                </div>
              )}
              {most_faction_score && (
                <div className="flex flex-col items-center justify-center align-middle mt-2">
                  {mostFactionScoreAmount != null &&
                    getMostFactionScoreIcon(mostFactionScoreAmount)}
                  <p className="font-normal text-sm mt-2">Mas PF</p>
                  <p className="font-normal text-sm mt-2">
                    x{mostFactionScoreAmount}
                  </p>
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
