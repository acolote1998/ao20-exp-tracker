import axios from "axios";

const VITE_AO20_RANKING_ENDPOINT = `https://api.ao20.com.ar:2083/rankings/users?top=100&season=5&classId=/classid/`;

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
    VITE_AO20_RANKING_ENDPOINT.replace(
      "/classid/",
      `1&t=${new Date().getTime()}`
    )
  );
  const magosData = magos.data.characters;
  const clerigos = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace(
      "/classid/",
      `2&t=${new Date().getTime()}`
    )
  );
  const clerigosData = clerigos.data.characters;
  const guerreros = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace(
      "/classid/",
      `3&t=${new Date().getTime()}`
    )
  );
  const guerrerosData = guerreros.data.characters;
  const asesinos = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace(
      "/classid/",
      `4&t=${new Date().getTime()}`
    )
  );
  const asesinosData = asesinos.data.characters;
  const bardos = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace(
      "/classid/",
      `5&t=${new Date().getTime()}`
    )
  );
  const bardosData = bardos.data.characters;
  const druidas = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace(
      "/classid/",
      `6&t=${new Date().getTime()}`
    )
  );
  const druidasData = druidas.data.characters;
  const paladines = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace(
      "/classid/",
      `7&t=${new Date().getTime()}`
    )
  );
  const paladinesData = paladines.data.characters;
  const cazadores = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace(
      "/classid/",
      `8&t=${new Date().getTime()}`
    )
  );
  const cazadoresData = cazadores.data.characters;
  const trabajadores = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace(
      "/classid/",
      `9&t=${new Date().getTime()}`
    )
  );
  const trabajadoresData = trabajadores.data.characters;
  const bandidos = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace(
      "/classid/",
      `12&t=${new Date().getTime()}`
    )
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
