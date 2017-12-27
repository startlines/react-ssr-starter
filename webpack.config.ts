import * as cleanPlugin from 'clean-webpack-plugin';
import * as extractTextPlugin from 'extract-text-webpack-plugin';
import * as webpack from 'webpack';
import { Env, Path } from './src/helper';

export const PublicPath = Env.isDev ? '/public/' : 'https://www.cdn.com';

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
                exclude: ['node_modules'],
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

        new webpack.HotModuleReplacementPlugin(),

        new cleanPlugin([Path.root('build')], {
            exclude: ['.gitignore'],
        }),
    ],
};

export const Client: webpack.Configuration = {
    ...Base,

    target: 'web',
    name: 'client',

    entry: {
        client: [Path.root('src', 'client')],
    },

    output: {
        path: Path.root('build', 'public'),
        publicPath: PublicPath,
        filename: Env.isDev ? '[name].js' : '[name].js',
        chunkFilename: Env.isDev ? '[name].chunk.js' : '[name].chunk.js',
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
        server: [Path.root('src', 'server')],
    },

    output: {
        path: Path.root('build'),
        filename: '[name].js',
        chunkFilename: 'chunks/[name].js',
        libraryTarget: 'commonjs2',
        publicPath: PublicPath,
    },

    externals: /^[a-z\-0-9]+$/,

    node: {
        __dirname: true,
        __filename: true,
    },
};

export default [Client, Server];
