import React, { useEffect, useRef, useState } from "react";
import Tile from "./Tile";

type Props = {};
const width = 16;
const height = 13;
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
  const [activeGrid, setActiveGrid] = useState<boolean[][]>(
    Array.from({ length: height }, (_, i) =>
      Array.from({ length: width }, (_, j) => false)
    )
  );
  const [playNowCounter, setPlayNowCounter] = useState<number[][]>(
    Array.from({ length: height }, (_, i) =>
      Array.from({ length: width }, (_, j) => 0)
    )
  );

  const [darkenColumn, setDarkenColumn] = useState<boolean[]>(
    Array.from({ length: width }, (_, i) => false)
  );

  function playTile(i: number, j: number) {
    setPlayNowCounter((playNowCounter) => {
      const _playNowCounter = [...playNowCounter];
      _playNowCounter[i][j] = _playNowCounter[i][j] + 1;
      return _playNowCounter;
    });
  }

  function changeTileActive(i: number, j: number) {
    const _active = [...activeGrid];
    _active[i][j] = !_active[i][j];
    _active[i][j] && playTile(i, j);
    setActiveGrid(_active);
  }

  function playAll() {
    activeGrid.forEach((row, i) => {
      row.forEach((active, j) => {
        active && playTile(i, j);
      });
    });
  }

  function playColumn(j: number) {
    activeGrid.forEach((row, i) => {
      row[j] && playTile(i, j);
    });
  }

  const [playbackInterval, setPlaybackInterval] = useState<number>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playingCol2, setPlayingCol2] = useState(0);

  let playingCol = 0;
  function start() {
    setIsPlaying(true);
    setPlaybackInterval(
      setInterval(() => {
        playColumn(playingCol);
        setDarkenColumn(
          Array.from({ length: width }, (_, i) => i === playingCol)
        );
        playingCol = (playingCol + 1) % width;
      }, 500)
    );
  }

  function stop() {
    setIsPlaying(false);
    clearInterval(playbackInterval);
    setDarkenColumn(Array.from({ length: width }, (_, i) => false));
    playingCol = 0;
  }

  function clear() {
    setActiveGrid(
      Array.from({ length: height }, (_, i) =>
        Array.from({ length: width }, (_, j) => false)
      )
    );
    stop();
  }

  return (
    <div className="grid">
      {Array.from({ length: height }, (_, i) => (
        <>
          {Array.from({ length: width }, (_, j) => {
            return (
              <Tile
                key={`${i}-${j}`}
                active={activeGrid[i][j]}
                onClick={() => changeTileActive(i, j)}
                playNow={playNowCounter[i][j]}
                color={colors[i]}
                note={notes[i] || "C4"}
                darken={darkenColumn[j]}
              />
            );
          })}
        </>
      ))}
      {isPlaying ? (
        <button onClick={stop}>Stop</button>
      ) : (
        <button onClick={start}>Start</button>
      )}
      <button onClick={clear}>Clear</button>
    </div>
  );
};

export default Grid;

/*
  - um grid controla as notas que estã ativas
*/
