import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "src/items/entities/item.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Item])],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule {}
