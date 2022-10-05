import React, { useRef } from "react";
import Tile from "./Tile";

type Props = {};
const width = 16;
const height = 8;

const notes = ["C5", "A4", "G4", "E4", "D4", "C4"];

const Grid = (props: Props) => {
  const childRef = useRef<any>(null);

  function handleTeste() {
    childRef?.current?.playCallback();
  }

  return (
    <div className="grid">
      <button onClick={handleTeste}>Teste</button>
      {Array.from(Array(height).keys()).map((i) => (
        <>
          {Array.from(Array(width).keys()).map((j) => {
            if (i === 0 && j === 0) {
              return <Tile note={notes[i] || "C4"} ref={childRef} />;
            }
            return <Tile note={notes[i] || "C4"} />;
          })}
        </>
      ))}
    </div>
  );
};

export default Grid;
