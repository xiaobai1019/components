# 快递综合系统_新

1. create-react-app
2. 使用CSS Modules 文件名命名为[name].module.css 、[name].module.less
3. 组件库 ant design  
    ```
    yarn add antd
    ```
4. 代理
    ```
    yarn add http-proxy-middleware
    ```
    src/setupProxy.js
    ```
    const proxy = require('http-proxy-middleware');

    module.exports = function (app) {
        app.use(proxy('/api', { target: 'http://localhost:5000/' }));
    };
    ```
5. 按需加载
    * 修改create-react-app 默认配置
    ```
    yarn add react-app-rewired customize-cra
    ```
    * 按需加载
    ```
    yarn add babel-plugin-import
    ```
    根目录创建config-overrides.js
6. 自定义主题
    ```
    yarn add less less-loader
    ```
7. 自适应
    ```
    yarn add amfe-flexible postcss-px2rem
    ```
8. router
    ```
    yarn add react-router-dom
    ```
9. zrender
    ```
    yarn add zrender
    ```
10. 使用less 和 css modules
    css-loader降到2.x.x