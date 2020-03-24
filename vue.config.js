const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('routes', resolve('src/routes'))
            .set('store', resolve('src/store'))
            .set('utils', resolve('src/utils'))
    },

    devServer: {
        proxy: {
            '/api': {
                changeOrigin: true,
                target: 'http://localhost:3000',
                pathRewrite: {
                    '^/api': 'http://localhost:3000/api'
                }
            }
        }
    }
};
