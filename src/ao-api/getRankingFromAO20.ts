import axios from "axios";

const VITE_AO20_RANKING_ENDPOINT: string = import.meta.env
  .VITE_AO20_RANKING_ENDPOINT;

// Class Ids
/*
1 - Mago
2- Clerigo
3- Guerrero
4- Asesino
5- Bardo
6- Druida
7- Paladin
8- Cazador
9- Trabajador
12- Bandido
*/

export const getRankingFromAO20 = async () => {
  const magos = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "1")
  );
  const magosData = magos.data.characters;
  const clerigos = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "2")
  );
  const clerigosData = clerigos.data.characters;
  const guerreros = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "3")
  );
  const guerrerosData = guerreros.data.characters;
  const asesinos = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "4")
  );
  const asesinosData = asesinos.data.characters;
  const bardos = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "5")
  );
  const bardosData = bardos.data.characters;
  const druidas = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "6")
  );
  const druidasData = druidas.data.characters;
  const paladines = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "7")
  );
  const paladinesData = paladines.data.characters;
  const cazadores = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "8")
  );
  const cazadoresData = cazadores.data.characters;
  const trabajadores = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "9")
  );
  const trabajadoresData = trabajadores.data.characters;
  const bandidos = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "12")
  );
  const bandidosData = bandidos.data.characters;
  return [
    ...magosData,
    ...clerigosData,
    ...guerrerosData,
    ...asesinosData,
    ...bardosData,
    ...druidasData,
    ...paladinesData,
    ...cazadoresData,
    ...trabajadoresData,
    ...bandidosData,
  ];
};
