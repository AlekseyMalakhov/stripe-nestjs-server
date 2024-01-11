import { PartialType } from "@nestjs/mapped-types";
import { CreateItemsDto } from "./create-items.dto";
import { ItemStatus } from "../entities/item.entity";

export class UpdateItemsDto extends PartialType(CreateItemsDto) {
    status: ItemStatus;
}
