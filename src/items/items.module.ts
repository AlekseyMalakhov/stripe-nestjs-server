import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ItemsService } from "./items.service";
import { ItemsController } from "./items.controller";

@Module({
    imports: [ConfigModule, TypeOrmModule],
    controllers: [ItemsController],
    providers: [ItemsService],
})
export class ItemsModule {}
