module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo" // Aquí no debería haber caracteres extraños
    ],
    plugins: [
      [
        "module:react-native-dotenv", // Plugin para manejar variables de entorno
        {
          moduleName: "@env",
          path: ".env",
          allowlist: [
            "API_KEY",
            "AUTH_DOMAIN",
            "PROJECT_ID",
            "STORAGE_BUCKET",
            "MESSAGING_SENDER_ID",
            "APP_ID",
            "MEASUREMENT_ID",
          ],
        },
      ],
      "react-native-reanimated/plugin", // Siempre al final
    ],
  };
};
