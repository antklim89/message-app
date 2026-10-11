import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  globalCss: {
    html: {
      colorPalette: 'primary',
    },

    '.editor-hashtag,.editor-user,.editor-link ': {
      color: '{colors.blue.600}',
    },

    '.editor-text-bold': {
      fontWeight: '{font.weight.600}',
    },

    '.editor-text-italic': {
      fontStyle: 'italic',
    },

    '.editor-text-strikethrough': {
      textDecoration: 'line-through',
    },

    '.editor-text-underline': {
      textDecoration: 'underline',
    },

    '.editor-text-underline-strikethrough': {
      textDecoration: 'underline line-through',
    },
  },
  theme: {
    recipes: {
      alert: {
        base: { bg: 'bg' },
      },
      button: {
        variants: {
          variant: {
            outline: { _dark: { color: '{colors.white}' }, _light: { color: '{colors.black}' } },
            ghost: { _dark: { color: '{colors.white}' }, _light: { color: '{colors.black}' } },
          },
        },
        defaultVariants: {},
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          solid: { value: { _dark: '{colors.primary.600}', _light: '{colors.primary.400}' } },
          contrast: { value: '{colors.white}' },
          fg: { value: { _dark: '{colors.white}', _light: '{colors.black}' } },
          muted: { value: '{colors.primary.100}' },
          subtle: { value: { _dark: '{colors.primary.400}', _light: '{colors.primary.200}' } },
          emphasized: { value: { _dark: '{colors.primary.400}', _light: '{colors.primary.300}' } },
          focusRing: { value: '{colors.orange.500}' },
        },
        bg: {
          muted: {
            value: { _light: '#d9d9d9', _dark: '#2a2a2a' },
          },
        },
      },
    },
    tokens: {
      radii: {
        none: { value: '0px' },
        '2xs': { value: '0.0625rem' },
        xs: { value: '0.25rem' },
        sm: { value: '0.375rem' },
        md: { value: '0.5rem' },
        lg: { value: '0.75rem' },
        xl: { value: '1em' },
        '2xl': { value: '1.5rem' },
        '3xl': { value: '2rem' },
        '4xl': { value: '2.5rem' },
        full: { value: '9999px' },
      },
      colors: {
        black: { value: '#1a1a1a' },
        white: { value: '#f0f0f0' },
        primary: {
          '50': { value: '#b0cdf9' },
          '100': { value: '#8eb7f6' },
          '200': { value: '#6099f2' },
          '300': { value: '#327cee' },
          '400': { value: '#1261dd' },
          '500': { value: '#0f52ba' },
          '600': { value: '#0d48a4' },
          '700': { value: '#0b3b86' },
          '800': { value: '#082e68' },
          '900': { value: '#06214a' },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
