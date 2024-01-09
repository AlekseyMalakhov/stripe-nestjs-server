import { Test, TestingModule } from "@nestjs/testing";
import { ItemsController } from "./items.controller";
import { ItemsService } from "./items.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

describe("ItemsController", () => {
    let controller: ItemsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ItemsController],
            providers: [ItemsService],
            imports: [ConfigModule, TypeOrmModule],
        }).compile();

        controller = module.get<ItemsController>(ItemsController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
