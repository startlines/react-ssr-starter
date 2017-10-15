import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Env } from './helper';
import { App } from './pages';

const root = document.getElementById('root');

function render(Comp: any) {
    ReactDOM.hydrate(<Comp />, root);
}

render(App);

if (Env.isDev && module.hot) {
    module.hot.accept('./pages/app', () => render(require('./pages/app').App));
}
