import React from 'react';
import './App.css';

import { LolSearch } from './components/LolSearch';
import { LolChampList } from './components/LolChampList';
import { LolChampItem } from './components/LolChampItem';

import UseFetchApi from './hooks/UseFetchApi';

function App() {
  const [query, setQuery] = React.useState("");
  const data = UseFetchApi(query);

  return (
    <>
      <LolSearch 
        query={query}
        OnSetQuery={setQuery}
      />

      <LolChampList>
        <LolChampItem />
      </LolChampList>
    </>
  )
}

export default App
