import React from "react";
import Tile from "./Tile";

type Props = {};
const width = 16;
const height = 8;

const Grid = (props: Props) => {
  return (
    <div className="grid">
      {Array.from(Array(height).keys()).map((i) => (
        <>
          {Array.from(Array(width).keys()).map((j) => (
            <Tile />
          ))}
        </>
      ))}
    </div>
  );
};

export default Grid;
