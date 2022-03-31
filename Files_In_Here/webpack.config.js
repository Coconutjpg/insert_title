const path = require('path')

module.exports = { //We exporting this object wth the properties predefined in it
    mode: 'development', //mode
    entry: './src/index.js', //entry file for where we want webpack to look for our javascript source file
    output: { //object
        path: path.resolve(__dirname, 'dist'), //path to whatever place we want to place the bundle in
        filename: 'bundle.js' //filename
    },
    devtool: 'eval-source-map',
    experiments: { // Add this to get config to work
        topLevelAwait: true
    },
    watch: true //allows for code to be automatically updated everytime index.js is updated
}