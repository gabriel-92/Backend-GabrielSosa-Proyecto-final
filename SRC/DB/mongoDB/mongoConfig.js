import mongoose from 'mongoose';
import log from '../../models/log.js';
import dotenv from 'dotenv'
dotenv.config()


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
})
    .then(db => log.info('DB is connected'))
    .catch(err => log.error(err));