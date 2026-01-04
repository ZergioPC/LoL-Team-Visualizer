import React from "react";

function UseGetChamps (URL){
  const [data, setData] = React.useState(null);
  React.useEffect(()=>{
    fetch(URL)
      .then(res => res.json())
      .then((data)=>{
        setData(data.data);
      })
      .catch(e=>{
        console.log(e);
      })
  },[]);

  return data;
}

export default UseGetChamps;