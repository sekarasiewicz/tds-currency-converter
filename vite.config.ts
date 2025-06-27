// Vite automatically loads environment variables from .env files and exposes them via import.meta.env
// To use an API key, create a .env file in the project root with: VITE_CURRENCY_API_KEY=your_api_key_here

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
