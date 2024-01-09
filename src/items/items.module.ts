import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ItemsService } from "./items.service";
import { ItemsController } from "./items.controller";

@Module({
    imports: [ConfigModule],
    controllers: [ItemsController],
    providers: [ItemsService],
})
export class ItemsModule {}
