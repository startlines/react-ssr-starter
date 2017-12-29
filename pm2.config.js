module.exports = {
    app: [
        {
            name: 'dev',
            script: './src/server',
            watch: true,
            env: {
                NODE_ENV: 'dev',
            },
        },

        {
            name: 'production',
            script: './build/server',
            env: {
                NODE_ENV: 'production',
            },
        },
    ]
}