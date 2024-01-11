import { Controller, Get, Patch, Param, Body } from "@nestjs/common";
import { ItemsService } from "./items.service";
import { UpdateItemsDto } from "./dto/update-items.dto";

@Controller("items")
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    async findAll() {
        return await this.itemsService.findAll();
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateItemsDto: UpdateItemsDto) {
        return await this.itemsService.update(+id, updateItemsDto);
    }
}
