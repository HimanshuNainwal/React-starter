import { useState } from "react";
import PlayerCard from "./components/PlayerCard";


// const initialPlayerNames = ["Player 1", "Player 2","Player 3","Player 4"]


function App() {

    const [players,setPlayers] = useState({
      x:"player 1",
      o:"player 2"
    })

  
  return (
    <div id="game-container">
      <ol id="players" className="highlight-player">

          <PlayerCard name={players.x} symbol={"x"}/>
          <PlayerCard name={players.o} symbol={'o'}  />
      
      </ol>
    </div>
  );
}
export default App;
