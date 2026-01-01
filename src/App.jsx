import React from 'react';
import './App.css';

import { LolSearch } from './components/LolSearch';
import { LolChampList } from './components/LolChampList';
import { LolChampItem } from './components/LolChampItem';

import UseGetChamps from './hooks/UseGetChamps';
import UseFindChamps from './hooks/UseFindChamps';

function App() {
  const ChampsInitList = UseGetChamps();

  const [query, setQuery] = React.useState("");

  return (
    <>
      <LolSearch 
        champList={UseFindChamps(query, ChampsInitList)}
        OnSetQuery={setQuery}
        onRenderOptions={
          (list)=>list.map(
            champ=>(
              <li key={champ.id}>
                <button 
                >{champ.name}
                </button>
              </li>
            )
          )
        }
      />

      <LolChampList>
        <LolChampItem />
      </LolChampList>
    </>
  )
}

export default App
