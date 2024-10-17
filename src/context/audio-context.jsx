import { createContext, useContext, useState } from "react";

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [showAudioPlay, setShowAudioPlay] = useState(false);

  return (
    <AudioContext.Provider value={{ showAudioPlay, setShowAudioPlay }}>
      {children}
    </AudioContext.Provider>
  );
};
