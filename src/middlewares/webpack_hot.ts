import { Context } from 'koa';
import { Compiler } from 'webpack';
import * as webpacHotMiddleware from 'webpack-hot-middleware';

export function WebpackHot(compiler: Compiler, options?: webpacHotMiddleware.Options) {

    const middleware = webpacHotMiddleware(compiler, options);

    return async (ctx: Context, next: () => void) => {
        middleware(ctx.req, ctx.res, () => Promise.resolve());
        await next();
    };
}
