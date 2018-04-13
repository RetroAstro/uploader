
let http = require('http');

let url = require('url');

let fs = require('fs');

let path = require('path');

let router = require('./router');

const middlewares = [];

class Bat {
    constructor() {
        
    }
    use(fn) {
        if ( typeof fn === 'function' ) {
            middlewares.push(fn);
        } else {
            return console.log('fn is not a function !');
        }
    }
    listen(port) {
        http.createServer(this.callback.bind(this)).listen(port, '0.0.0.0');
        console.log('server is running at port 8080.');
    }
    callback(request, response) {
        var pathname = url.parse(request.url).pathname;
        router(pathname, request, response, ...middlewares);
    }
}

module.exports = Bat;
