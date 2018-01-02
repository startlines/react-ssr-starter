import { RouteConfig } from 'react-router-config';
import { App } from './components';
import { HomePage, UserPage } from './pages';

export const Routes: RouteConfig[] = [
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
