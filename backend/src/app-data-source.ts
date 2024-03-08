import { DataSource } from "typeorm"
import { Users } from "./entities/user.entity";
import { Cars } from "./entities/car.entity";
import { Quotes } from "./entities/quotes.entity";

const myDataSource = new DataSource({
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "utsafeinsurancedb",
    entities: [Users, Cars, Quotes],
    synchronize: true,
    logging: false,
})

export { myDataSource };

// AppDataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     });