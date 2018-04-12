
const Bat = require('./Bat');

const template = require('./template');

const catcher = require('./catcher');

let bat = new Bat();

bat.use(template);

bat.use(catcher);

bat.listen(8080);







