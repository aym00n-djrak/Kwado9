// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.extraNodeModules = {
  ...defaultConfig.resolver.extraNodeModules,
  ...require("expo-crypto-polyfills")
};
defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;
