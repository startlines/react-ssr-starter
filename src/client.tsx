import * as React from 'react';
import { App } from './app';
import * as ReactDOM from 'react-dom';

function render(Comp: any) {
    ReactDOM.render(
        <Comp />,
        document.getElementById('root'),
    );
}

render(App);

if (process.env.NODE_ENV === 'dev' && module.hot) {
    module.hot.accept('./app', () => render(require('./app').App));
}
