import React, { useEffect, useState } from "react";
import * as Tone from "tone";

type Props = {};

const Tile = (props: Props) => {
  const [isActive, setIsActive] = useState(false);
  const synth = new Tone.Synth().toDestination();

  useEffect(() => {
    if (isActive) {
      synth.triggerAttackRelease("C4", "8n");
    }
  }, [isActive]);

  function handleClick() {
    setIsActive((isActive) => {
      return !isActive;
    });
  }

  return (
    <div className={`tile ${isActive && "active"}`} onClick={handleClick}></div>
  );
};

export default Tile;
