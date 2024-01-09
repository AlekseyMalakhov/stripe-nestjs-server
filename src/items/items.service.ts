import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Item } from "./entities/item.entity";

@Injectable()
export class ItemsService {
    constructor(
        private configService: ConfigService,
        @InjectRepository(Item) private usersRepository: Repository<Item>
    ) {}

    findAll(): Promise<Item[]> {
        return this.usersRepository.find();
    }
}
