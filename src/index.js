import React from 'react';
import ReactDOM from 'react-dom';
import App from './Pages/App/App';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
// import "amfe-flexible";

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);

