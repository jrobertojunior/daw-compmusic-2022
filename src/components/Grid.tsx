import React, { useEffect, useRef } from "react";
import Tile from "./Tile";

type Props = {};
const width = 16;
const height = 13;

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

  // play a note when spacebar is pressed
  useEffect(() => {
    function detectKeyDown(e: KeyboardEvent) {
      if (e.key === " ") {
        // childRef.current.playCallback();
        spacebarPressed();
      }
    }
    document.addEventListener("keydown", detectKeyDown, true);
  });

  function spacebarPressed() {
    console.log(refs.current);
    refs.current[0].playCallback();

    // for (let i = 0; i < refs.current.length; i++) {
    //   if (refs.current[i].playCallback) {
    //     refs.current[i].playCallback?.();
    //   }
    // }
  }

  function handleTeste() {
    childRef?.current?.playCallback();
  }

  function addToRefs(el: HTMLElement) {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  }

  return (
    <div className="grid">
      {Array.from(Array(height).keys()).map((i) => (
        <>
          {Array.from(Array(width).keys()).map((j) => {
            if (i === 0 && j === 0) {
              return <Tile note={notes[i] || "C4"} ref={addToRefs} />;
            }
            return <Tile color={colors[i]} note={notes[i] || "C4"} />;
          })}
        </>
      ))}
    </div>
  );
};

export default Grid;
