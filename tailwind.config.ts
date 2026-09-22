import type { Config } from "tailwindcss";

/**
 * Design system — Sidharth Sanal
 * Editorial, near-monochrome canvas. Colour comes from the campaign work itself;
 * the red is a punctuation mark, never a background wash.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0B0B",
          soft: "#141413",
          line: "#26251F",
        },
        ivory: {
          DEFAULT: "#F4F1EA",
          soft: "#E9E4D8",
          line: "#D6D0C0",
        },
        red: {
          DEFAULT: "#C8271F",
          deep: "#A31C16",
        },
        olive: {
          DEFAULT: "#6E6B4A",
          light: "#8A8666",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Haettenschweiler", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        label: "0.22em",
        wide2: "0.14em",
      },
      maxWidth: {
        edge: "104rem",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        marqueeReverse: {
          "0%": { transform: "translate3d(-50%,0,0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
        scrollCue: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "45%": { transform: "scaleY(1)", transformOrigin: "top" },
          "55%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
        curtain: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-101%)" },
        },
        riseIn: {
          "0%": { transform: "translateY(105%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "marquee-reverse": "marqueeReverse 46s linear infinite",
        "scroll-cue": "scrollCue 2.4s cubic-bezier(0.76,0,0.24,1) infinite",
        curtain: "curtain 1s cubic-bezier(0.76,0,0.24,1) 0.55s forwards",
      },
    },
  },
  plugins: [],
};

export default config;
