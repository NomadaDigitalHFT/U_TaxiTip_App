const defaultFonts = {
  regular: "WorkSans-Regular",
  bold: "WorkSans-Bold",
};

const lightTheme = {
  colors: {
    background: "#B4BDCF",
    primary: "#1565D6",
    secondary: "#1E88E5",
    accent: "#FF9800",
    text: "#333333",
    textSecondary: "#666666",
    border: "#E0E0E0",
    card: "#FFFFFF",
    success: "#4CAF50",
    warning: "#FFC107",
    error: "#D32F2F",
    shadow: "rgba(0, 0, 0, 0.1)",
  },
  fonts: {
    regular: defaultFonts.regular || "System", // Fallback a "System" si no está disponible
    bold: defaultFonts.bold || "System",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
  },
};

const darkTheme = {
  colors: {
    background: "#121212",
    primary: "#2C99CB",
    secondary: "#2CCBA2",
    accent: "#F8EB22",
    text: "#E3E3E3",
    textSecondary: "#A0A0A0",
    border: "#333333",
    card: "#1E1E1E",
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
    shadow: "rgba(0, 0, 0, 0.3)",
  },
  fonts: {
    regular: defaultFonts.regular || "System",
    bold: defaultFonts.bold || "System",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "12px",
  },
};

export { lightTheme, darkTheme };



