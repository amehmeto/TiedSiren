export const T = {
  color: {
    text: 'white',
    darkBlue: '#0C207A',
    lightBlue: 'rgba(0,212,255,1)',
    lightBlueShade: 'rgb(105,178,225)',
    purple: 'rgb(69,64,196)',
    inactive: '#d1e9f8',
    shadow: '#1e1e1e',
    white: '#fff',
  },
  font: {
    size: {
      small: 14,
      regular: 18,
      medium: 20,
      large: 24,
      xLarge: 32,
    },
    weight: {
      bold: 'bold' as const,
    },
    family: {
      primary: 'Roboto',
    },
  },
  size: {
    xSmall: 11,
    small: 14,
    medium: 20,
  },
  spacing: {
    extraSmall: 4,
    small: 8,
    medium: 16,
    large: 20,
    x_large: 25,
    xx_large: 32,
  },
  border: {
    width: {
      thin: 1,
      thick: 2,
    },
    radius: {
      roundedSmall: 5,
      extraRounded: 20,
      fullRound: 100,
    },
  },
  shadow: {
    color: '#1e1e1e',
    offset: {
      width: 5,
      height: 5,
    },
    opacity: 0.1,
    radius: 10,
  },
  width: {
    roundButton: 80,
  },
}
