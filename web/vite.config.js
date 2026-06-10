import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // base is injected by CI via VITE_BASE_PATH environment variable.
  // - Custom domain (e.g. aistack.dev): set VITE_BASE_PATH=/
  // - GitHub Pages subdirectory (e.g. username.github.io/aistack): set VITE_BASE_PATH=/aistack/
  // - Local dev: defaults to /
  base: process.env.VITE_BASE_PATH || "/",
});
