import { Controller, Get, Patch, Param, Body } from "@nestjs/common";
import { ItemsService } from "./items.service";
import { UpdateItemsDto } from "./dto/update-items.dto";

@Controller("items")
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    findAll() {
        return this.itemsService.findAll();
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateItemsDto: UpdateItemsDto) {
        return this.itemsService.update(+id, updateItemsDto);
    }
}
