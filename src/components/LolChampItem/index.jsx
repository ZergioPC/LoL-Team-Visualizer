import React from "react";
import UseApiEndpoints from "../../hooks/UseApiEndpoints";

const LolChampItem = ({ champ })=>{
  //console.log(champ);
  
  const { champImg:URL } =  UseApiEndpoints();
  return(
    <article>
      <section>
        <h3>{champ.name}</h3>
      </section>
      <figure>
        <img src={URL + champ.image.full} alt={champ.id + "_avatar"} />
      </figure>
      <ul>
        {champ.spells.map(spell => (
          <li key={spell.id}>{spell.name}</li>
        ))}
      </ul>
    </article>
  );
}

export { LolChampItem };