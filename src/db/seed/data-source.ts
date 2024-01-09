import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import "dotenv/config";
import { Item } from "../../items/entities/item.entity";

//import { runSeeders, SeederOptions } from "typeorm-extension";

// (async () => {
//     const options: DataSourceOptions = {
//         type: "postgres",
//         host: process.env.PGHOST,
//         username: process.env.PGUSER,
//         password: process.env.PGPASSWORD,
//     };

//     const dataSource = new DataSource(options);
//     await dataSource.initialize();

//     runSeeders(dataSource, {
//         seeds: ["./*.seeder.ts"],
//     });
// })();
const options: DataSourceOptions & SeederOptions = {
    type: "postgres",
    host: process.env.PGHOST,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: "postgres",
    entities: [Item],
    seeds: ["src/db/seed/*.seeder.ts"],
};

export const dataSource = new DataSource(options);
