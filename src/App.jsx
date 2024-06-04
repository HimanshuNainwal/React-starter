import { useState } from "react";
import PlayerCard from "./components/PlayerCard";
import GameBoard from "./components/GameBoard";

// const initialPlayerNames = ["Player 1", "Player 2","Player 3","Player 4"]

const initialArray = [
  [null, null, null], //0
  [null, null, null], // 1
  [null, null, null], //2
];

function App() {
  const [boardValues, setBardValues] = useState(initialArray);
  const [players, setPlayers] = useState({
    x: "player 1",
    o: "player 2",
  });

  const handleSetBoardValue = (outerIndex, innerIndex, value) => {
    const updatedBoard = boardValues.map((outerRow, index) => {
      return outerRow.map((innerRow, index2) => {
        // true , null , 0 , false , "" , undefined
        if (innerRow !== null) {

          return innerRow;
          
        } else if (outerIndex == index && innerIndex == index2) {
          return value; // x or y
        } else {
          return innerRow; // null
        }
      });
    });

    setBardValues(updatedBoard);
  };
  // console.log("boardValues", boardValues);
  return (
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <PlayerCard name={players.x} symbol={"x"} />
        <PlayerCard name={players.o} symbol={"o"} />
      </ol>

      <GameBoard board={boardValues} handleChange={handleSetBoardValue} />
    </div>
  );
}
export default App;
