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
    console.log(id);
  }

  const setRedChamp = (newChamp) => {
    if (redTeam.length >= 5) return;
    setRedTeam([
      ...redTeam,
      newChamp
    ]);
  };

  const rmRedChamp = (id) => {
    console.log(id);
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