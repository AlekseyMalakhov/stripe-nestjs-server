import { Test, TestingModule } from "@nestjs/testing";
import { PaymentService } from "./payment.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Item } from "../items/entities/item.entity";

describe("PaymentService", () => {
    let service: PaymentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PaymentService,
                {
                    provide: getRepositoryToken(Item),
                    useValue: ["some mock value"],
                },
            ],
        }).compile();

        service = module.get<PaymentService>(PaymentService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
