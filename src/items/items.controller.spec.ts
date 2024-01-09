import { Test, TestingModule } from "@nestjs/testing";
import { ItemsController } from "./items.controller";
import { ItemsService } from "./items.service";
import { ConfigModule } from "@nestjs/config";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entities/item.entity";

describe("ItemsController", () => {
    let controller: ItemsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ItemsController],
            providers: [
                ItemsService,
                {
                    provide: getRepositoryToken(User),
                    useValue: ["some mock value"],
                },
            ],
            imports: [ConfigModule],
        }).compile();

        controller = module.get<ItemsController>(ItemsController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
