import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { 
      backgroundSize: {
        xl: "430px 430px",
      },
      backgroundImage: {
        'black-gradient': 'linear-gradient(90deg, #01171e 0%, #012732 100%)',
        "gradient-radial":
          "radial-gradient(circle, rgba(80,153,204,1) 0%, rgba(80,153,204,0) 100%)",
        "gradient-radial-permissionless":
          "radial-gradient(50% 50% at 50% 50%, rgba(80, 153, 204, 0.3) 0%, rgba(121, 180, 217, 0) 100%)",
        "gradient-radial-permissionless-yellow":
          "radial-gradient(50% 50% at 50% 50%, rgba(255, 209, 102, 0.3) 0%, rgba(121, 180, 217, 0) 100%)",
        "hero-text":
          "linear-gradient(111.79deg, #FFFFFF -3.9%, #99BEE5 90.53%)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "top-vault":
          "linear-gradient(90deg, rgba(1,23,30,1) 0%, rgba(1,39,50,1) 99%)",
        ellipse:
          "radial-gradient(46.62% 46.62% at 50% 50%, #5099CC 0%, rgba(156, 197, 226, 0) 100%) ",
        border: "linear-gradient(145deg, #5099CC 1.99%, #252B32 23.97%)",
        aether: " linear-gradient(210.02deg, #FFFFFF -45.74%, #EF476F 133.99%)",
        augury: "linear-gradient(210.02deg, #FFFFFF 34.96%, #B2AC0C 162.12%)",
        "btn-border":
          "linear-gradient(154.13deg, #5099CC 9.75%, #252B32 41.49%, #252B32 58.39%)",
        "bottom-border":
          "linear-gradient(90deg, #0F1319 0%, #1D2430 50%, #0F1319 100%)",
        "black-trans":
          "linear-gradient(360deg, #0B0F13 28%, rgba(11, 15, 19, 0) 100%)",
      },
      dropShadow: {
        "light-blue":
          "0px 0px 0.5616000294685364px 0px #F5FFFF,0px 0px 1.1232000589370728px 0px #F5FFFF,0px 0px 3.9312000274658203px 0px #F5FFFF,0px 0px 13.478400230407715px 0px #4F99CC,0px 0px 50px 0px #4F99CC4D",
      },
      boxShadow: {
        "light-blue":
          "0px 0px 0.5616000294685364px 0px #F5FFFF,0px 0px 1.1232000589370728px 0px #F5FFFF,0px 0px 3.9312000274658203px 0px #F5FFFF,0px 0px 13.478400230407715px 0px #4F99CC,0px 0px 50px 0px #4F99CC4D",
        "light-orange":
          "0px 0px 0.5616000294685364px 0px #F5FFFF,0px 0px 1.1232000589370728px 0px #F5FFFF,0px 0px 3.9312000274658203px 0px #F5FFFF,0px 0px 13.478400230407715px 0px #FFD166,0px 0px 50px 0px #FFD1664D",
        "light-red":
          "0px 0px 0.5616000294685364px 0px #F5FFFF,0px 0px 1.1232000589370728px 0px #F5FFFF,0px 0px 3.9312000274658203px 0px #F5FFFF,0px 0px 25px 0px #EF476F,0px 0px 50px 0px #EF476F4D",
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
      },
      animation: {
        wiggle: "wiggle 2s 2s linear infinite",
        rotate: "rotate 4s linear infinite",
      },
      screens: {
        xs: '325px',
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1280px',
      },

      colors: {
        primary: "#0B0F13",
        darkblack: "#0f141a",
        coarsewool: "#161b24",
        riverstyx: "#14161e",
        darkpurple: "#1E242E",
        darkblue: "#151921",
        darkblue300: "#242736",
        yellow: "#ffd166",
        foxflowerviola: "#a1adc4",
        markergreen: "#06d6a0",
        colonyblue: "#63779c",
        daintree: "#012a36",
        bluelguana: "#5099cc",
        lightgrey: "#3B475E",
        missioncontrol: "#838588",
        footer: "#11151b",
        footer_border: "#303339",
        header_globe: "#5098cc87",
        modal_small_box: "#28303E",
        purple: "#AB9FF2",
        faq_bg: "#1c2630",
        rest_page_bg: "#11171D",
        green_dark: "#013746",
        blue_200: "#384257",
        blue_300: "#39404D",
        white: '#ffffff',
        black: '#000000',
        pink: '#C77DFF',
        green: '#4EDF87',
        red: '#F9564F',
        offWhite: '#f0f0f0',
        background: {
          100: '#012732',
          200: '#012A36',
          300: '#043542',
        },
        foreground: {
          100: '#FFFFFF',
          200: '#E4E4E7',
          300: '#D4D4D8',
        },
        primary2: {
          100: '#5099CC',
          200: '#E9D8FD',
          300: '#D6BCFA',
        },
        success: {
          100: '#06D6A0',
          200: '#C3DAFE',
          300: '#A3BFFA',
        },
        warning: {
          100: '#E3DB68',
          200: '#E9D8FD',
          300: '#D6BCFA',
        },
        danger: {
          100: '#EF476F',
          200: '#FED7E2',
          300: '#FBB6CE',
        },
        down: {
          DEFAULT: '#be6a6a',
          dark: '#b65858',
          muted: '#9e7070',
        },
        up: {
          DEFAULT: '#60bf4f',
          dark: '#52b441',
          muted: '#748372',
        },
        button: {
          DEFAULT: '#794ca9',
          hover: '#6c4497',
      }
    },
      keyframes: {
        rotate: {
          "0%, 100%": {
            background:
              "linear-gradient(154.13deg, #5099CC 9.75%, #252B32 41.49%, #252B32 58.39%)",
          },
          "50%": {
            background:
              "linear-gradient(360deg, #5099CC 9.75%, #252B32 41.49%, #252B32 58.39%)",
          },
        },
        wiggle: {
          "0%, 100%": {
            "background-color": "#157b69",
          },
          "50%": {
            "background-color": "transparent",
          },
        },
        "rotate-border": {
          "0%, 100%": {
            background:
              "linear-gradient(106.51deg, #5099CC 1.99%, #252B32 23.97%)",
          },
          "16.67%": {
            background:
              "linear-gradient(154.13deg, #5099CC 9.75%, #252B32 41.49%, #252B32 58.39%)",
          },
          "33.34%": {
            background:
              "linear-gradient(237.74deg, #5099CC 29.83%, #252B32 52.27%, #252B32 64.22%)",
          },
          "50.01%": {
            background:
              "linear-gradient(270.59deg, #5099CC 27.36%, #252B32 46.64%, #252B32 56.9%)",
          },
          "66.68%": {
            background:
              "linear-gradient(309.2deg, #5099CC 33.46%, #252B32 53.61%, #252B32 64.35%)",
          },
          "83.35%": {
            background:
              "linear-gradient(54.94deg, #5099CC 19.83%, #252B32 34.42%, #252B32 42.2%)",
          },
        },
      },
    },
  },

  plugins: [],
};

export default config;
