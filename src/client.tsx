import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';

const root = document.getElementById('root');

function render(Comp: any) {
    ReactDOM.render(<Comp />, root);
}

render(App);

if (process.env.NODE_ENV === 'dev' && module.hot) {
    module.hot.accept('./app', () => render(require('./app').App));
}
