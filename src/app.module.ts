import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ItemsModule } from "./items/items.module";

@Module({
    imports: [ConfigModule.forRoot({ cache: true }), ItemsModule],
})
export class AppModule {}
