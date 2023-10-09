// color design tokens export
export const colorTokens = {
    grey: {
      0: "#FFFFFF",
      10: "#F6F6F6",
      50: "#F0F0F0",
      100: "#E0E0E0",
      200: "#C2C2C2",
      300: "#A3A3A3",
      400: "#858585",
      500: "#666666",
      600: "#4D4D4D",
      700: "#333333",
      800: "#1A1A1A",
      900: "#0A0A0A",
      1000: "#000000",
    },
    primary: {
      50: "#F0FFF4",   // Lightest green shade
      100: "#D3FCE6",
      200: "#A6FACD",
      300: "#78F8B4",
      400: "#4BF69B",
      500: "#1EF482",  // Middle green shade
      600: "#0CB36B",
      700: "#008F53",
      800: "#006C3C",
      900: "#004826"   // Darkest green shade
    },
  };
  
  // mui theme settings
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              primary: {
                dark: colorTokens.primary[200],
                main: colorTokens.primary[500],
                light: colorTokens.primary[800],
              },
              neutral: {
                dark: colorTokens.grey[100],
                main: colorTokens.grey[200],
                mediumMain: colorTokens.grey[300],
                medium: colorTokens.grey[400],
                light: colorTokens.grey[700],
              },
              background: {
                default: colorTokens.grey[900],
                alt: colorTokens.grey[800],
              },
            }
          : {
              // palette values for light mode
              primary: {
                dark: colorTokens.primary[700],
                main: colorTokens.primary[500],
                light: colorTokens.primary[50],
              },
              neutral: {
                dark: colorTokens.grey[700],
                main: colorTokens.grey[500],
                mediumMain: colorTokens.grey[400],
                medium: colorTokens.grey[300],
                light: colorTokens.grey[50],
              },
              background: {
                default: colorTokens.grey[10],
                alt: colorTokens.grey[0],
              },
            }),
      },
      typography: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Poppins", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Poppins", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Poppins", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Poppins", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Poppins", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Poppins", "sans-serif"].join(","),
          fontSize: 35,
        },
      },
    };
  };