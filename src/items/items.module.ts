import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsService } from "./items.service";
import { ItemsController } from "./items.controller";
import { User } from "./entities/item.entity";

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([User])],
    controllers: [ItemsController],
    providers: [ItemsService],
})
export class ItemsModule {}
