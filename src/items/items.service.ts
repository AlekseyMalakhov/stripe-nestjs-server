import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Pool } from "pg";

@Injectable()
export class ItemsService {
    constructor(private configService: ConfigService) {}
    pool = new Pool();

    async findAll() {
        const client = await this.pool.connect();
        const res = await client.query("select * from items");
        client.release();
        return res.rows;
    }
}
