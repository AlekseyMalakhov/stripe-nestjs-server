import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

export type ItemStatus = "paid" | "unpaid";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({
        type: "enum",
        enum: ["paid", "unpaid"],
        default: "unpaid",
    })
    status: ItemStatus;

    @Column({ type: "decimal" })
    price: number;
}
