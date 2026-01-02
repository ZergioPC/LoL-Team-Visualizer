import React from 'react';
import './App.css';

import { LolSearch } from './components/LolSearch';
import { LolChampList } from './components/LolChampList';
import { LolChampItem } from './components/LolChampItem';

import UseGetChamps from './hooks/UseGetChamps';
import UseFindChamps from './hooks/UseFindChamps';
import UseGetChampData from './hooks/UseGetChampData';

// DOC API https://developer.riotgames.com/docs/lol#data-dragon_champions
//Get Images https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/

function App() {
  const ChampsInitList = UseGetChamps();
  
  const [query, setQuery] = React.useState("");
  const [champ, setChamp] = React.useState(null);

  // Los HOOKS no se llaman en el Return
  const champData = UseGetChampData(champ);
  console.log(champData);
  

  return (
    <>
      <LolSearch 
        champList={UseFindChamps(query, ChampsInitList)}
        OnSetQuery={setQuery}
        OnFetchData={(champ) => setChamp(champ)}
      />

      <LolChampList>
        <LolChampItem />
      </LolChampList>
    </>
  )
}

export default App
