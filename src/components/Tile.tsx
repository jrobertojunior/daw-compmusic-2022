import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import * as Tone from "tone";

type Props = {
  note: string;
};

const Tile = forwardRef((props: Props, ref) => {
  const [isActive, setIsActive] = useState(false);
  const synth = new Tone.Synth().toDestination();

  useImperativeHandle(ref, () => ({
    playCallback() {
      if (isActive) {
        play();
      }
    },
  }));

  useEffect(() => {
    if (isActive) {
      play();
    }
  }, [isActive]);

  function play() {
    synth.triggerAttackRelease(props.note, "8n");
  }

  function handleClick() {
    setIsActive((isActive) => {
      return !isActive;
    });
  }

  return (
    <div
      style={{
        transition: "all 0.2s ease-in-out",
      }}
      className={`tile ${isActive && "active"}`}
      onClick={handleClick}
    ></div>
  );
});

export default Tile;
