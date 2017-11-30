import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// import './css/index.css'

import App from './components/App';
import Test from './components/test';
import registerServiceWorker from './registerServiceWorker';
import Header from  './components/common/header';
import Footer from  './components/common/footer';
ReactDOM.render(
    <BrowserRouter>
        <div>
            <main>
                <Header/>
                <Switch>
                    <Route path='/test' component={Test}/>
                    <Route path='/' component={App}/>

                </Switch>
                <Footer/>
            </main>
        </div>
    </BrowserRouter>

        ,document.getElementById('root'));



//主要是用于在生产环境中为用户在本地创建一个service worker 来缓存资源到本地，提升应用的访问速度
registerServiceWorker();