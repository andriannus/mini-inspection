import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    checker({
      eslint: {
        lintCommand: 'eslint "**/*.{mjs,ts,tsx}"',
        useFlatConfig: true,
      },
      typescript: true,
    }),
  ],
});
