const path = require('path');
const defaultConfig = require('./src/setting.js')
const name = defaultConfig.title || 'Wechat Demo'
module.exports = {
    publicPath: './',
    outputDir: undefined,

    devServer: {
        host: '127.0.0.1',
        port: 10086,
        open: true,

        proxy: {
            '/': {
                target: 'http://fljmlnmj.app.xiaozhuschool.com',
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    '^/': '',
                }
            },
        },
    },

    configureWebpack: {
        name,
        resolve: {
            alias: {
                '~': path.join(__dirname, 'src/components/oceans'),
                '~games': path.join(__dirname, 'src/components/games'),
                // 测试项目
                // '~test': path.join(__dirname, 'src/program/test'),
                // DLC鑫海按摩椅项目公用路径
                '~xh': path.join(__dirname, 'src/program/xhamy'),
                // DLC森值售卖柜项目公用路径
                // '~sz': path.join(__dirname, 'src/program/shenzhi'),
                // DLC车海洋共享洗车机项目公用路径
                '~chy': path.join(__dirname, 'src/program/chyxcj'),
                // DLC光健桑拿房项目公用路径
                '~snf': path.join(__dirname, 'src/program/gjsnf'),
                // DLC四川碾米机项目公用路径
                '~nmj': path.join(__dirname, 'src/program/scnmj'),
                // DLC吉明亮碾米机项目公用路径
                '~jmlnmj': path.join(__dirname, 'src/program/jmlnmj'),
            }
        }
    },

    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined,
    css: {
        // 是否开启支持 foo.module.css 样式
        modules: false,

        // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
        extract: true,

        // 是否构建样式地图，false 将提高构建速度
        sourceMap: false,

        // css预设器配置项
        loaderOptions: {
            less: {
                modifyVars: {
                    // blue: '#f7d052 !important', //光健桑拿房
                    // red: '#f7d052 !important',  //光健桑拿房
                    // blue: '#92c858 !important', //四川碾米机
                    // red: '#92c858 !important', //四川碾米机
                }
            },
        }
    },
}