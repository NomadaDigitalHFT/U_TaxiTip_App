const defaultFonts = {
  regular: "WorkSans-Regular",
  bold: "WorkSans-Bold",
};

const lightTheme = {
  colors: {
    background: "#f8f9fa",
    primary: "#007bff",
    secondary: "#6c757d",
    accent: "#FF9800",
    text: "#212529",
    textSecondary: "#495057",
    border: "#dee2e6",
    card: "#FFFFFF",
    inputBackground: "#ffffff",
    inputBorder: "#ced4da",
    inputText: "#000000",
    success: "#4CAF50",
    warning: "#FFC107",
    error: "#D32F2F",
    shadow: "rgba(0, 0, 0, 0.1)",
    buttonBackground: "#007bff",
    buttonText: "#ffffff",
  },
  fonts: defaultFonts,
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
    background: "#1e1e2e",
    primary: "#89b4fa",
    secondary: "#f5e0dc",
    accent: "#FCA311",
    text: "#cdd6f4",
    textSecondary: "#a6adc8",
    border: "#51576d",
    card: "#2b2b3b",
    inputBackground: "#4b4b5a",
    inputBorder: "#b4befe",
    inputText: "#ffffff",
    placeholder: "#B0B0B0", /* 🔥 Placeholder más claro */
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
    shadow: "rgba(0, 0, 0, 0.3)",
    buttonBackground: "#585b70",
    buttonText: "#cdd6f4",
  },

  fonts: defaultFonts,
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
