var express = require('express');
var session = require('express-session');
var bp = require('body-parser');
var path = require('path');
var app = express();
var serverport = process.env.PORT || 5000;

app.use(bp.json());
app.use(express.static(path.join(process.env.PWD, '/client')));
app.use(express.static(path.join(process.env.PWD, '/bower_components')));
app.use(session({
  secret: 'timberdog',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(serverport, function(){
    console.log(`Listening on port ${serverport}`);
});
