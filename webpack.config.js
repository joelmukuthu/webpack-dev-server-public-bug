module.exports = {
  mode: 'development',
  entry: {
    app: './app.js'
  },
  devServer: {
    port: 8000,
    host: '0.0.0.0',
    // without `public`, the dev server client can't connect to the dev server
    // public: '0.0.0.0',
  }
}
