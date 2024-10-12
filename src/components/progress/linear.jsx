import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function LinearProgressComp({ progress }) {
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
  
  LinearProgressComp.propTypes = {
    progress: PropTypes.number.isRequired,
  };
  
