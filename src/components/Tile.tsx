import React, { forwardRef, useEffect, useRef, useState } from "react";
import * as Tone from "tone";

type Props = {
  note: string;
  color?: string;
  active?: boolean;
  onClick?: () => void;
  playNow?: number;
  darken?: boolean;
};

const Tile = forwardRef((props: Props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const synth = useRef<null | Tone.Synth<Tone.SynthOptions>>(null);

  useEffect(() => {
    synth.current = new Tone.Synth({}).toDestination();
  }, []);

  useEffect(() => {
    if (!synth.current || !props.playNow) return;

    play();
  }, [props.playNow]);

  function play() {
    setIsPlaying(true);
    if (synth.current) {
      synth.current.triggerAttackRelease(props.note, "8n");
      setTimeout(() => {
        setIsPlaying(false);
      }, 100);
    }
  }

  return (
    <div
      style={{
        filter: props.darken ? "brightness(0.5)" : "brightness(1)",
        transition: "all 0.2s ease-in-out",
        backgroundColor: props.active ? props.color || "#000" : "#fff",
        opacity: props.active ? 0.7 : 1,
      }}
      className={`tile ${props.active && "active"} ${isPlaying && "playing"}`}
      onClick={props.onClick}
    ></div>
  );
});

export default Tile;
