/* eslint-disable no-undef */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path"


export default defineConfig(() => {
  return {
    plugins: [react()],
    build: {
      outDir: 'build',
      assetsDir: 'assets',
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      environment: "jsdom",
      setupFiles: "./src/__tests__/setup.js",
      globals: true,
      testTimeout: 10000,
    },
    serve: {
      port: 5143,
    }
  };
});
