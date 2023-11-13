import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': { 'max': '319px' },
      // => @media (max-width: 319px) { ... }

      'sm': { 'min': '320px', 'max': '424px' },
      // => @media (min-width: 320px and max-width: 424px) { ... }

      'md': { 'min': '425px', 'max': '767px' },
      // => @media (min-width: 425px and max-width: 767px) { ... }

      'lg': { 'min': '768px', 'max': '1023px' },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'xl': { 'min': '1024px', 'max': '1439px' },
      // => @media (min-width: 1024px and max-width: 1439px) { ... }

      '2xl': { 'min': '1440px' },
      // => @media (min-width: 1440px) { ... }
    },
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme1: {
          "primary": "#8af466",
          "secondary": "#dcc4ff",
          "accent": "#d243e8",
          "neutral": "#242638",
          "base-100": "#3d3b4a",
          "info": "#9db0f6",
          "success": "#106556",
          "warning": "#d09816",
          "error": "#f25345",
        }
      },
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
  },
}

