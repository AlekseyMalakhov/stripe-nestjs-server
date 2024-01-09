import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ItemsModule } from "./items/items.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./items/entities/item.entity";

@Module({
    imports: [
        ConfigModule.forRoot({ cache: true }),
        ItemsModule,
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.PGHOST,
            port: 5432,
            username: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: "postgres",
            entities: [User],
            synchronize: true,
            autoLoadEntities: true,
        }),
    ],
})
export class AppModule {}
