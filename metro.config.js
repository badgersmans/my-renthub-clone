// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const {wrapWithReanimatedMetroConfig} = require('react-native-reanimated/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const nativeWindConfig = withNativeWind(config, { input: './global.css' });

const reanimatedConfig = wrapWithReanimatedMetroConfig(nativeWindConfig);

module.exports = reanimatedConfig;