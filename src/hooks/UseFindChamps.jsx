import React from "react";

function UseFindChamps (query,list){
  const maxLenght = 5;
  const [results, setResults] = React.useState([]);

  React.useEffect(()=>{
    const newArray = [];

    for (const key in list) {
      if (query.length === 0 || newArray.length > maxLenght) break;
      
      const champ = list[key].name.toLowerCase();
      if(champ.includes(query.toLowerCase())){
        newArray.push(list[key]);
      }
    }
    setResults(newArray);
  },[query]);

  return results;
}

export default UseFindChamps;