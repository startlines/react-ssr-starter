import * as React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { App } from './components';
import { HomePage, NotFoundPage, UserPage } from './pages';

export const Routes = [
    {
        component: App,
        routes: [
            {
                path: '/home',
                component: HomePage,
            },
            {
                path: '/user',
                component: UserPage,
            },
        ],
    },
];
