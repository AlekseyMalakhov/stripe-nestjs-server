import { Controller, Post, Body, HttpException, HttpStatus } from "@nestjs/common";
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

    /*
    Stripe makes payment and then calls webhook (makes POST request on the provided url).
    We receive this request and then update our database to change status of the order to paid.
    If we can't update database and return exception from this webhook call - Stripe does not do anything
    It does not revoke the transaction and return money to the user.
    So user can make the second payment request for the same order and it will be accepted!
    */
    @Post("succeed")
    async success(@Body() successPaymentDto: SuccessPaymentDto) {
        try {
            const orderId = successPaymentDto.data.object.metadata.orderId;
            const result = await this.itemsService.update(77, { status: "paid" });
            console.log("result");
            console.log(result);
            return `Order ${orderId} is paid successfully`;
        } catch (error) {
            console.log(error);
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
