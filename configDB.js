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
    "private_key_id": "b5d42e66ab7ca0d7724c517e07280deba076fbd8",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDT0jzbTyQdmacx\nATvPne65V8tJbLOH9r8Fbb8jPP5pmttcxxIKTIJ+oOoFfd0k2zDmcB4ezKvYNIgx\nJwTYDLAnW7+oqHqzmFK/n88bOfyj8osFA6sYZDNBxuKwOPtkWYiUGaF+kdCljScj\nOsXXSBN3nablekVCTLDykBHaZsZwL9FFxhLG4cQYLSywbqKxGP7xjphUXKyZggQo\nCNya4w7HA5lwSvBlmxM80fxTfhSAQBd94Xri3sWu6VyLjsrQmj5lz7D6/v6UVMwE\nXiUKPLOA179e/Kl3BUbe2KzOnLgUwz++7uoj6KUygdXCbQJDhiJFJu2v/o2lzXsK\nyDkxKXcPAgMBAAECggEATMPpiDVjSlLwM6NV0MVUydjWdJKvcbvruITwe03UieM0\nUqhWkmLt/ARHK5xUs9G4JBtH3zOfp6hKHz4b1Eys3mayy+XbKhEvFAFPpndaZvQ0\ni6mrrRhLNzBj4SeVe+WyyLGNRHiF3CmOoIbhQkb9vyDkZk/sn715dz7dKYCLtAYG\n3pTsqetA6KZU1Iz8+d7qDfnY171A0y4Gf3dtRtF2l58LllgT6r1w92R5ZjJn0Zm2\nOdM3YFxJ/W868fgLEuSGmt/65h0O1Sy+fPosxULBmrEe416/PTolk2nYQEpkdn8g\nC/nuE8U/eSREg+dejPWdicKKwKdM3Hakbl7ExYEzWQKBgQD/CqN8fTpJi1lBw7xk\nS+qz2e5U6ic7lbkd113sFTd7lD7dYgVBeWy6UY9iPYQ7+ez3g3iNZKIbTzZO7Mi5\ntXpk3Cnzf4S6vX7QKEOmw95lpsdIUv/JIbw04NYTJ73KmeGbXthMRbGERP8ZStwl\nE2QgLvImaqgib6O0mX6KYmMnUwKBgQDUngTsCEXT0ZIIywa1iAzpw4A+DTi+j7Z4\nz6OibegMd1sf6g9g4KInlm29W0toD9S8+M9U/iYie0d60KKYJoAClrGhm68n2E5q\nYq02fEQU3HBE0FJt7jTfnkgli2DzhybbEHfF/+UGtdTvyto/+CiI2KC1bip66FkK\nPTb7CoJl1QKBgQC2f7Zc7n83AS/tj1LPskNQTzHsMWHBkXHVmLbsqIH7PCl/4RRB\ntdHHwXUIp1xoTn7y3nD1PH2DbTs/XtCDkwjyA1lBlI410kNcUHOYcbBCrQUNC9dc\n5Xb3n6uQKW/1+gcmVsgQTA6qx3SDdL3zCd0r6mv8cXW+roRGR0/1VlH9YQKBgQDP\nWhRexGqk+ts6rBWs8DP3vmvRGD/gyHMiOw3QmPMXRUefRjsdNbWueewoIWLW56mH\nafd5Yip6slOxmMsZK2LoI2K0wwn9B9zhr75RRrt2xMzQr4HUJ910v/6IbvdsSMBC\nIDtO5BLNioNSIDjc7f1KCEoi5n+TQgmkDLMT/NnSyQKBgAr+RO6cfWUyt4a+InHf\nhB0xNCp1YZMgLjgCgcVPkmFgF1kSgCjsYpraV/XvQslSv5O2C/85OVv94IMvsD3o\nEMQuSZq8hcry5lZngX4o+1csFMW0GfdEeq2dzsXBkrlOJaONFxcTTGUn1SUZQW4N\n2ll/Dm4g/JmTzXw/RRlPt/BU\n-----END PRIVATE KEY-----\n",
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

