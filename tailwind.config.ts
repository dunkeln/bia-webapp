import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: ["dark"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        // mono: [...fontFamily.mono],
        vazirmatn: ['"vazirmatn"', ...fontFamily.mono],
        outfit: ['"outfit"', ...fontFamily.sans]
      },
      typography: {
        DEFAULT: {
          css: {
            '*': {
              fontFamily: 'outfit',
              'margin-left': 'auto',
              'margin-right': 'auto',
            },
            'p, ul, ol': {
              'width': '60vw',
              'padding-left': '2rem',
            },
            img: {
              'border-top': '.6rem solid white', // Bottom border
              'border-bottom': '.6rem solid white', // Bottom border
              'border-left': '2rem solid white',  // Left border
              'border-right': '2rem solid white', // Right border
              borderRadius: '.6rem',
              display: "block",
              margin: "auto",
              'margin-bottom': '1px',
              'padding-bottom': '1px',
              'max-width': '25vw',
              'box-shadow': '0 0 0 1.5px rgba(0, 0, 0, 0.1)',
            },
            // INFO: this class is the image caption
            '.description': {
              'margin-top': '1px',
              'padding-top': '1px',
              'font-size': '.8rem',
              'text-align': 'center',
            },
            '*:not(p, ul, li) ': {
              'text-align': 'center',
            },
          }
        }
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
};

export default config;
