
let fs = require('fs');

let path = require('path');

let mimeType = require('./mime');

async function main(fileURL) {

    try {
        var result = await reader();
        return result;
    } catch(err) {
        console.error(err);
    }

    function reader() {
        return new Promise((resolve, reject) => {
            fs.exists(fileURL, (exists) => {
                if ( !exists ) {
                    reject(err);
                } else {
                    resolve(fileURL);
                }
            })
        })
    }

}

module.exports = function(...args) {

    var [pathname, response] = args;

    var fileURL;

    fileURL = './static' + pathname;

    if ( /^\/save./.test(pathname) ) {
        pathname = pathname.replace(/\/save./, '/');
        fileURL = './images' + pathname;
    }

    var extname = path.extname(pathname);

    var mime = mimeType[extname];

    var p = main(fileURL);

    p.then((file) => {
        var rs = fs.createReadStream(file);
        response.writeHead('200', { "Content-Type": mime });
        rs.pipe(response);
        console.log('GET: ', pathname);
    })
    .catch((err) => {
        console.log(err);
        response.writeHead('404', { "Content-Type": "text/html;charset=utf-8" });
        response.end('404页面没有找到!');
    })

}