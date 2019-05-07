var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookie = require('cookie-session');
var cors = require('cors');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
var user = require('./routes/userData');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var myRouter = require('./routes/hw3');
var alphaRouter = require('./routes/hw4');
var oauthRouter = require('./routes/oauth');

var app = express();

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(null,user);
  })
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new GoogleStrategy({
      callbackURL: 'http://localhost:4200/dashboard',
      clientID: 'YOUR ID',
      clientSecret:'YOUR SECRET'
    },(accessToken,refreshToken,profile,done)=>{
      user.findOne({googleId: profile.id}).then((currentUser)=>{
        if(currentUser){
          done(null,currentUser);
        }
        else{
          new user({
            username: profile.displayName,
            googleId: profile.id
          }).save().then((newUser)=>{
            console.log('new user'+ newUser);
            done(null,newUser);
          })
        }
      })

    })
)



app.use(cookie({
  maxAge:24*60*60*1000,
  keys:['123456']
}));


mongoose.connect('mongodb://localhost:27017',()=>{
  console.log('mongodb');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hw3', myRouter);
app.use('/hw4', alphaRouter);
app.use('/oauth', oauthRouter);

app.use(cors());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
module.exports = app;
