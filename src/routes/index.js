const newRouter = require('./news');
const siteRouter = require('./site');
const productsRouter = require('./products');
const coursesRouter = require('./courses');
const loginRouter = require('./login');
const meRouter = require('./me');


function route(app){
    app.use('/news', newRouter);
    app.use('/products', productsRouter); 
    app.use('/courses', coursesRouter);
    app.use('/login', loginRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}

module.exports = route;
