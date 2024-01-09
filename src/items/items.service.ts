import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

@Injectable()
export class ItemsService {
    constructor(
        private configService: ConfigService,
        private dataSource: DataSource
    ) {}

    async findAll() {
        return "hello world";
    }
}
