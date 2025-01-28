module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
   
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
        },
      ],
    ],
    plugins: [
      [
        "module:react-native-dotenv",
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
            "GOOGLE_MAPS_API_KEY"
          ],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
