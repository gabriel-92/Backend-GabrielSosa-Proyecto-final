import { knexConfigSqlIte } from "./kenexConfig";
import knex from "knex";

export const clienteSqlIte = knex(knexConfigSqlIte);