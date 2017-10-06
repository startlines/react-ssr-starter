import * as koa from 'koa';
import * as path from 'path';
import * as webpack from 'webpack';
import { Env, Log } from '../helper';
import { Server } from '../webpack.config';
import { PORT } from './config';
import { router, WebpackDev, WebpackHot } from './middlewares';

const app = new koa();

if (Env.isDev) {
    const compiler = webpack(Server);
    app.use(WebpackDev(compiler));
    app.use(WebpackHot(compiler));
}

app.use(router.routes());

app.listen(PORT, () => Log.log(`Server running at ${PORT} ports.`));
