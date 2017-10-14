import { Context } from 'koa';
import { Compiler } from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';

export function WebpackDev(compiler: Compiler, options?: webpackDevMiddleware.Options) {

    const middleware = webpackDevMiddleware(compiler, options);

    return async (ctx: Context, next: () => void) => {
        middleware(ctx.req, ctx.res, () => Promise.resolve());
        await next();
    };
}
