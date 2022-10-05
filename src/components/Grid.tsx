import React, { useRef } from "react";
import Tile from "./Tile";

type Props = {};
const width = 16;
const height = 8;

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
              return <Tile ref={childRef} />;
            }
            return <Tile />;
          })}
        </>
      ))}
    </div>
  );
};

export default Grid;
