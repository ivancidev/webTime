import { Outlet } from "react-router-dom";
import { NavbarO } from "../components/navbar/navbarO";
import { AudioPlayer } from "../features/books/pages/audio-player";
import { useAudio } from "../context/audio-context";
import { ShowStreak } from "../modals/notification-show";

export const Root = () => {
  const { showAudioPlay, setShowAudioPlay } = useAudio();
  const book = JSON.parse(localStorage.getItem("book"));

  return (
    <>
      <NavbarO />
      <div id="details">
        <Outlet />
      </div>
      {showAudioPlay && (
        <AudioPlayer
          setShowAudioPlayer={() => setShowAudioPlay(false)}
          urlAudio={book.enlaceAudio}
        />
      )}
      <ShowStreak />
    </>
  );
};
