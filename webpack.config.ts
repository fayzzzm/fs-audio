import * as path from "path";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const appPath = path.resolve(__dirname, "./src");
const nodeModulesPath = path.resolve("./node_modules");

module.exports = {
    entry: {
        app: path.resolve(__dirname, "src/main.ts"),
    },
    output: {
        filename: "[hash].js",
        path: path.resolve(__dirname, "dist"),
    },
    mode: "development",
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".jsx"],
        alias: {
            "@app": appPath,
            "@service": path.resolve(appPath, "./services"),
            "@components": path.resolve(appPath, "./components"),
        },
        modules: [appPath, nodeModulesPath],
    },
    devServer: {
        port: 9000,
        open: true,
        // watchContentBase: true,
    },
    target: "web",
    module: {
        rules: [
            {
                test: /\.tsx?/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: "tsconfig.json",
                        },
                    },
                ],
            },
            {
                test: /\.jpg$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[hash:7].[ext]",
                            outputPath: "assets",
                        },
                    },
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: appPath,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
            minify: false,
        }),
        new MiniCssExtractPlugin({
            filename: "[hash].css",
        }),
    ],
};
