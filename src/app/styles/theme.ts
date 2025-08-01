import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  globalCss: {
    html: {
      colorPalette: 'teal',
    },
  },
  theme: {
    tokens: {
      colors: {
        black: { value: '#232323' },
        white: { value: '#dddddd' },
        gray: {
          '50': { value: '#F2F2F2' },
          '100': { value: '#DBDBDB' },
          '200': { value: '#C4C4C4' },
          '300': { value: '#ADADAD' },
          '400': { value: '#969696' },
          '500': { value: '#808080' },
          '600': { value: '#666666' },
          '700': { value: '#4D4D4D' },
          '800': { value: '#333333' },
          '900': { value: '#1A1A1A' },
        },
      },
    },
    semanticTokens: {
      colors: {
        bgPanel: {
          DEFAULT: { value: { _light: '{colors.gray.50}', _dark: '{colors.gray.950}' } },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
