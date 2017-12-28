import * as AssetsPlugin from 'assets-webpack-plugin';
import { CheckerPlugin } from 'awesome-typescript-loader';
import * as extractTextPlugin from 'extract-text-webpack-plugin';
import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals';
import { Env, Path } from './src/helper';

export const loaders: webpack.Rule[] = [
    {
        test: /.tsx?$/,
        use: ['awesome-typescript-loader'],
        exclude: ['node_modules'],
    },
];

export const PublicPath = Env.isDev ? '/public/' : 'https://www.cdn.com';

const Base: webpack.Configuration = {
    context: Path.root(),

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        modules: ['node_modules', 'src'],
    },

    devtool: Env.isDev ? 'cheap-module-source-map' : 'source-map',

    plugins: [
        new CheckerPlugin(),

        ...(Env.isDev
            ? [
                // dev plugins
                new webpack.HotModuleReplacementPlugin(),
            ]
            : [
                // prod plugins
            ]),
    ],

    stats: {
        assets: true,
        chunks: true,
    },
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

    module: {
        rules: [
            ...loaders,
            {
                test: /.scss$/,
                use: extractTextPlugin.extract({
                    fallback: [
                        { loader: 'style-loader' },
                    ],
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'sass-loader' },
                    ],
                }),
            },
        ],
    },

    plugins: [
        ...Base.plugins || [],

        new extractTextPlugin({
            filename: 'style.css',
        }),

        new webpack.NoErrorsPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module => /node_modules/.test(module.resource),
        }),

        new AssetsPlugin({
            path: Path.root('build'),
            filename: 'assets.json',
            prettyPrint: true,
        }),

        ...(Env.isDev
            ? [

            ]
            : [
                new webpack.optimize.UglifyJsPlugin({}),
            ]),
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

    externals: nodeExternals(),

    module: {
        rules: [
            ...loaders,
            {
                test: /.scss$/,
                exclude: /node_modules/,
                use: ['style-laoder', 'css-loader', 'sass-loader'],
            },
        ],
    },

    plugins: [
        ...Base.plugins || [],
    ],

    stats: {
        colors: true,
        publicPath: true,
    },

    node: {
        __dirname: false,
        __filename: false,
    },
};

export default [Client, Server];
