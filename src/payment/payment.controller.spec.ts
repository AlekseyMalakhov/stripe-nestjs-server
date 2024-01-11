import { Test, TestingModule } from "@nestjs/testing";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Item } from "../items/entities/item.entity";
import { ItemsService } from "../items/items.service";
import { ConfigModule } from "@nestjs/config";

describe("PaymentController", () => {
    let controller: PaymentController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PaymentController],
            providers: [
                PaymentService,
                ItemsService,
                {
                    provide: getRepositoryToken(Item),
                    useValue: ["some mock value"],
                },
            ],
            imports: [ConfigModule],
        }).compile();

        controller = module.get<PaymentController>(PaymentController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
