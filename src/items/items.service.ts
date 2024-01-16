import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Item } from "./entities/item.entity";
import { UpdateItemsDto } from "./dto/update-items.dto";

@Injectable()
export class ItemsService {
    constructor(
        private configService: ConfigService,
        @InjectRepository(Item) private usersRepository: Repository<Item>
    ) {}

    async findAll(): Promise<Item[]> {
        return await this.usersRepository.find();
    }

    async update(id: number, updateItemsDto: UpdateItemsDto) {
        //TypeORM update does not have build-in check for existence of id so let's check it manually
        const exists = await this.usersRepository.existsBy({ id });
        if (!exists) {
            //to reject the promise in async function use throw exception
            throw new Error(`Item ${id} does not exists`);
        }
        //const result = await this.usersRepository.update(id, updateItemsDto);
        return `This action updates a #${id} item`;
    }
}
