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
10- Bandido
*/

export const getRankingFromAO20 = async () => {
  const magos = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "1")
  );
  const clerigos = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "2")
  );
  const guerreros = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "3")
  );
  const asesinos = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "4")
  );
  const bardos = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "5")
  );
  const druidas = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "6")
  );
  const paladines = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "7")
  );
  const cazadores = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "8")
  );
  const trabajadores = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "9")
  );
  const bandidos = await axios.get(
    VITE_AO20_RANKING_ENDPOINT.replace("/classid/", "10")
  );
  return {
    magos,
    clerigos,
    guerreros,
    asesinos,
    bardos,
    druidas,
    paladines,
    cazadores,
    trabajadores,
    bandidos,
  };
};
