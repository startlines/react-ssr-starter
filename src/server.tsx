import * as koa from 'koa';
import * as logger from 'koa-logger';
import * as Router from 'koa-router';
import * as koaStatic from 'koa-static';
import * as path from 'path';
import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import * as webpack from 'webpack';
import { Client, default as WebpackConfig, PublicPath, Server } from '../webpack.config';
import { Html, HtmlProps } from './components';
import { PORT } from './config';
import { Env, Log } from './helper';
import { WebpackDev, WebpackHot } from './middlewares';
import { Routes } from './router';

const app = new koa();

app.use(logger());

if (Env.isDev) {
    const compiler = webpack(WebpackConfig);

    app.use(WebpackDev(compiler, {
        headers: { 'Access-Control-Allow-Origin': '*' },
        publicPath: PublicPath,
        serverSideRender: true,
        stats: Server.stats || {},
    }));

    app.use(WebpackHot((compiler as any).compilers.find((com: webpack.Compiler) => com.name === Client.name), {}));
}

app.use(koaStatic(Env.isDev ? '.' : path.join(__dirname, 'public')));

const router = new Router();

router.get('*', async ctx => {

    const props: HtmlProps = {
        title: 'dem',
        description: 'asdada',
        styles: [],
        scripts: [],
        data: [],
    };

    if (Env.isDev) {
        const { webpackStats } = ctx.state;
        const { assetsByChunkName } = webpackStats.toJson().children.find((item: any) => item.name === Client.name);

        props.scripts.push(assetsByChunkName.vendor[0]);
        props.scripts.push(assetsByChunkName.client[0]);
    } else {
        props.scripts.push(...['/vendor.6013ac67.js', '/client.6013ac67.js']);
    }

    const fetchs: Array<Promise<any>> = [];

    matchRoutes(Routes, ctx.url).forEach(match => {
        const { initFetch } = match.route.component as any;
        fetchs.push(initFetch ? initFetch() : Promise.resolve(null));
    });

    props.data = await Promise.all(fetchs);

    const context: any = {};

    const html = ReactDOM.renderToStaticMarkup(
        <Html {...props}>
            <StaticRouter location={ctx.req.url} context={context}>
                {renderRoutes(Routes, { data: props.data })}
            </StaticRouter>
        </Html>,
    );

    if (context.url) return ctx.redirect(context.url);

    ctx.body = `<!DOCTYPE html>${html}`;
});

app.use(router.routes());

app.listen(PORT, () => Log.log(`Server running at ${PORT} ports.`));
