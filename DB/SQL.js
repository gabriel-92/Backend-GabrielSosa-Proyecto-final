import { knexConfig } from '../config.js'
import crearKnex from 'knex'

export const clienteSql = crearKnex(knexConfig)