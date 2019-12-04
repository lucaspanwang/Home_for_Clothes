import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css'
import {Provider} from './context'

let data={
    userId:'',
    userPwd:'',
    userName:'',
    userPic:'',
    userSex:'',
    userPho:'',
    userIntro:'',
    userCity:'',
};

ReactDOM.render(
    <Provider value={data}>
        <App />
    </Provider>,
    document.getElementById('root')
);