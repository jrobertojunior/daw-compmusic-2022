import React, { forwardRef, useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import kick from "../assets/kick.mp3";
import snare from "../assets/snare.mp3";
import hihat from "../assets/hihat.mp3";

type Props = {
  note: string;
  color?: string;
  active?: boolean;
  onClick?: () => void;
  playNow?: number;
  darken?: boolean;
  drum?: "kick" | "snare" | "hihat";
};

const drums = {
  kick,
  snare,
  hihat,
};

const Tile = (props: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const synth = useRef<null | Tone.Synth<Tone.SynthOptions>>(null);
  const player = useRef<null | Tone.Player>(null);

  useEffect(() => {
    if (props.drum) {
      player.current = new Tone.Player({
        url: drums[props.drum],
      }).toDestination();
      return;
    }

    synth.current = new Tone.Synth({}).toDestination();
  }, []);

  useEffect(() => {
    if (!props.playNow) return;

    if (props.drum && !player.current) return;

    if (!props.drum && !synth.current) return;

    play();
  }, [props.playNow]);

  function play() {
    setIsPlaying(true);

    if (props.drum) {
      player.current!.start();
    } else {
      synth.current!.triggerAttackRelease(props.note, "8n");
    }

    setTimeout(() => {
      setIsPlaying(false);
    }, 100);
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
};

export default Tile;
