const { override, fixBabelImports, addLessLoader, addPostcssPlugins } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        ident: 'less',
        javascriptEnabled: true,
        strictMath: false,
        noIeCompat: true,
        loader: "css-loader",
        options: {
            sourceMap: true,
            camelCase: true,
            modules: true,
            onlyLocals: true,
            esModule: true,
            exclude: '/node_modules',
            modifyVars: { '@primary-color': '#020B21' },
        }
    }),
    // addPostcssPlugins([require("postcss-px2rem")({ remUnit: 192 })])
)