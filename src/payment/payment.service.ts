import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);

@Injectable()
export class PaymentService {
    async create(createPaymentDto: CreatePaymentDto) {
        const price = 10;

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return { clientSecret: paymentIntent.client_secret };
    }

    // findAll() {
    //     return `This action returns all payment`;
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} payment`;
    // }

    // update(id: number, updatePaymentDto: UpdatePaymentDto) {
    //     return `This action updates a #${id} payment`;
    // }

    // remove(id: number) {
    //     return `This action removes a #${id} payment`;
    // }
}
