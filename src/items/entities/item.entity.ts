import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export type ItemStatus = "paid" | "unpaid";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "timestamptz" })
    created_at;

    @Column({
        type: "enum",
        enum: ["paid", "unpaid"],
        default: "unpaid",
    })
    status: ItemStatus;

    @Column({ type: "decimal" })
    price;
}
