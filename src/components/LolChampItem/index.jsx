import React from "react";

const LolChampItem = ({ champ })=>{
  //console.log(champ);
  
  return(
    <article>
      {champ.name}
    </article>
  );
}

export { LolChampItem };