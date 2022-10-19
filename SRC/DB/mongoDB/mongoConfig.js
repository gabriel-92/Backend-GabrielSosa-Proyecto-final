import mongoose from 'mongoose';


import dotenv from 'dotenv'
dotenv.config()


mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
})
          .then(db => console.log('DB is connected'))
          .catch(err => console.log(err));
