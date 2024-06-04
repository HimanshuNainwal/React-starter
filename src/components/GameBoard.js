export default function GameBoard({ board , handleChange }) {
  return (
    <ol id="game-board">
      {board?.map((outerRow, outerIndex) => {
        return (
          <li key={outerIndex}>
            <ol>
              {outerRow?.map((innerValue, innerIndex) => {
                return (
                  <li key={innerIndex}>
                    <button onClick={() =>handleChange(outerIndex,innerIndex,"X") }> {innerValue}</button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}

{/* <button onClick={() =>handleChange(0,0,"X") }> {innerValue}</button>
<button onClick={() =>handleChange(0,1,"X") }> {innerValue}</button>
<button onClick={() =>handleChange(0,2,"X") }> {innerValue}</button>
<button onClick={() =>handleChange(1,0,"X") }> {innerValue}</button>
<button onClick={() =>handleChange(1,1,"X") }> {innerValue}</button>
<button onClick={() =>handleChange(1,2,"X") }> {innerValue}</button>
<button onClick={() =>handleChange(2,0,"X") }> {innerValue}</button>
<button onClick={() =>handleChange(2,1,"X") }> {innerValue}</button>
<button onClick={() =>handleChange(2,2,"X") }> {innerValue}</button> */}

    </ol>
  );
}
