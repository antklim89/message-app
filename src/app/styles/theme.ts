import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  globalCss: {
    html: {
      colorPalette: 'blue',
    },
  },
  theme: {
    recipes: {
      button: {
        variants: {
          variant: { outline: { _dark: { color: 'white' }, _light: { color: 'black' } } },
        },
        defaultVariants: {},
      },
    },
    tokens: {
      colors: {
        black: { value: '#090A0B' },
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
          '50': { value: '#f6f8f9' },
          '100': { value: '#ebf0f3' },
          '200': { value: '#c6d4db' },
          '300': { value: '#adc2cc' },
          '400': { value: '#81a1af' },
          '500': { value: '#618696' },
          '600': { value: '#4d6c7c' },
          '700': { value: '#3f5865' },
          '800': { value: '#374b55' },
          '900': { value: '#314049' },
          '950': { value: '#212a30' },
        },
        white: { value: '#F4F5F6' },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
