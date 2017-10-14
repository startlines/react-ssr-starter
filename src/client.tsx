import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Env } from '../helper';
import { App } from './pages';

const root = document.getElementById('root');

function render(Comp: any) {
    ReactDOM.render(<Comp />, root);
}

render(App);

if (Env.isDev && module.hot) {
    module.hot.accept('./app', () => render(require('./app').App));
}
