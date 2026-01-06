import React from "react";

function UseTeamsLogic (){
  const [blueTeam, setBlueTeam] = React.useState([]);
  const [redTeam, setRedTeam] = React.useState([]);

  const setBlueChamp = (newChamp) => {
    if (blueTeam.length >= 5) return;
    setBlueTeam([
      ...blueTeam,
      newChamp
    ]);
  };

  const rmBlueChamp = (id) => {
    const newArray = blueTeam.filter(
      champ => champ.id !== id
    );
    setBlueTeam(newArray);
  }

  const setRedChamp = (newChamp) => {
    if (redTeam.length >= 5) return;
    setRedTeam([
      ...redTeam,
      newChamp
    ]);
  };

  const rmRedChamp = (id) => {
    const newArray = redTeam.filter(
      champ => champ.id !== id
    );
    setRedTeam(newArray);
  }

  return {
    blueTeam, 
    redTeam, 
    setBlueChamp, 
    setRedChamp,
    rmBlueChamp,
    rmRedChamp
  };
}

export default UseTeamsLogic;