const path = require('path'); // node.js 경로 조작
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'word-relay-setting',
    mode: 'development', // 실서비스에서는 production으로 교체
    devtool: 'eval', // production -> hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx']
    },
    // 중요
    entry: {
        app: ['./client'] // 입력 후 console에서 webpack 명령어 입력(webpack은 명령어 등록이 필요하다.)
        // 명령어 등록은
        // 1. package.json에서 "dev": "webpack"를 script에 추가 하기 -> npm run dev
        // 2. 추가 후 npx webpack
        // client.jsx에서 WordRelay.jsx를 포함하므로 넣어 줄 필요없다.
        // 확장자도 쓸 필요 없다.(resolve : extentions 추가)
    }, // 입력 : 최종 js파일을 만들 때 들어가는 파일들
    module: {
        rules: [{
            test: /\.jsx?/, // 규칙을 적용할 파일들(정규표현식)
            loader: 'babel-loader', // babel-loader를 적용
            options: {
                // 다운 받은 env와 react를 넣어줌
                // presets: ['@babel/preset-env', '@babel/preset-react'],
                // preset-env : plugin들의 모음
                // preset-env에도 따로 옵션을 적용할 수 있다.
                // 아래와 같이 하나의 배열요소로 설정하고 옵션들을 객체로 전달한다.
                // docs : https://babeljs.io/docs/en/babel-preset-env
                // 참고 : https://github.com/browserslist/browserslist
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR'], // KR에서 5%이상의 점유율을 가지는 브라우저, chrome 최근 2개버전
                        },
                        debug: true // 개발용 옵션
                    }],
                    '@babel/preset-react'
                ],
                plugins: [
                    'react-refresh/babel'
                ],
                // 에러가 날경우 에러메세지를 보고 따라하면 된다.
                // '@babel/plugin-proposal-class-properties'가 필요할 수 있음
                // plugins에 이를 추가
                // plugins : ['@babel/plugin-proposal-class-properties']
            },
        }]
    }, // entry의 파일들을 module을 적용하여 output으로 
    plugins: [
        new RefreshWebpackPlugin()
    ],
    output: {
        path: path.join(__dirname, 'dist'), // __dirname : 현재폴더(webGame의 경로), 'dist' 폴더
        filename: 'app.js',
        publicPath: '/dist/',
    }, // 출력 : 최종 js파일
    devServer: {
        publicPath: '/dist/',
        hot: true,
        port: 8090
    },
};
// webpack docs
// https://webpack.js.org/concepts/