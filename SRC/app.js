import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import cartRouter from './routes/cart';

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
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


export default app;



//======= ejecutar la función para crear la tabla mensajes===//
// const { crearTablaMensajes } = require("./crearTablaMensajes");
// crearTablaMensajes();
//===========================================================//

//=======SAVE PRODUCTS IN FIREBASE=======================//
//import algoritmoGuardadoAutomático from './utility/firebaseSaveProducts.js';
//algoritmoGuardadoAutomático();
//=======================================================//
//module.exports = app;
