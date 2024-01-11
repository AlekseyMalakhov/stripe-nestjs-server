import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { SuccessPaymentDto } from "./dto/success-payment.dto";

@Controller("payment-intent")
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Post()
    create(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentService.create(createPaymentDto);
    }

    @Post("succeed")
    success(@Body() successPaymentDto: SuccessPaymentDto) {
        console.log("Payment success");
        console.log(successPaymentDto.data.object.metadata);
        return "123";
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
