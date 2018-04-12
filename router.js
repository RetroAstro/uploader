
function route(pathname, request, response, ...middlewares) {

    let [template, catcher] = middlewares;

    if ( pathname == '/' ) {
        pathname += 'index.html';
    }

    if ( pathname == '/favicon.ico' ) return;

    if ( pathname == '/upload' ) {
        catcher(request, response);
        return;
    }

    template(pathname, response);

}

module.exports = route;