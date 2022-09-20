const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const cartRouter = require('./routes/cart');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public' + '/' + 'mockup')));
app.use(express.static(path.join(__dirname, 'public', 'js')));
app.use(cookieParser());


app.use('/api', indexRouter);
app.use('/cart', cartRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const createError = require('http-errors');
    let err = new Error('Not Found');
    next(createError(404, err));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// const { crearTablaMensajes } = require("./crearTablaMensajes");
// //ejecutar la función para crear la tabla mensajes
// crearTablaMensajes();

module.exports = app;
