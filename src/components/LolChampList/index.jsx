import React from "react";

const LolChampList = ({children})=>{
  const list = React.Children.toArray(children);
  
  return(
    <ul>
      {list}
    </ul>
  );
}

export { LolChampList };