export const T = {
  color: {
    text: 'rgba(255, 255, 255, 1)',
    darkBlue: 'rgba(12, 32, 122, 1)',
    lightBlue: 'rgba(0, 212, 255, 1)',
    lightBlueShade: 'rgba(105, 178, 225, 1)',
    purple: 'rgba(69, 64, 196, 1)',
    inactive: 'rgba(209, 233, 248, 1)',
    shadow: 'rgba(30, 30, 30, 1)',
    white: 'rgba(255, 255, 255, 1)',
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
    none: 0,
    extraExtraSmall: 2,
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
    chipMinWidth: 80,
  },
}
