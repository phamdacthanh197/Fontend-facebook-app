// color design tokens export
export const shades = {
  blue: {
    0: '#F0F2F5',
    100: '#cce0ff',
    200: '#99c2ff',
    300: '#66a3ff',
    400: '#3385ff',
    500: '#0066ff',
    600: '#0052cc',
    700: '#003d99',
    800: '#002966',
    900: '#001433',
  },
  grey: {
    0: '#FFFFFF',
    50: '#F5F5F5',
    100: '#e6e6e6',
    200: '#cccccc',
    300: '#b3b3b3',
    400: '#999999',
    500: '#808080',
    600: '#666666',
    700: '#4d4d4d',
    800: '#333333',
    900: '#1a1a1a',
    950: '#242526',
    1000: '#000000',
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // palette values for dark mode
            primary: {
              dark: shades.blue[800],
              medium: shades.blue[400],
              main: shades.blue[500],
              light: shades.blue[0],
            },
            secondary: {
              dark: shades.grey[800],
              main: shades.grey[400],
              light: shades.grey[200],
            },
            background: {
              halfmain: shades.grey[900],
              main: shades.grey[950],
              submain: shades.grey[1000],
            },
            text: {
              submain: shades.grey[0],
              main: shades.grey[0],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: shades.blue[800],
              medium: shades.blue[400],
              main: shades.blue[500],
              light: shades.blue[0],
            },
            secondary: {
              dark: shades.grey[800],
              main: shades.grey[400],
              light: shades.grey[200],
            },
            background: {
              halfmain: shades.grey[200],
              main: shades.grey[0],
              submain: shades.blue[0],
            },
            text: {
              submain: shades.grey[0],
              main: shades.grey[1000],
            },
          }),
    },
    typography: {
      fontFamily: ['Rubik', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Rubik', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
    breakpoints: {
      values: {
        md: 900,
        sm: 700,
        xs: 0,
        lg: 1100,
        xl: 1400,
      },
    },
  };
};
