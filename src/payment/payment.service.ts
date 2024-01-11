import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Item } from "src/items/entities/item.entity";
import "dotenv/config";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);

@Injectable()
export class PaymentService {
    constructor(@InjectRepository(Item) private usersRepository: Repository<Item>) {}

    async create(createPaymentDto: CreatePaymentDto) {
        const id = createPaymentDto.id;
        const item = await this.usersRepository.findOneBy({ id });
        const price = item.price * 100;

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                orderId: id,
                price,
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
