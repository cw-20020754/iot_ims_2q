import { defineConfig } from 'vite';
import dotenv from 'dotenv';

const path = require('path');

dotenv.config();

export default defineConfig({
  define: {
    'process.env.VITE_NAME': `"${process.env.VITE_APP_DIR}"`,
  },
  resolve: {
    alias: {
      common: path.resolve(__dirname, 'src/common'),
      api: path.resolve(__dirname, 'src/api'),
      components: path.resolve(__dirname, 'src/components'),
      assets: path.resolve(__dirname, 'src/assets'),
      pages: path.resolve(__dirname, 'src/pages'),
      router: path.resolve(__dirname, 'src/router'),
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
