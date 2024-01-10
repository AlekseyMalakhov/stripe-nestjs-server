import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ItemsModule } from "./items/items.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "./items/entities/item.entity";
import { PaymentModule } from './payment/payment.module';

@Module({
    imports: [
        ConfigModule.forRoot({ cache: true }),
        ItemsModule,
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.PGHOST,
            username: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            entities: [Item],
            synchronize: true,
            autoLoadEntities: true,
        }),
        PaymentModule,
    ],
})
export class AppModule {}
