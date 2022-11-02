import { defineConfig } from "windicss/helpers";

export default defineConfig({
  theme: {
    extend: {
      colors: {
        grey: "#f9fafb",
        body: "#354a54",
        primary: "#89cff0",
      },
      fontFamily: {
        display: "Roboto, sans-serif",
        body: "Lato, sans-serif",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
    },
  },
});
