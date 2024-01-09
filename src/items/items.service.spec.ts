import { Test, TestingModule } from "@nestjs/testing";
import { ItemsService } from "./items.service";
import { ConfigModule } from "@nestjs/config";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entities/item.entity";

describe("ItemsService", () => {
    let service: ItemsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ItemsService,
                {
                    provide: getRepositoryToken(User),
                    useValue: ["some mock value"],
                },
            ],
            imports: [ConfigModule],
        }).compile();

        service = module.get<ItemsService>(ItemsService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
