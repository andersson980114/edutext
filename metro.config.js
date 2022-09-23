const defaultAssetExts = require("metro-config/src/defaults/defaults").assetExts;

const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('db');

module.exports = defaultConfig;

module.exports = {
  resolver: {
    assetExts: [
      ...defaultAssetExts,
      // 3D Model formats
      "dae",
      "obj",
      "mtl",
      // sqlite format
      "db",
      "sqlite"
    ]
  }
};