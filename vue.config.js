// vue.config.js

module.exports = {
    // configureWebpack: {// ブラウザ側でelectronを読み出せるようにする(mainプロセスと通信するため)
	// 	target: 'electron-renderer',
	// },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {// electron配布用のビルドオプション。記載ないパラメータはデフォルトの動作

                win:{//windows用のビルド ドキュメント:https://www.electron.build/configuration/win

                    target: "portable",// 出力形式 (nsis:インストーラ, portable:単体実行ファイル, appx:ストアファイル形式...)
                    icon: "./src/assets/Electron_Icon.png"//実行ファイルアイコン
                }
            }
        }
    },
    // css: {
    //     loaderOptions: {
    //         css: {
    //             sourceMap: true,
    //         },
    //         postcss: {
    //             sourceMap: true,
    //         }
    //     }
    // }
}