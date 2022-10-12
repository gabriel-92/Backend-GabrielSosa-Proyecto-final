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
    url: process.env.MONGO_URI || 'mongodb://localhost:27017/test',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 5000,
    },
};

//=======================================================//

//!============== Database FIRES connection================//


export const firebaseConfig = {
    "type": "service_account",
    "project_id": "backend-gabriel-sosa",
    "private_key_id": process.env.FIRESTORE_KEY,
    "private_key": process.env.FIRESTORE_PROJECT_ID,
    "client_email": "backend-gabriel-sosa@appspot.gserviceaccount.com",
    "client_id": "111947241460732672912",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/backend-gabriel-sosa%40appspot.gserviceaccount.com"
};


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

