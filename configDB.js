import dotenv from "dotenv";
dotenv.config();



//!============== Database MYSQL connection================//

import knex from 'knex'

const knexConfig = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
}

export const clienteSql = knex(knexConfig);


//=======================================================//

//!============== Database MONGO connection================//

export const mongoConfig = {
    url: process.env.MONGO_URI,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 5000,
    },
}

//=======================================================//

//!============== Database FIRES connection================//


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: "backend-gabriel-sosa",
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


//=======================================================//

//!============== Database SQLITE3 connection================//

import path from "path";

const configSQLITE = {
    client: "sqlite3",
    connection: {
        filename: 'db.sqlite3',
        filename: path.join(__dirname, './DB/DB_SQLite3/db.sqlite3'),
    },
    useNullAsDefault: true,
};


export const clienteSqlIte = knex(configSQLITE);

//=======================================================//

