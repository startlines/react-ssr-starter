import * as extractTextPlugin from 'extract-text-webpack-plugin';
import * as webpack from 'webpack';
import { Env, Path } from './helper';

const publicPath = Path.root('build', 'public');

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

const Base: webpack.Configuration = {
    context: Path.root(),

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        modules: ['node_modules', 'src'],
    },

    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: ['awesome-typescript-loader'],
            },
            {
                test: /.scss$/,
                use: extractTextPlugin.extract({
                    fallback: [
                        {
                            loader: 'style-loader',
                        },
                    ],
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                }),
            },
        ],
    },

    devtool: Env.isDev ? 'cheap-module-source-map' : 'source-map',

    plugins: [
        new extractTextPlugin('style.css'),
    ],
};

export const Client: webpack.Configuration = {
    ...Base,

    target: 'web',
    name: 'client',

    entry: {
        client: [Path.root('src', 'client'), hotMiddlewareScript],
    },

    output: {
        path: Path.root('build', 'public'),
        publicPath,
        filename: Env.isDev ? '[name].js' : '[name].[hash:8].js',
        chunkFilename: Env.isDev ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
    },

    plugins: [
        ...Base.plugins,

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
};

export const Server: webpack.Configuration = {
    ...Base,

    target: 'node',
    name: 'server',

    entry: {
        server: [Path.root('src', 'server'), hotMiddlewareScript],
    },

    output: {
        path: Path.root('build'),
        filename: '[name].js',
        chunkFilename: 'chunks/[name].js',
        libraryTarget: 'commonjs2',
        publicPath,
    },

    externals: /^[a-z\-0-9]+$/,
};

export default [Client, Server];
