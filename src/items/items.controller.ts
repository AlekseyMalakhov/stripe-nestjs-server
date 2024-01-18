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

    @Get("check-if-paid/:id")
    async checkIfPaid(@Param("id") id: string) {
        const paid = await this.itemsService.checkIfPaid(+id);
        return {
            paid,
        };
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() updateItemsDto: UpdateItemsDto) {
        return await this.itemsService.update(+id, updateItemsDto);
    }
}
