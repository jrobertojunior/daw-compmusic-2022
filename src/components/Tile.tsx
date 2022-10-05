import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import * as Tone from "tone";

type Props = {
  note: string;
  color?: string;
};

const Tile = forwardRef((props: Props, ref) => {
  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const synth = new Tone.Synth().toDestination();

  useImperativeHandle(ref, () => ({
    playCallback() {
      if (isActive) {
        play();
      }
    },
  }));

  function play() {
    setIsPlaying(true);
    synth.triggerAttackRelease(props.note, "8n");
    setTimeout(() => {
      setIsPlaying(false);
    }, 100);
  }

  function handleClick() {
    setIsActive((isActive) => {
      if (!isActive) play();
      return !isActive;
    });
  }

  return (
    <div
      style={{
        transition: "all 0.2s ease-in-out",
        backgroundColor: isActive ? props.color || "#000" : "#fff",
        opacity: isActive ? 0.7 : 1,
      }}
      className={`tile ${isActive && "active"} ${isPlaying && "playing"}`}
      onClick={handleClick}
    ></div>
  );
});

export default Tile;
