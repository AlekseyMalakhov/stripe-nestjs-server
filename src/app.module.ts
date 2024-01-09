import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ItemsModule } from "./items/items.module";

@Module({
    imports: [ConfigModule, ItemsModule],
})
export class AppModule {}
