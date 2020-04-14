# Minimal reproduction for [webpack-dev-server#1726](https://github.com/webpack/webpack-dev-server/issues/1726)

## How to reproduce

1. Install docker and docker-compose if you haven't already
2. Clone this repo
3. Run `yarn install` to install deps
4. Run `docker-compose up` to run the app in docker
5. Once running, navigate to [http://0.0.0.0:12345](http://0.0.0.0:12345) on a
   browser. You'll see "hello" on the page.
6. On the browser, open the console. You'll see these kind of errors being
   printed

   ```
   GET http://0.0.0.0:8000/sockjs-node/info?t=<some number>net::ERR_CONNECTION_REFUSED
   ```

## The bug

1. Webpack's dev server runs inside a Docker container on port `8000`
2. With docker-compose, that port is mapped to `12345` on the host machine
3. On the browser, webpack's dev server's client tries to connect to the dev
   server via http://0.0.0.0:8080, while according to [the
   documentation](https://webpack.js.org/configuration/dev-server/#devserverpublic),
   it should attempt to connect to `window.location`, which in this case is
   http://0.0.0.0:12345.

What the docs say:

> When using inline mode and you're proxying dev-server, the inline client
> script does not always know where to connect to. It will try to guess the URL
> of the server based on window.location, but if that fails you'll need to use
> this.

## The workaround

Ensure you set a `devServer.public` to `0.0.0.0` in `webpack.config.js` to tell
the client where to send requests to.
