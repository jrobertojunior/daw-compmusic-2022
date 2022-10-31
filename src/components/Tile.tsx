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
};

const Tile = forwardRef((props: Props, ref) => {
  // const [props.active, setprops.active] = useState(props.active || false);
  const [isPlaying, setIsPlaying] = useState(false);
  // const synth = new Tone.Synth().toDestination();
  const [loaded, setLoaded] = useState(false);
  const synth = useRef<null | Tone.Synth<Tone.SynthOptions>>(null);

  useEffect(() => {
    synth.current = new Tone.Synth({}).toDestination();
  });

  useImperativeHandle(ref, () => ({
    playCallback() {
      if (props.active) {
        play();
      }
    },
  }));

  function play() {
    setIsPlaying(true);
    if (synth.current) {
      synth.current.triggerAttackRelease(props.note, "8n");
      setTimeout(() => {
        setIsPlaying(false);
      }, 100);
    }
  }

  function handleClick() {
    props.onChange(!props.active);
    if (!props.active) play();
    // setprops.active((props.active) => {
    //   return !props.active;
    // });
  }

  return (
    <div
      style={{
        transition: "all 0.2s ease-in-out",
        backgroundColor: props.active ? props.color || "#000" : "#fff",
        opacity: props.active ? 0.7 : 1,
      }}
      className={`tile ${props.active && "active"} ${isPlaying && "playing"}`}
      onClick={handleClick}
    ></div>
  );
});

export default Tile;