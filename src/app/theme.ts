import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  globalCss: {
    html: {
      colorPalette: 'teal',
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
