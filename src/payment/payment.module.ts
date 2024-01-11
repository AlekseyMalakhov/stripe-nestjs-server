import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "src/items/entities/item.entity";
import { ItemsService } from "src/items/items.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([Item])],
    controllers: [PaymentController],
    providers: [PaymentService, ItemsService],
})
export class PaymentModule {}
