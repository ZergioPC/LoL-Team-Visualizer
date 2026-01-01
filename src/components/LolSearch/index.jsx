import React from "react";

const LolSearch = ({ champList , OnSetQuery, onRenderOptions })=>{
  return(
    <div>
      <input
        type="text" 
        placeholder="Buscar Champ"
        onChange={(e)=>OnSetQuery(e.target.value)}
      />
      
      <ul>
        {onRenderOptions(champList)}
      </ul>
    </div>
  );
}

export { LolSearch };