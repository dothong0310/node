const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const db = require('./config/db');
const route = require('./routes/index');
const methodOverride = require('method-override');

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// connect db
db.connect();

//http logger
// app.use(morgan('combined'))

//template engine
app.engine('hbs', handlebars({
  extname: '.hbs',
  helpers: {
    sum: (a,b)=> a+b,
  }
})); 
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, 'resources', 'views'));


route(app);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
})