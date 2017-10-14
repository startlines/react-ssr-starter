import * as koa from 'koa';
import * as path from 'path';
import * as webpack from 'webpack';
import { Env, Log } from '../helper';
import WebpackConfig from '../webpack.config';
import { PORT } from './config';
import { router, WebpackDev, WebpackHot } from './middlewares';

const app = new koa();

if (Env.isDev) {
    const compiler: any = webpack(WebpackConfig);
    app.use(WebpackDev(compiler, { publicPath: WebpackConfig[0].output.publicPath }));
    app.use(WebpackHot(compiler));
}

app.use(router.routes());

app.listen(PORT, () => Log.log(`Server running at ${PORT} ports.`));
