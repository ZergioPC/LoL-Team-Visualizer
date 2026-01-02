import React from "react";

const URL = "https://ddragon.leagueoflegends.com/cdn/15.24.1/data/es_MX/champion/";

function UseGetChampData (champ){
  const [data, setData] = React.useState(null);
  
  React.useEffect(()=>{
    if(!champ) return;
    
    fetch(URL + champ + ".json")
      .then(res => res.json())
      .then((data)=>{
        setData(data.data);
      })
      .catch( e => {
        console.log(e);
      })
  },[champ]);

  return data;
}

export default UseGetChampData;