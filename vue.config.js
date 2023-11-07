// const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      AutoImport({resolvers: [ElementPlusResolver()]}),
      Components({resolvers: [ElementPlusResolver()]}),
      new MonacoWebpackPlugin()
    ]
  }
}
