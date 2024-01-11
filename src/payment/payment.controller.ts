import { Controller, Post, Body } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { SuccessPaymentDto } from "./dto/success-payment.dto";
import { ItemsService } from "../items/items.service";

@Controller("payment-intent")
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService,
        private readonly itemsService: ItemsService
    ) {}

    @Post()
    async create(@Body() createPaymentDto: CreatePaymentDto) {
        return await this.paymentService.create(createPaymentDto);
    }

    @Post("succeed")
    async success(@Body() successPaymentDto: SuccessPaymentDto) {
        const orderId = successPaymentDto.data.object.metadata.orderId;
        await this.itemsService.update(orderId, { status: "paid" });
        return `Order ${orderId} is paid successfully`;
    }

    // @Get()
    // findAll() {
    //     return this.paymentService.findAll();
    // }

    // @Get(":id")
    // findOne(@Param("id") id: string) {
    //     return this.paymentService.findOne(+id);
    // }

    // @Patch(":id")
    // update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    //     return this.paymentService.update(+id, updatePaymentDto);
    // }

    // @Delete(":id")
    // remove(@Param("id") id: string) {
    //     return this.paymentService.remove(+id);
    // }
}
