import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import * as Tone from "tone";

type Props = {
  note: string;
  color?: string;
  active?: boolean;
  onChange: (active: boolean) => void;
  onClick?: () => void;
  playNow?: number;
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
      console.log("playing");
      synth.current.triggerAttackRelease(props.note, "8n");
      setTimeout(() => {
        setIsPlaying(false);
      }, 100);
    }
  }

  function handleClick() {
    // props.onChange(!props.active);
    // if (!props.active) play();
  }

  return (
    <div
      style={{
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
