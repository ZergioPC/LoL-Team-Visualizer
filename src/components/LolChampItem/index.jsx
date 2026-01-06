import React from "react";
import getApiEndpoints from "../../utils/getApiEndpoints";
import "./LolChampItem.css"

const LolChampItem = ({ champ })=>{
  //console.log(champ);

  const keys = ["Q", "W", "E", "R"];
  const { champImg:URL } =  getApiEndpoints();
  
  return(
    <article className="LolChampItem">
      <h3>{champ.name}</h3>

      <figure>
        <img src={URL + champ.image.full} alt={"Foto de " + champ.id} />
      </figure>

      <ol>
        {champ.spells.map((spell,index) => (
          <li 
            key={spell.id}
          > 
            <span>{keys[index]}</span>
            <p>{spell.name}</p>
          </li>
        ))}
      </ol>
    </article>
  );
}

export { LolChampItem };