import React from 'react';
import './App.css';

import { LolSearch } from './components/LolSearch';
import { LolChampList } from './components/LolChampList';
import { LolChampItem } from './components/LolChampItem';
import { LolChampItemLoad } from './components/LolChampItemLoad';

import { Modal } from './components/Modal';

import UseTeamsLogic from './hooks/UseTeamsLogic';
import UseGetChamps from './hooks/UseGetChamps';

import findChamps from './utils/findChamps';
import getApiEndpoints from './utils/getApiEndpoints';
import checkNoRepeatData from './utils/checkNoRepeatData';

// DOC API https://developer.riotgames.com/docs/lol#data-dragon_champions

const TeamTypes = {
  blue: "BLUE",
  red: "RED"
}

function App() {
  const URLs = getApiEndpoints()
  const champsInitList = UseGetChamps(URLs.champList);

  // MARK: Load-Error 
  const [modal, setModal] = React.useState({
    visible: false,
    message: ""
  });

  const setShowModal = (txt)=>{
    setModal({
      ...modal,
      visible: true,
      message: txt
    });
  }

  const [loading, setLoading] = React.useState({
    blue:false, red:false
  });

  const setBlueLoading = ()=> setLoading({
    ...loading,
    blue:true
  });

  const setRedLoading = ()=> setLoading({
    ...loading,
    red:true
  });

  const setStopLoading = ()=> setLoading({
    blue:false, 
    red:false
  });
  
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

    switch(search.team){
      case TeamTypes.blue :   
        if (blueTeam.length >= 5) {
          setShowModal(
            "Solo 5 campeones por equipo"
          );
          return;
        }     

        if (checkNoRepeatData(search.champId, blueTeam)){
          setShowModal(
            "No se puede repetir campeón en un mismo equipo"
          );
          return;
        }
        setBlueLoading();
        break;
      case TeamTypes.red :
        if (redTeam.length >= 5) {
          setShowModal(
            "Solo 5 campeones por equipo"
          );
          return;
        }     

        if (checkNoRepeatData(search.champId, redTeam)){
          setShowModal(
            "No se puede repetir campeón en un mismo equipo"
          );
          return;
        }
        setRedLoading();
        break;
    }
    
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
    setStopLoading();

    switch (team) {
      case TeamTypes.blue:
        setBlueChamp(champ);
        return;
      case TeamTypes.red:
        setRedChamp(champ)
        return;
    }
  } 

  const blueChampList = findChamps(search.queryBlue, champsInitList);
  const redChampList  = findChamps(search.queryRed, champsInitList);

  return (
    <>
    <button 
      className='info'
      onClick={()=> setShowModal(
        <>
          <h1>LoL Team Champs view</h1>
          <span><i>por Sergio Palacios</i></span>
          <p>
            Organiza y Crea equipos con Campeones de <b>League of Legends</b> con el fin de visualizar sus habilidades de forma más comoda y rapida.
          </p>
        </>
      )}
    >?</button>

    <main className='teams-panel'>
      <section className='blue-team'>
        <LolSearch
          query={search.queryBlue} 
          teamName="Equipo Azul"
          champList={blueChampList}
          OnSetQuery={setQueryBlueSearch}
          OnAddChamp={(champ)=>{
            setChampTeamSearch(
              champ, TeamTypes.blue
            );
          }}
        />

        <LolChampList>
          {blueTeam.map(
            (champ, index) => 
              <LolChampItem 
                key={index} 
                id={champ.id} 
                champ={champ}
                OnRemove={(id)=> rmBlueChamp(id)}
              />
          )}
          {loading.blue && <LolChampItemLoad />}
        </LolChampList>
      </section>
            
      <section className='red-team'>
        <LolSearch
          query={search.queryRed} 
          teamName="Equipo Rojo"
          champList={redChampList}
          OnSetQuery={setQueryRedSearch}
          OnAddChamp={(champ)=>{
            setChampTeamSearch(
              champ, TeamTypes.red
            );
          }}
        />

        <LolChampList>
          {redTeam.map(
            (champ, index) => 
              <LolChampItem 
                key={index} 
                id={champ.id} 
                champ={champ}
                OnRemove={(id)=> rmRedChamp(id)}
              />
          )}
          {loading.red && <LolChampItemLoad />}
        </LolChampList>
      </section>
      </main>

      {modal.visible && <Modal onClose={()=> setModal(false)}>
          <div>{modal.message}</div>
      </Modal>}
    </>
  )
}

export default App
