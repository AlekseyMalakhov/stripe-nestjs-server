import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ItemsService {
    constructor(private configService: ConfigService) {
        this.dbURL = this.configService.get<string>("PGDATABASE");
    }

    dbURL;

    findAll() {
        console.log(this.dbURL);
        return `This action returns all items`;
    }
}
