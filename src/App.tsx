import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Grid from "./components/Grid";
import Trailer from "./components/Trailer";

function Tile() {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    setIsActive(!isActive);
  }

  return (
    <div
      style={{
        height: 80,
        width: 120,
        border: "1px solid grey",
        background: isActive ? "white" : "black",
      }}
      onClick={handleClick}
    ></div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  const grid = { height: 4, zwidth: 8 };

  return (
    <div className="main">
      <Grid />
      <Trailer />
      {/* <h1>DAW</h1>
      <div>
        {Array.from(Array(grid.height).keys()).map((i) => (
          <div className="row">
            {Array.from(Array(grid.width).keys()).map((j) => (
              <Tile />
            ))}
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default App;
