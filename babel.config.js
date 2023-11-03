module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "babel-plugin-root-import",
        {
          paths: [
            {
              rootPathSuffix: "./shared/",
              rootPathPrefix: "$shared/",
            },
            {
              rootPathSuffix: "./shared/ui/",
              rootPathPrefix: "$ui/",
            },
            {
              rootPathSuffix: "./assets/",
              rootPathPrefix: "$assets/",
            },
            {
              rootPathSuffix: "./screens/",
              rootPathPrefix: "$screens/",
            },
            {
              rootPathSuffix: "./utils/",
              rootPathPrefix: "$utils/",
            },
          ],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
