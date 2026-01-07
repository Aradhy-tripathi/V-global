import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],

  server: {
    proxy: {
      "/api": {
        target: "https://vglobal.wsisites.net",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
