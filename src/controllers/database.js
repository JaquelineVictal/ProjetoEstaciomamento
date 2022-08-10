import sqlite3  from "sqlite3";
import { open } from "sqlite";

// função para abrir coneção com o banco de dados
export const openDataBase = async () => {

    return await open({

        filename: './src/database.db',
        driver: sqlite3.Database
   })
}