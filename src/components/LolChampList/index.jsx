import React from "react";
import './LolChampList.css'

const LolChampList = ({children})=>{
  const list = React.Children.toArray(children);
  
  return(
    <main>
      <ul className="LolChampList">
        {list}
      </ul>
    </main>
  );
}

export { LolChampList };