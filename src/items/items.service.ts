import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/item.entity";

@Injectable()
export class ItemsService {
    constructor(
        private configService: ConfigService,
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }
}
