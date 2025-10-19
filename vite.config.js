import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(green|amber|blue|gray)-(50|100|200|300|400|500|600|700)/,
    },
  ],
});
