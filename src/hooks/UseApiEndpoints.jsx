import React from "react";

function UseApiEndpoints (){
  const URL = "https://ddragon.leagueoflegends.com/cdn/15.24.1"

  const CHAMPS_LIST = "/data/es_MX/champion.json";
  const CHAMP_DATA = "/data/es_MX/champion/";
  const CHAMP_IMG = "/img/champion/"

  return {
    champData: URL + CHAMP_DATA,
    champList: URL + CHAMPS_LIST,
    champImg: URL + CHAMP_IMG
  }
}
export default UseApiEndpoints;