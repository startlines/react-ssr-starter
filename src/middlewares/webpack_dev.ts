import { Context } from 'koa';
import { Compiler, MultiCompiler } from 'webpack';
import * as webpackDevMiddle from 'webpack-dev-middleware';

export function WebpackDev(compiler: Compiler | MultiCompiler, options?: webpackDevMiddle.Options) {

    const middleware = webpackDevMiddle(compiler, options);

    async function m(ctx: Context, next: () => void) {
        const res: any = {
            end: (content: any) => ctx.body = content,
            setHeader: ctx.set.bind(ctx),
            locals: ctx.state,
        };
        return await middleware(ctx.req, res, next);
    }

    (m as any).getFilenameFromUrl = middleware.getFilenameFromUrl;
    (m as any).waitUntilValid = middleware.waitUntilValid;
    (m as any).invalidate = middleware.invalidate;
    (m as any).close = middleware.close;
    (m as any).fileSystem = middleware.fileSystem;

    return m;
}
