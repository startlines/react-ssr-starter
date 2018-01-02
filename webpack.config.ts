import * as AssetsPlugin from 'assets-webpack-plugin';
import { CheckerPlugin } from 'awesome-typescript-loader';
import * as extractTextPlugin from 'extract-text-webpack-plugin';
import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals';
import { Env, Path } from './src/helper';

export const PublicPath = Env.isDev ? '/' : '/';

export const loaders: webpack.Rule[] = [
    {
        test: /.tsx?$/,
        use: ['awesome-typescript-loader'],
        exclude: ['node_modules'],
    },

    {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
            },
        },
    },
];

const Base: webpack.Configuration = {
    context: Path.root(),

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        modules: ['node_modules', 'src'],
    },

    devtool: Env.isDev ? 'cheap-module-source-map' : 'source-map',

    plugins: [
        new CheckerPlugin(),
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
        client: [
            ...(Env.isDev
                ? ['react-hot-loader/patch', 'webpack-hot-middleware/client']
                : []),
            Path.root('src', 'client'),
        ],
    },

    output: {
        path: Path.root('build', 'public'),
        publicPath: PublicPath,
        filename: Env.isDev ? '[name].js' : '[name].[hash:8].js',
        chunkFilename: Env.isDev ? '[name].chunk.js' : '[name].chunk.[hash:8].js',
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

        new webpack.NoEmitOnErrorsPlugin(),

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
                // dev plugins
                new webpack.HotModuleReplacementPlugin(),
            ]
            : [
                // production plugins
                new webpack.optimize.UglifyJsPlugin({}),
            ]),
    ],
};

export const Server: webpack.Configuration = {
    ...Base,

    target: 'node',
    name: 'server',

    entry: {
        server: [
            Path.root('src', 'server'),
        ],
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

        new webpack.DefinePlugin({
            $dirname: '__dirname',
        }),
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
