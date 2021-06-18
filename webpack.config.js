/*webpack.config.js*/

const path = require("path");                     //Node 提供的核心模組

/* 先把處理 CSS 的外掛程式匯入 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/index.jsx",                       //進入點
	output:{
		filename: "bundle.js",                    //打包後的檔案名稱
		path: path.resolve(__dirname,"./dist/"),  //當前的絕對路徑
	},
	devServer: {
		contentBase:"./dist",                     //產品程式碼的路徑
	},

	module:{
		rules: [                                          //是一個陣列
			{
				test: /\.(js|jsx)$/,                             //用正規表達式搜索期望的目標檔案
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env" , "@babel/preset-react"],  //針對條件符合的檔案，進行 preset 編譯
					},
				},
			},
			{
				test: /\.(scss)$/,                             //用正規表達式搜索期望的目標檔案
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
					loader: "css-loader",
					options: {
						modules:{
							localIdentName: "[path][local]___[hash:base64:5]",  //重新命名 style 裡的 class 名稱
						},				
					},
				},
				{
					loader:"sass-loader",
				},
			],
		},
			{
				test:/\.(png|svg|jpg|jpeg|gif|ico)$/,
				use:["file-loader"]
			},			
		],
	},
	plugins:[                                                    // CSS 外掛程式
		new MiniCssExtractPlugin({filename:"index.css",}),       // 產生 CSS 的檔案名稱 
	],
};