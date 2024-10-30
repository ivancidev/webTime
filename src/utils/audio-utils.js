export const fetchAudioDuration = async (audioUrl) => {
  return new Promise((resolve, reject) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.onloadedmetadata = () => {
        const durationInMinutes = (audio.duration / 60).toFixed(2);
        resolve(durationInMinutes);
      };
      audio.onerror = (error) => {
        console.error("Error al cargar el audio:", error);
        reject(null);
      };
    } else {
      resolve(null);
    }
  });
};
