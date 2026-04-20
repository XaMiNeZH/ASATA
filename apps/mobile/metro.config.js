const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
})

config.resolver.sourceExts.push('mjs', 'cjs')

module.exports = config
