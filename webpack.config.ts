import * as webpack from 'webpack';
import * as path from 'path';
import * as extractTextPlugin from 'extract-text-webpack-plugin';
import * as nodeExternals from 'webpack-node-externals';

const isDev = process.env.NODE_ENV === 'dev';

function Root(...paths: string[]) {
    return path.join(__dirname, ...paths);
}

const Base: webpack.Configuration = {
    context: Root(),

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
                use: extractTextPlugin.extract(['style-loader', 'css-loader!sass-loader']),
            },
        ],
    },

    devtool: isDev ? 'cheap-module-source-map' : 'source-map',

    plugins: [
        new extractTextPlugin('style.css'),
    ],
};

export const Client: webpack.Configuration = {
    ...Base,

    target: 'web',
    name: 'client',

    entry: {
        client: Root('src/client'),
    },

    output: {
        path: Root('build/public/assets'),
        publicPath: '/assets/',
        filename: isDev ? '[name].js' : '[name].[hash:8].js',
        chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
    },

    plugins: [
        ...Base.plugins,
    ]
};

export const Server: webpack.Configuration = {
    ...Base,

    target: 'node',
    name: 'server',

    entry: {
        server: Root('src/server'),
    },

    // externals: nodeExternals(),

    output: {
        ...Base.output,
        path: Root('build'),
        filename: '[name].js',
        chunkFilename: 'chunks/[name].js',
        libraryTarget: 'commonjs2',
    },
};

export default [Client, Server];