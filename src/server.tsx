import * as React from 'react';
import * as koa from 'koa';
import { PORT } from './config';
import { renderToString } from 'react-dom/server';
import { App } from './app';
import * as views from 'koa-views';

const app = new koa();

app.use(views(__dirname, {
    extension: 'ejs',
}));

app.use(async ctx => {
    await ctx.render('index', {
        root: renderToString(<App />),
        title: 'todo replace title by router.',
        initSate: null,
    });
});

app.listen(PORT, () => console.log(`Server running at ${PORT} ports.`));
