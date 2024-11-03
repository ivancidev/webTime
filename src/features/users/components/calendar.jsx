import React from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Close from "../../../icons/closeS";

export const Calendar = ({ daysStreak, onClose }) => {
  const theme = createTheme({
    components: {
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: "#0E1217",
            "&.Mui-selected": {
              backgroundColor: "#0297FF",
              color: "#FFFFFF",
            },
            "&:hover": {
              backgroundColor: "#E6E1E5",
            },
          },
        },
      },
    },
  });
  return (
    <div className="absolute right-20 rounded-xl bg-primary-pri3 drop-shadow-lg p-2 w-80">
      <div className="w-full flex justify-end">
        <ButtonIcon onClick={onClose} SvgIcon={Close} variant="combColBlack2" />
      </div>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            defaultValue={dayjs()}
            onChange={(newValue) => console.log(newValue)}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
};
