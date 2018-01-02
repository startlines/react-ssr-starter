import * as fs from 'fs';
import * as koa from 'koa';
import * as Router from 'koa-router';
import * as koaStatic from 'koa-static';
import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import * as webpack from 'webpack';
import { Client, default as WebpackConfig, PublicPath, Server } from '../webpack.config';
import { App, Html, HtmlProps } from './components';
import { PORT } from './config';
import { Env, Log, Path } from './helper';
import { WebpackDev, WebpackHot } from './middlewares';
import { Routes } from './router';

const app = new koa();

if (Env.isDev) {
    const compiler = webpack(WebpackConfig);

    app.use(WebpackDev(compiler, {
        headers: { 'Access-Control-Allow-Origin': '*' },
        publicPath: PublicPath,
        serverSideRender: true,
        noInfo: true,
        stats: Server.stats || {},
    }));

    app.use(WebpackHot((compiler as any).compilers.find((com: webpack.Compiler) => com.name === Client.name), {}));
}

app.use(koaStatic(Env.isDev ? '.' : Path.root('build', 'public')));

const router = new Router();

router.get('*', ctx => {
    const { webpackStats } = ctx.state;
    const { assetsByChunkName } = webpackStats.toJson().children.find((item: any) => item.name === Client.name);

    const props: HtmlProps = {
        title: 'dem',
        description: 'asdada',
        styles: [],
        scripts: ['/public/vendor.js', '/public/client.js'],
    };

    const html = ReactDOM.renderToStaticMarkup(
        <Html {...props}>
            <StaticRouter location={ctx.url} context={{}}>
                {renderRoutes(Routes)}
            </StaticRouter>
        </Html>,
    );
    ctx.body = `<!DOCTYPE html>${html}`;
});

app.use(router.routes());

app.listen(PORT, () => Log.log(`Server running at ${PORT} ports.`));
