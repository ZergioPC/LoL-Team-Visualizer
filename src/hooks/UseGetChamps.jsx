import React from "react";

function UseGetChamps (){
  const [data, setData] = React.useState(null);
  React.useEffect(()=>{
    fetch("https://ddragon.leagueoflegends.com/cdn/15.24.1/data/es_MX/champion.json")
      .then(res => res.json())
      .then((data)=>{
        setData(data.data);
      })
      .catch( e => {
        console.log(e);
      })
  },[]);

  return data;
}

export default UseGetChamps;