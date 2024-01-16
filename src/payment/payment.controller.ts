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
        try {
            //check if the item is already paid
            const paid = await this.itemsService.checkIfPaid(createPaymentDto.id);
            if (paid) {
                const errObj = {
                    message: `Item id = ${createPaymentDto.id} has been paid already`,
                };
                //to pass a specific status to catch we use a custom nestjs error
                throw new HttpException(errObj, HttpStatus.CONFLICT);
            }
            return await this.paymentService.create(createPaymentDto);
        } catch (err) {
            //top function will send the response
            //we need different response codes so here we take it from custom err argument)
            console.log(err);
            throw new HttpException(err, err.status);
        }
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
            //first we should verify that the request is from Stripe, using webhook's secret
            //if it is, then we can update DB
            const orderId = successPaymentDto.data.object.metadata.orderId;
            await this.itemsService.update(orderId, { status: "paid" });
            return `Order ${orderId} is paid successfully`;
        } catch (err) {
            console.log(err);
            const errObj = {
                message: err.message,
                stack: err.stack,
            };
            throw new HttpException(errObj, HttpStatus.INTERNAL_SERVER_ERROR);
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
