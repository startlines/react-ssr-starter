import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/app';
import { Env } from './helper';
import { Routes } from './router';

const root = document.getElementById('app');
const appPath = './components/app';

function render(Appc: any) {
    return ReactDOM.render(
        <Appc>
            <BrowserRouter>{Routes}</BrowserRouter>
        </Appc>,
        root,
    );
}

render(App);

if (Env.isDev && module.hot) {
    module.hot.accept(appPath, () => {
        render(App);
    });
}
