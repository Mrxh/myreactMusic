const {
    override,
    addPostcssPlugins,
    addWebpackAlias,
    fixBabelImports
} = require('customize-cra')
const path = require('path')

const paths = require('react-scripts/config/paths');
paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')

module.exports = override(
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src')
    }),
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css'
    }),
    addPostcssPlugins([
        require('postcss-pxtorem')({
            rootValue: 16,
            propList: ['*']
        })
    ])
)
