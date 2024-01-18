import { Controller, Post, Body, HttpException, HttpStatus } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { SuccessPaymentDto } from "./dto/success-payment.dto";
import { ItemsService } from "../items/items.service";

/*
Stripe implementation
1)	When user pushes button “Pay” he will be redirected to /payment page. When this page loads, on mount, it makes POST request to /payment-intent URL with body containing id 
of the order. 
2)	Our server receives this request and checks if this order is paid or not. If it is paid earlier our server returns error 409 with text “Item id=… has been paid already”. 
If it is not paid, server runs  stripe.paymentIntents.create() function provided by Stripe library. This library function sends request to the Stripe server and 
returns clientSecret. Server sends this clientSecret back to the client.
3)	Browser receives client secret and displays the form to enter payment card data – this form is provided by Stripe React library (Stripe Elements). User enters 
card data and pushes Pay button. Form internally takes clientSecret, card data and sends it to Stripe server (using internal Stripe library function).
4)	Stripe validates user input and tries to pay. If succeed it returns 200 response and stripe library redirects user to /payment-success/${itemToBuy.id} page. 
At the same time Stripe server calls webhook POST /succeed with orderId in its body. Our server takes orderId and updates payment status to “paid” in DB for this orderId.
5)	/payment-success/${itemToBuy.id} page shows user “Payment success. Status of order is updating…” message and on mount makes GET /items/check-if-paid/${id} request 
to our server and check if order status is updated for this orderId. If order status is paid – it shows to user Success message “Order status successfully updated. 
Please return to the main page”. If not, it continues to show user “Status of order is updating…” waits for 3 seconds and makes the same request again. If request 
returns error – page shows error information.
*/

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
