import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { Item } from "../../items/entities/item.entity";

export default class UserSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<any> {
        const repository = dataSource.getRepository(Item);
        console.log(123);
        await repository.insert([
            {
                name: "Milk",
                price: 12,
                // created_at: () => "2024-01-01 08:10:10+00",
                // status: () => "paid",
            },
        ]);
    }
}
