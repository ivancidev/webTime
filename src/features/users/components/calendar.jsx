import React, { useState } from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Close from "../../../icons/closeS";
import "dayjs/locale/es";
dayjs.locale("es");

export const Calendar = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const theme = createTheme({
    components: {
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: "#0E1217",
            "&.Mui-selected": {
              backgroundColor: "#0297FF !important",
              color: "#FFFFFF !important",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#0123FD !important",
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
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <DateCalendar
            defaultValue={dayjs()}
            onChange={(newValue) => {
              setSelectedDate(newValue);
            }}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
};
