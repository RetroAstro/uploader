
let fs = require('fs');

let multiparty = require('multiparty');

// let insert = require('./connect');

function catcher(request, response) {

    var form = new multiparty.Form();

    form.uploadDir = './images';

    form.parse(request, function(err, fields, files){

        var inputFile = files.file[0];
        var uploadedPath = inputFile.path;
        var dstPath = './images/' + inputFile.originalFilename;

        fs.rename(uploadedPath, dstPath, function(err) {
            if ( err ) {
                console.log('rename error: ' + err);
            } else {
                console.log('rename ok');
                files.file.path = dstPath;
                response.writeHead(200,{'Content-type': 'text/html;charset=utf-8'});
                response.end(inputFile.originalFilename);
            }
        })

        var abPath = __dirname.replace('\\', '/') + '/images/' + inputFile.originalFilename;

        // insert(inputFile.originalFilename, abPath);

    })

}

module.exports = catcher;
