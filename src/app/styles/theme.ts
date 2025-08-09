import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  globalCss: {
    html: {
      colorPalette: 'blue',
    },
  },
  theme: {
    tokens: {
      colors: {
        black: { value: '#090A0B' },
        white: { value: '#F4F5F6' },
        blue: {
          '0': { value: '#92bbfe' },
          '50': { value: '#92bbfe' },
          '100': { value: '#68a2ff' },
          '200': { value: '#3f89ff' },
          '300': { value: '#1770ff' },
          '400': { value: '#005bed' },
          '500': { value: '#004bc4' },
          '600': { value: '#003b9b' },
          '700': { value: '#002c72' },
          '800': { value: '#001c4a' },
          '900': { value: '#000d21' },
          '950': { value: '#000000' },
        },
        gray: {
          '0': { value: '#cdd4dc' },
          '50': { value: '#cdd4dc' },
          '100': { value: '#b8c3cd' },
          '200': { value: '#a3b1bf' },
          '300': { value: '#8e9fb0' },
          '400': { value: '#798da1' },
          '500': { value: '#667b91' },
          '600': { value: '#57697c' },
          '700': { value: '#485867' },
          '800': { value: '#394652' },
          '900': { value: '#2b343d' },
          '950': { value: '#1c2228' },
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { _light: '{colors.white}', _dark: '{colors.black}' } },
        },
        bgPanel: {
          DEFAULT: { value: { _light: '{colors.gray.50}', _dark: '{colors.gray.950}' } },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
