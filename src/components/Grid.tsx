import React, { useEffect, useRef, useState } from "react";
import Tile from "./Tile";
import Tile2 from "./Tile2";

type Props = {};
const width = 8; //16;
const height = 8; //13;
// gridmap is a 2d array of booleans
// true means the tile is active
// false means the tile is inactive

const notes = ["A4", "G4", "E4", "D4", "C4", "A3", "G3", "E3", "D3", "C3"];

// 10 rainbow colors, but the first five are the same as the last five but with more opacity
const colors = [
  "#4f86c6",
  "#ed254e",
  "#f9dc5c",
  "#C9F8F0",
  "#011936",
  "#4f86c6",
  "#ed254e",
  "#f9dc5c",
  "#C9F8F0",
  "#011936",
];

const Grid = (props: Props) => {
  const childRef = useRef<any>(null);
  const refs = useRef<any>([]);
  refs.current = [];
  const [gridMap, setGridMap] = useState(
    Array.from({ length: height }, (_, i) =>
      Array.from({ length: width }, (_, j) => (i + j) % 2 === 0)
    )
  );

  function playTile(i: number, j: number) {
    setPlayNowCounter((playNowCounter) => {
      const _playNowCounter = [...playNowCounter];
      _playNowCounter[0] = _playNowCounter[0] + 1;
      return _playNowCounter;
    });
  }

  const [activeGrid, setActiveGrid] = useState<boolean[]>([false]);
  const [playNowCounter, setPlayNowCounter] = useState<number[]>([0]);

  return (
    <div className="grid">
      <Tile2
        active={activeGrid[0]}
        onChange={(active) => {
          setActiveGrid((activeGrid) => {
            const _active = [...activeGrid];
            _active[0] = active;
            return _active;
          });
        }}
        onClick={() => {
          setActiveGrid((activeGrid) => {
            const _active = [...activeGrid];
            _active[0] = !_active[0];
            _active[0] && playTile(0, 0);
            return _active;
          });
        }}
        playNow={playNowCounter[0]}
        color={colors[0]}
        note={notes[0]}
      />
      <button
        onClick={() =>
          setPlayNowCounter((playNowCounter) => {
            const _playNowCounter = [...playNowCounter];
            _playNowCounter[0] = _playNowCounter[0] + 1;
            return _playNowCounter;
          })
        }
      >
        teste
      </button>
      {/* {Array.from({ length: height }, (_, i) => (
        <>
          {Array.from({ length: width }, (_, j) => {
            return (
              <Tile2
                active={gridMap[i][j]}
                onChange={(active) => {
                  console.log(active);
                  setGridMap((gridMap) => {
                    const newGridMap = [...gridMap];
                    newGridMap[i][j] = active;
                    return newGridMap;
                  });
                }}
                color={colors[i]}
                note={notes[i] || "C4"}
              />
            );
          })}
        </>
      ))} */}
    </div>
  );
};

export default Grid;

/*
  - um grid controla as notas que estã ativas
*/
