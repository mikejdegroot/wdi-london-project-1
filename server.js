const express         = require('express');
const morgan          = require('morgan');
const app             = express();
const session         = require('express-session');
const expressLayouts  = require('express-ejs-layouts');
const mongoose        = require('mongoose'); // models/schema construction
mongoose.promise      = require('bluebird'); // mongoose add on
const methodOverride  = require('method-override');
const routes          = require('./config/routes');
const bodyParser      = require('body-parser');
const authenticateUser= require('./lib/authenticateUser');
const flash           = require('express-flash');
const customResponses = require('./lib/customResponses');
const errorHandler    = require('./lib/errorHandler');

const { port, dbURI, secret } = require('./config/environment');
mongoose.connect(dbURI);


app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

//middleware
app.use(morgan('dev'));
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session( {
  secret,
  resave: false,
  saveUninitialize: false
}));
app.use(flash());
app.use(customResponses);
app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(authenticateUser);
app.use(errorHandler);



// app.get('/', (req, res) => res.render('statics/index'));

app.use(routes); //hooks up the routes folder

app.listen(port, () => console.log(`Express is listening on port ${port}`));
