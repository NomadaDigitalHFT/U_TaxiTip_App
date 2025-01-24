import { StyleSheet } from "react-native";
import theme from "./theme";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.lightBlue,
  },
  text: {
    fontSize: 16,
    color: theme.colors.darkBlue,
    fontFamily: theme.fonts.regular,
  },
  title: {
    fontSize: 24,
    color: theme.colors.darkBlue,
    fontFamily: theme.fonts.bold,
    marginBottom: theme.spacing.medium,
  },
  button: {
    backgroundColor: theme.colors.mediumBlue,
    padding: theme.spacing.medium,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.bold,
    fontSize: 16,
  },
  errorText: {
    color: theme.colors.lightRed,
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    marginTop: 5,
  },
});

export default globalStyles;


