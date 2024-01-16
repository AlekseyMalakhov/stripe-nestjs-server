import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Item } from "./entities/item.entity";
import { UpdateItemsDto } from "./dto/update-items.dto";
// import { serializeError } from "serialize-error";

@Injectable()
export class ItemsService {
    constructor(
        private configService: ConfigService,
        @InjectRepository(Item) private usersRepository: Repository<Item>
    ) {}

    async findAll(): Promise<Item[]> {
        return await this.usersRepository.find();
    }

    async checkIfPaid(id: number) {
        const order = await this.usersRepository.findOneBy({ id });
        if (!order) {
            throw new HttpException(`Item id = ${id} is not found`, HttpStatus.NOT_FOUND);
        }
        return order.status === "paid";
    }

    async update(id: number, updateItemsDto: UpdateItemsDto) {
        //TypeORM update does not have build-in check for existence of id so let's check it manually
        const exists = await this.usersRepository.existsBy({ id });
        if (!exists) {
            //to reject the promise in async function use throw exception
            //it would be nice to use serializeError here but Nestjs doesn't support ESM modules
            throw new Error(`Item ${id} does not exists`);
        }

        //TypeORM does not check at runtime if updated property exists. But as we use TS it checks it at build time
        //using updateItemsDto class (used in this case as type or interface)
        //so id is checked and body is checked - nothing should bring us any error
        await this.usersRepository.update(id, updateItemsDto);
        return `This action updates a #${id} item`;
    }
}
