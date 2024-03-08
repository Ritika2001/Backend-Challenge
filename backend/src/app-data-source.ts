import { DataSource } from "typeorm"
require('dotenv').config();
import { Users } from "./entities/user.entity";
import { Cars } from "./entities/car.entity";
import { Quotes } from "./entities/quotes.entity";

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const myDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [Users, Cars, Quotes],
    synchronize: true,
    logging: false,
});

export { myDataSource };

