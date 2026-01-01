import React from "react";

const LolSearch = ({ options , OnSetQuery })=>{
  console.log(options);

  return(
    <div>
      <input
        type="text" 
        placeholder="Buscar Champ"
        onChange={(e)=>OnSetQuery(e.target.value)}
      />

      <button
        type="button"
        onClick={()=>console.log("champ")}
      >Agregar</button>
      
      <ul></ul>
    </div>
  );
}

export { LolSearch };