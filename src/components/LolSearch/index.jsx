import React from "react";

const LolSearch = ({ champList , OnSetQuery, OnAddChamp })=>{
  return(
    <div>
      <input
        type="text" 
        placeholder="Buscar Champ"
        onChange={(e)=>OnSetQuery(e.target.value)}
      />
      
      <ul>
        {champList.map( champ =>(
          <li key={champ.id}>
            <button
              onClick={()=> OnAddChamp(champ.id)} 
            >{champ.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { LolSearch };