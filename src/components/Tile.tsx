import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import * as Tone from "tone";

type Props = {};

const Tile = forwardRef((props: Props, ref) => {
  const [isActive, setIsActive] = useState(false);
  const synth = new Tone.Synth().toDestination();

  useImperativeHandle(ref, () => ({
    playCallback() {
      synth.triggerAttackRelease("C4", "8n");
    },
  }));

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
});

export default Tile;
