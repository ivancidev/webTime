import { useEffect, useState } from "react";

export const useAudioDuration = (audioUrl) => {
  const [duration, setDuration] = useState(null);
  useEffect(() => {
    const audio = new Audio(audioUrl);
    const fetchDuration = () => {
      audio.onloadedmetadata = () => {
        const durationInMinutes = audio.duration / 60;
        setDuration(durationInMinutes);
      };
    };
    if (audioUrl) {
      fetchDuration();
    }
    return () => {
      audio.pause();
    };
  }, [audioUrl]);
  return duration;
};
