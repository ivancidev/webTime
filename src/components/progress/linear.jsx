import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel({ progress }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          sx={{ backgroundColor: "#0E1217", "& .MuiLinearProgress-bar": { backgroundColor: "#0297FF" } }}
          variant="determinate"
          value={progress}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: "#AEAAAE" }}>
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  progress: PropTypes.number.isRequired, // Recibe el progreso desde fuera
};

export default function LinearWithValueLabel({ isLoading, onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0); // Resetea el progreso al iniciar
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10));
      }, 200);

      // Simula completar el proceso rápidamente en 2 segundos
      const timeout = setTimeout(() => {
        clearInterval(timer);
        setProgress(100);
        if (onComplete) onComplete(); // Llamar la función de completado si existe
      }, 2000);

      return () => {
        clearTimeout(timeout);
        clearInterval(timer);
      };
    }
  }, [isLoading, onComplete]);

  return (
    <Box sx={{ width: "100%" }}>
      {isLoading && <LinearProgressWithLabel progress={progress} />}
    </Box>
  );
}
