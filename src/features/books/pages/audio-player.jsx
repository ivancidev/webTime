import React, { useState, useRef, useEffect } from "react";
import Play from "../../../icons/play";
import Pause from "../../../icons/pause";
import Volume from "../../../icons/volume";
import StartAudio from "../../../icons/startAudio";
import Back10 from "../../../icons/back10";
import Forward10 from "../../../icons/forward10";
import EndAudio from "../../../icons/endAudio";
import CloseIcon from "../../../icons/close";
import Mute from "../../../icons/mute";
import Button from "../../../components/buttons/button";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import { updateDailyStatistics } from '../../../services/streakService';

export const AudioPlayer = ({ setShowAudioPlayer, urlAudio }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [showVerticalSlider, setShowVerticalSlider] = useState(false);
  const audioKey = `audioProgress_${urlAudio}`;

  const user = JSON.parse(localStorage.getItem("user"));

  const [startTime, setStartTime] = useState(null);
  const [listeningTime, setListeningTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const savedProgress = localStorage.getItem(audioKey);
    if (savedProgress) {
      audio.currentTime = parseFloat(savedProgress); 
      setCurrentTime(parseFloat(savedProgress));
    }

    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);

      localStorage.setItem(audioKey, audio.currentTime);
    };

    const handleAudioEnd = () => {
      setIsPlaying(false);
      localStorage.removeItem(audioKey); 
    };

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("ended", handleAudioEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("ended", handleAudioEnd);
  
      let totalListeningTime = listeningTime;
  
      if (startTime) {
        const elapsedTime = Date.now() - startTime;
        totalListeningTime += elapsedTime;
        setStartTime(null);
      }
  
      const totalListeningTimeInSeconds = totalListeningTime / 1000;
      console.log(`Tiempo total escuchado al desmontar: ${totalListeningTimeInSeconds} segundos`);
  
      // Actualizar el objeto user en localStorage
      const user = JSON.parse(localStorage.getItem("user")) || {};
      user.listeningTime = (user.listeningTime || 0) + totalListeningTimeInSeconds;
      localStorage.setItem("user", JSON.stringify(user));
    };
  }, [audioKey]);

  useEffect(() => {
    if (isPlaying) {
      // Si el audio está reproduciéndose, inicia o reanuda el cronómetro
      if (!startTime) {
        setStartTime(Date.now());
      }
    } else {
      // Si el audio está pausado, detiene el cronómetro y acumula el tiempo
      if (startTime) {
        const elapsedTime = Date.now() - startTime;
        setListeningTime((prevTime) => prevTime + elapsedTime);
        setStartTime(null);
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    if (newVolume === "0") {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleClick = () => {
    if (window.innerWidth >= 1024) {
      handleMuteUnmute();
    } else {
      setShowVerticalSlider(!showVerticalSlider);
    }
  };

  const handleMuteUnmute = () => {
    if (isMuted) {
      audioRef.current.volume = previousVolume;
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      audioRef.current.volume = 0;
      setVolume(0);
    }
    setIsMuted(!isMuted);
  };

  const handlePlaybackRateChange = (rate) => {
    audioRef.current.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSpeedOptions(false);
  };

  const skipTime = (seconds) => {
    const audio = audioRef.current;
    audio.currentTime = Math.min(
      Math.max(audio.currentTime + seconds, 0),
      duration
    );
  };

  const handleClose = async () => {
    let totalListeningTime = listeningTime;
  
    if (startTime) {
      const elapsedTime = Date.now() - startTime;
      totalListeningTime += elapsedTime;
      setStartTime(null);
    }
  
    const totalListeningTimeInSeconds = totalListeningTime / 1000;
    const totallearning_minutes = totalListeningTimeInSeconds / 60;
  
    console.log(`Tiempo total escuchado: ${totalListeningTimeInSeconds} segundos`);
  
    const user = JSON.parse(localStorage.getItem("user")) || {};
    user.listeningTime = (user.listeningTime || 0) + totalListeningTimeInSeconds;
    localStorage.setItem("user", JSON.stringify(user));
  
    try {
      await updateDailyStatistics(user.id_usuario, totallearning_minutes);
      console.log('Estadísticas diarias actualizadas en la base de datos');
    } catch (error) {
      console.error('Error al actualizar las estadísticas diarias en la base de datos:', error);
    }
  
    setShowAudioPlayer(false);
  };
  

  const rewindToStart = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);
  };

  const jumpToEnd = () => {
    const audio = audioRef.current;
    audio.currentTime = duration;
    audio.play();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value * duration) / 100;
    audio.currentTime = newTime;
  };

  const playbackRates = [1, 1.25, 1.5, 1.75, 2];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary-pri3 justify-center items-center flex flex-col h-[80px] text-primary-pri1">
      <audio ref={audioRef} src={urlAudio} preload="metadata" />
      <div className="flex flex-col items-center w-full px-2 md:px-12 ">
        <input
          type="range"
          min="0"
          max="100"
          value={duration ? (currentTime / duration) * 100 : 0}
          onChange={handleProgressChange}
          className="w-full h-[6px]  rounded-lg  cursor-pointer accent-secondary-sec1"
        />
      </div>
      <div className="w-full flex flex-row justify-between font-body text-body-md pt-2">
        <span className="pl-2 md:pl-12">{formatTime(currentTime)}</span>

        <div className="w-full flex sm:flex-row justify-between pt-1 z-50">
          <div className=" w-1/6 flex flex-row justify-end relative pt-1">
            <Button
              text={
                <>
                  <span className="hidden lg:inline">Velocidad</span>{" "}
                  {`${playbackRate}x`}
                </>
              }
              onClick={() => setShowSpeedOptions(!showSpeedOptions)}
              variant="combCol4"
            />
            {showSpeedOptions && (
              <ul className="absolute bottom-full mb-2 bg-primary-pri3 shadow-lg rounded">
                {playbackRates.map((rate) => (
                  <li
                    key={rate}
                    onClick={() => handlePlaybackRateChange(rate)}
                    className=" hover:bg-neutral-neu2 font-label h-10 px-6 text-label-sm text-center flex flex-col justify-center cursor-pointer"
                  >
                    {rate}x
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex items-center justify-center space-x-2 md:space-x-4 md:w-3/5">
            <ButtonIcon
              onClick={rewindToStart}
              SvgIcon={StartAudio}
              variant="combColBlack"
            />
            <ButtonIcon
              onClick={() => skipTime(-10)}
              SvgIcon={Back10}
              variant="combColBlack"
            />
            {isPlaying ? (
              <ButtonIcon
                onClick={handlePlayPause}
                SvgIcon={Pause}
                variant="combColBlack"
              />
            ) : (
              <ButtonIcon
                onClick={handlePlayPause}
                SvgIcon={Play}
                variant="combColBlack"
              />
            )}
            <ButtonIcon
              onClick={() => skipTime(10)}
              SvgIcon={Forward10}
              variant="combColBlack"
            />
            <ButtonIcon
              onClick={jumpToEnd}
              SvgIcon={EndAudio}
              variant="combColBlack"
            />
          </div>
          <div className="w-1/5 flex flex-row justify-start">
            <div className="flex flex-row items-center">
              <ButtonIcon
                SvgIcon={isMuted ? Mute : Volume}
                variant="combColBlack"
                onClick={handleClick} // Muestra la barra vertical
              />
              <div className="hidden lg:flex flex-row items-center">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="mx-2 h-[6px] bg-neutral-neu2 rounded-lg cursor-pointer accent-secondary-sec1"
                />
                <span>{Math.round(volume * 100)}%</span>
              </div>
              {showVerticalSlider && (
                <div className="lg:hidden absolute bottom-full w-10 h-40 flex flex-col items-center justify-between bg-primary-pri3 shadow-lg rounded p-2 z-50">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="h-[120px] bg-neutral-neu2 rounded-lg cursor-pointer accent-secondary-sec1 transform -rotate-90"
                  />
                  <span className="text-sm">{Math.round(volume * 100)}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row pr-2">
          <span className="pr-2">{formatTime(duration)}</span>
          <ButtonIcon
            SvgIcon={CloseIcon}
            variant="combColBlack"
            onClick={handleClose} 
          />
        </div>
      </div>
    </div>
  );
};
