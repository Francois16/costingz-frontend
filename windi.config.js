import { defineConfig } from "windicss/helpers";

export default defineConfig({
  theme: {
    extend: {
      colors: {
        grey: "#f9fafb",
        muted: "#9ca3af",
        body: "#495057",
        // primary: "#00c2ff",
        primary: "#0d9488",
        accent: "#059669",
        "accent-lighter": "#10b981",
        error: "#f54643",
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
