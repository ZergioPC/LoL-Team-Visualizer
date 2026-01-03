import React from 'react';
import './App.css';

import { LolSearch } from './components/LolSearch';
import { LolChampList } from './components/LolChampList';
import { LolChampItem } from './components/LolChampItem';

import UseApiEndpoints from './hooks/UseApiEndpoints';

import UseGetChamps from './hooks/UseGetChamps';
import UseFindChamps from './hooks/UseFindChamps';

// DOC API https://developer.riotgames.com/docs/lol#data-dragon_champions

const TeamTypes = {
  blue: "BLUE",
  red: "RED"
}

const searchStateInit = {
  query: "",
  champId: null,
  team: null
}

function addTeamChamp(team, champ){
  switch (team) {
    case TeamTypes.blue:
      console.log("blue");
      return;
    case TeamTypes.red:
      console.log(champ);
      return;
  }
}

function App() {
  const {
    blueTeam, 
    redTeam, 
    setBlueChamp, 
    setRedTeam
  } = UseTeamsLogic();
  const URLs = UseApiEndpoints()
  const champsInitList = UseGetChamps(URLs.champList);
  
  const [search, setSearch] = React.useState(searchStateInit);
  
  const setQuerySearch = (value)=> setSearch({
    ...search,
    query: value
  });

  const setChampIdSearch = (value)=> setSearch({
    ...search,
    champId: value
  });

  const setTeamSearch = (value)=> setSearch({
    ...search,
    team: value
  });

  React.useEffect(()=>{
    if (!search.champId) return;

    fetch(URLs.champData + search.champId + ".json")
      .then(res => res.json())
      .then(data => {
        console.log(data.data[search.champId]);
      })
      .catch(e => console.log("ERROR E: ", e));
    
  },[search.champId]);

  return (
    <>
      <LolSearch 
        champList={UseFindChamps(search.query, champsInitList)}
        OnSetQuery={setQuerySearch}
        OnAddChamp={(champ)=>{
          setTeamSearch(TeamTypes.blue);
          setChampIdSearch(champ);
        }}
      />

      <LolChampList>
        <LolChampItem />
      </LolChampList>
    </>
  )
}

export default App
