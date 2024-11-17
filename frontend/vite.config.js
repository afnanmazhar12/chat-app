// https://vitejs.dev/config/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://chat-app-7-vj9g.onrender.com/",
                
         // Backend server origin
        changeOrigin: true, // Enables proxying requests to the target
        secure: false, // Set to true if the backend uses HTTPS and you want stricter verification
      },
    },
  },
});
