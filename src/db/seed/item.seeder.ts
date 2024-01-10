import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { Item } from "../../items/entities/item.entity";

export default class UserSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<any> {
        const repository = dataSource.getRepository(Item);
        await repository.insert([
            {
                name: "Milk",
                price: 5,
            },
            {
                name: "Bread",
                price: 9,
            },
            {
                name: "Cheese",
                price: 14,
            },
        ]);
        console.log("Seeding complete");
    }
}
