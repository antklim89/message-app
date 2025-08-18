import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: 'src/app/routes',
      generatedRouteTree: './src/share/model/route-tree.generated.ts',
    }),
    react(),
    tsconfigPaths(),
  ],
  build: {
    target: 'es2022',
  },
});
