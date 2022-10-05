import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";

type Props = {};

const Trailer = (props: Props) => {
  return (
    <div className="trailer">
      <AiFillPlayCircle style={{ height: 80, width: 80 }} />
    </div>
  );
};

export default Trailer;
