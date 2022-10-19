//importación de express
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import flash from 'connect-flash';
//=======================================================//
//importaciones de las rutas
import indexRouter from './routes/index';
import cartRouter from './routes/cart';
import productTest from './routes/test';
import users from './routes/users';
//=======================================================//
//importación de mongo y session
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
//=======================================================//

const app = express();

app.use(session({
    store: new MongoStore({
        mongoUrl: process.env.MONGO_URI,
        ttl: 60 * 10 // 10 minutes...
    }),
    secret: process.env.KEYWORD,
    resave: "true",
    saveUninitialized: true,
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(flash());
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
    app.locals.signInMessage = req.flash('signInMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user = req.user;
    next();
});


app.use('/', users)
app.use('/api', indexRouter);
app.use('/cart', cartRouter);
app.use('/product-test', productTest)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const createError = require('http-errors');
    let err = new Error('Not Found');
    next(createError(404) || err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { title: "Error" });
});


export default app;
