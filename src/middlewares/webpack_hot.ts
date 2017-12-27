import { Context } from 'koa';
import { PassThrough } from 'stream';
import { Compiler, MultiCompiler } from 'webpack';
import * as webpacHotMiddleware from 'webpack-hot-middleware';

export function WebpackHot(compiler: Compiler | MultiCompiler, options?: webpacHotMiddleware.Options) {

    const middleware = webpacHotMiddleware(compiler, options);

    return async (ctx: Context, next: () => void) => {
        const stream = new PassThrough();
        const res: any = {
            write: stream.write.bind(stream),
            writeHead: (status: number, headers: any) => {
                ctx.body = stream;
                ctx.status = status;
                ctx.set(headers);
            },
        };
        return await middleware(ctx.req, res, next);
    };
}
