const path = require('path')
const APP_PATH = path.resolve(__dirname, '../app')
const DIST_PATH = path.resolve(__dirname, '../dist')

module.exports = {
    entry: {
        app: './app/index.js',
        framework: ['react', 'react-dom']
    },
    output: {
        filename: 'js/bundle.js',
        path: DIST_PATH
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: "babel-loader",
                include: APP_PATH
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins:[
                                require('autoprefixer')({
                                    browsers:['last 5 version']
                                })
                           ]
                        }
                    }
                ]
            },
            {
                test:/\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {  
                        loader: "css-loader" 
                    },
                    {
                        loader: "postcss-loader",//自动加前缀
                        options: {
                            plugins:[
                                    require('autoprefixer')({
                                        browsers:['last 5 version']
                                    })
                            ]
                        }
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    {  
                        loader: "style-loader"  
                    },
                    {
                        loader: "css-loader",
                    },
                    {  
                        loader: "sass-loader" 
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins:[
                                require('autoprefixer')({
                                browsers:['last 5 version']
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options: {
                          // outputPath:'../',//输出**文件夹
                          publicPath: '/',
                          name: "images/[name].[ext]",
                          limit:500  //是把小于500B的文件打成Base64的格式，写入JS
                     }
                  }]
            },
            {
                test: /\.(png|jpg|gif|woff|svg|eot|woff2|tff)$/,
                use: 'url-loader?limit=8129', 
                //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
                exclude: /node_modules/
            }
        ]
    }
}