const dbSQLite3 = {
          filename: './db.sqlite3',
}
export const knexConfigSqlIte = {
          client: 'sqlite3',
          connection: dbSQLite3,
          useNullAsDefault: true
}