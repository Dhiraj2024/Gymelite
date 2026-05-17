export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#c6ff00",
        dark: "#0a0a0a",
        "dark-secondary": "#1a1a1a",
        "dark-tertiary": "#2a2a2a",
        accent: "#ff006e",
        success: "#00d9ff",
      },
      backgroundImage: {
        "gradient-neon": "linear-gradient(135deg, #c6ff00 0%, #00d9ff 100%)",
        "gradient-dark": "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
      },
      boxShadow: {
        neon: "0 0 20px rgba(198, 255, 0, 0.5)",
        "neon-lg": "0 0 40px rgba(198, 255, 0, 0.8)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-up": "slideUp 0.6s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(198, 255, 0, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(198, 255, 0, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};
