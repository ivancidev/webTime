import React, { useState, useRef } from "react";
import { BookInfo } from "./book-info";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import Play from "../../../icons/play";
import Pause from "../../../icons/pause";
import Volume from "../../../icons/volume";
import Button from "../../../components/buttons/button";

export const AudioPlayer = (audioB) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-transparent p-4 text-white flex justify-center items-center">
      <div className="flex flex-row">
        <p className="font-body text-body-sm text-neutral-neu2">00:00</p>
        <Button text="Velocidad" />
      </div>

      <div className="w-full">
        <audio ref={audioRef} src={audioB}></audio>
        {isPlaying ? (
          <ButtonIcon
            onClick={handlePlayPause}
            SvgIcon={Pause}
            variant="combColPlay"
          />
        ) : (
          <ButtonIcon
            onClick={handlePlayPause}
            SvgIcon={Play}
            variant="combColPlay"
          />
        )}
      </div>

      <div className="flex flex-row space-x-4">
        <div>
          <Volume />
          <div>barra</div>
        </div>
        <p className="font-body text-body-sm text-neutral-neu2">00:00</p>
      </div>
    </div>
  );
};
