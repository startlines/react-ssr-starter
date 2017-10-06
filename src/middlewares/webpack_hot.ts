import { Context } from 'koa';
import { Compiler } from 'webpack';
import * as webpacHotMiddleware from 'webpack-hot-middleware';

export function WebpackHot(compiler: Compiler) {

    const middleware = webpacHotMiddleware(compiler);

    return async (ctx: Context, next: () => void) => {
        middleware(ctx.req, ctx.res, next);
        await next();
    };
}
