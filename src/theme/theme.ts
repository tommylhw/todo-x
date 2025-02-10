import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    "primary": "#0052dd",
    "onPrimary": "#ffffff",
    "primaryContainer": "rgba(219, 225, 255, 1)",
    "onPrimaryContainer": "#00174c",
    "secondary": "#006e20",
    "onSecondary": "#ffffff",
    "secondaryContainer": "#6fff7b",
    "onSecondaryContainer": "#002205",
    "tertiary": "#845400",
    "onTertiary": "#ffffff",
    "tertiaryContainer": "#ffddb6",
    "onTertiaryContainer": "#2a1800",
    "error": "#EC3931",
    "onError": "#ffffff",
    "errorContainer": "#ffdad6",
    "onErrorContainer": "#410002",
    "background": "#EEEFF5",
    "onBackground": "#f5f5f5",
    "surface": "#F6F6F6",
    "onSurface": "#000",
    "surfaceVariant": "#e2e1ec",
    "onSurfaceVariant": "#45464f",
    "outline": "#d4d4d4",
    "outlineVariant": "#c5c6d0",
    "shadow": "#000000",
    "scrim": "#000000",
    "inverseSurface": "#303034",
    "inverseOnSurface": "#f2f0f4",
    "inversePrimary": "#b4c5ff",
    "dark": {
      "level0": "#000000",
      "level1": "#232B2B",
      "level2": "#352F36",
      "level3": "#3B444C",
      "level4": "#414A4C",
      "level5": "#7f7f7f"
    },
    "light": {
      "level0": "#ffffff",
      "level1": "#f9f9f9",
      "level2": "#f4f4f4",
      "level3": "#f0f0f0",
      "level4": "#f0f0f0",
      "level5": "#f0f0f0"
    },
    "elevation": {
      "level0": "transparent",
      "level1": "#f1f3fd",
      "level2": "#eaeefc",
      "level3": "#e2e8fb",
      "level4": "#e0e7fb",
      "level5": "#dae3fa"
    },
    "surfaceDisabled": "#1b1b1f1f",
    "onSurfaceDisabled": "#1b1b1f61",
    "backdrop": "#2e303866",
  },
};

export default theme;