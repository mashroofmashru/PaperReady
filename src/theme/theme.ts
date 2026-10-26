"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0F172A", // Ink Slate
      light: "#1E293B",
      dark: "#020617",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF5733", // Coral Accent
      light: "#FF7A5C",
      dark: "#E03E1A",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#0284C7", // Sky Travel Blue
      light: "#38BDF8",
      dark: "#0369A1",
    },
    success: {
      main: "#10B981", // Emerald
      light: "#34D399",
      dark: "#059669",
    },
    warning: {
      main: "#F59E0B",
      light: "#FBBF24",
      dark: "#D97706",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A",
      secondary: "#475569",
    },
    divider: "#E2E8F0",
  },
  typography: {
    fontFamily: 'var(--font-dm-sans), "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.03em",
      lineHeight: 1.15,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.025em",
      lineHeight: 1.25,
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.015em",
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "-0.005em",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "8px 20px",
          fontWeight: 600,
          boxShadow: "none",
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          "&:hover": {
            boxShadow: "0 6px 16px -4px rgba(15, 23, 42, 0.15)",
            transform: "translateY(-1px)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.04)",
          transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          "&:hover": {
            boxShadow: "0 12px 28px -8px rgba(15, 23, 42, 0.08)",
            borderColor: "#CBD5E1",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "16px",
          paddingRight: "16px",
          "@media (min-width: 600px)": {
            paddingLeft: "24px",
            paddingRight: "24px",
          },
          "@media (min-width: 1200px)": {
            paddingLeft: "32px",
            paddingRight: "32px",
          },
        },
      },
    },
  },
});
