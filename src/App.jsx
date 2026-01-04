import React from 'react';
import './App.css';

import { LolSearch } from './components/LolSearch';
import { LolChampList } from './components/LolChampList';
import { LolChampItem } from './components/LolChampItem';

import UseApiEndpoints from './hooks/UseApiEndpoints';
import UseTeamsLogic from './hooks/UseTeamsLogic';
import UseGetChamps from './hooks/UseGetChamps';
import UseFindChamps from './hooks/UseFindChamps';

// DOC API https://developer.riotgames.com/docs/lol#data-dragon_champions

const TeamTypes = {
  blue: "BLUE",
  red: "RED"
}

function App() {
  const URLs = UseApiEndpoints()
  const champsInitList = UseGetChamps(URLs.champList);
  
  // MARK: Search
  const [search, setSearch] = React.useState(
    { queryRed: "", queryBlue: "", champId: null, team: null }
  );
  
  const setQueryBlueSearch = (value)=> setSearch({
    ...search,
    queryBlue: value,
  });

  const setQueryRedSearch = (value)=> setSearch({
    ...search,
    queryRed: value,
  });

  const setChampTeamSearch = (id, team)=> setSearch({
    ...search,
    queryRed: "",
    queryBlue: "",
    champId: id,
    team: team
  });

  React.useEffect(()=>{
    if (!search.champId) return;
    
    fetch(URLs.champData + search.champId + ".json")
    .then(res => res.json())
    .then(data => {
      addTeamChamp(search.team, data.data[search.champId]);
    }).catch(e => console.log("ERROR CHE: ", e));
    
  },[search.champId, search.team]);

  // MARK: Teams
  const {
    blueTeam, 
    redTeam, 
    setBlueChamp, 
    setRedChamp,
    rmBlueChamp,
    rmRedChamp
  } = UseTeamsLogic();

  function addTeamChamp(team, champ){    
    switch (team) {
      case TeamTypes.blue:
        setBlueChamp(champ);
        return;
      case TeamTypes.red:
        setRedChamp(champ)
        return;
    }
  }

  return (
    <>
      <section>
        <h2>Equipo Azul</h2>

        <LolSearch 
          champList={UseFindChamps(search.queryBlue, champsInitList)}
          OnSetQuery={setQueryBlueSearch}
          OnAddChamp={(champ)=>{
            setChampTeamSearch(
              champ, TeamTypes.blue
            );
          }}
        />

        <LolChampList>
          {blueTeam.map(
            champ => <LolChampItem key={champ.id} champ={champ}/>
          )}
        </LolChampList>
      </section>

      <section>
        <h2>Equipo Rojo</h2>

        <LolSearch 
          champList={UseFindChamps(search.queryRed, champsInitList)}
          OnSetQuery={setQueryRedSearch}
          OnAddChamp={(champ)=>{
            setChampTeamSearch(
              champ, TeamTypes.red
            );
          }}
        />

        <LolChampList>
          {redTeam.map(
            champ => <LolChampItem key={champ.id} champ={champ}/>
          )}
        </LolChampList>
      </section>
    </>
  )
}

export default App
