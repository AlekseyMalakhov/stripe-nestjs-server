import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ItemsService {
    constructor(private configService: ConfigService) {}

    async findAll() {
        return "hello world";
    }
}
