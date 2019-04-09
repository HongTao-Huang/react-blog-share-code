const {override, fixBabelImports, addWebpackAlias, addLessLoader} = require('customize-cra');
const path = require('path');

module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' },
      localIdentName: '[local]--[hash:base64:5]' // 自定义 CSS Modules 的 localIdentName
    }),
    addWebpackAlias({
      src: path.resolve(__dirname, 'src'),
      pages: path.resolve(__dirname, 'src/pages'),
      components: path.resolve(__dirname, 'src/components'),
      assets: path.resolve(__dirname, 'src/assets'),
      utils: path.resolve(__dirname, 'src/utils'),
      api: path.resolve(__dirname, 'src/api'),
      actions: path.resolve(__dirname, 'src/actions')
    })
);