import * as koa from 'koa';
import * as koaRouter from 'koa-router';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '../app';

export const router = new koaRouter();

router.all('*', async ctx => {
    ctx.body = `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="/assets/style.css"/>
            <title>demo</title>
        </head>

        <body>
            <div id="root">${renderToString(<App />)}</div>

            <script>
                window.__INITIAL_STATE__ = null;
            </script>
        </body>

        </html>
    `;
});
