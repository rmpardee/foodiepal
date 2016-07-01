module.exports = {
     entry: 'client/app.js',
     output: {
         path: 'client/',
         filename: 'app.bundle.js'
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
         }]
     }
 };