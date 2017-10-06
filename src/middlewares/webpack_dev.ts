import { Context } from 'koa';
import { Compiler } from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';

export function WebpackDev(compiler: Compiler) {

    const middleware = webpackDevMiddleware(compiler);

    return async (ctx: Context, next: () => void) => {
        middleware(ctx.req, ctx.res, next);
        await next();
    };
}
