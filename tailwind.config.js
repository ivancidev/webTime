/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          pri1: "#000000", // black
          pri2: "#0E1217", // black gray
          pri3: "#FFFFFF", // white
        },
        secondary: {
          sec1: "#0123FD", // blue
          sec2: "#0297FF", // sky blue
          sec3: "#02BBF6", // light blue
        },
        error: {
          err1: "#AC010C", // dark red
          err2: "#BA1A1A", // red
          err3: "#DE3730", // light red
        },
        neutral: {
          neu1: "#AEAAAE", // dark gray
          neu2: "#E6E1E5", // gray
          neu3: "#F4EFF4", // light gray
        },
      },

      fontFamily: {
        display: ["Secular One", "sans-serif"],
        title: ["Montserrat", "sans-serif"],
        label: ["Reddit Sans", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },

      fontSize: {
        "display-sm": ["36px", { lineHeight: "44px" }],
        "display-md": ["45px", { lineHeight: "52px" }],
        "display-lg": ["57px", { lineHeight: "64px" }],
        "title-sm": ["18px", { lineHeight: "22px" }],
        "title-md": ["24px", { lineHeight: "28px" }],
        "title-lg": ["28px", { lineHeight: "32px" }],
        "label-sm": ["14px", { lineHeight: "16px" }],
        "label-md": ["16px", { lineHeight: "18px" }],
        "label-lg": ["22px", { lineHeight: "24px" }],
        "body-sm": ["14px", { lineHeight: "16px" }],
        "body-md": ["16px", { lineHeight: "18px" }],
        "body-lg": ["20px", { lineHeight: "22px" }],
      },
    },
  },
  plugins: [],
};
