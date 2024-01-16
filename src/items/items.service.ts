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
        const result = await this.usersRepository.update(id, updateItemsDto);
        console.log(result);
        return `This action updates a #${id} item`;
    }
}
