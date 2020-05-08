

const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function (app) {
    //百度地图坐标转换接口
    app.use(createProxyMiddleware('/geoconv', {
        target: 'http://api.map.baidu.com/',
        secure: false,
        changeOrigin: true,
        // pathRewrite: {
        //     "^/apc": "/"
        // },
    }));

};