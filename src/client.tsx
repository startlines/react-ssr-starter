declare const window: any;
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './router';

ReactDOM.render(
    <BrowserRouter>{renderRoutes(Routes, { data: window.__INITIAL_STATE__ })}</BrowserRouter>,
    document.getElementById('app'),
);

if (module.hot) module.hot.accept();
