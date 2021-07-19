import {Entity, Column, PrimaryColumn, BeforeInsert, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Reviews } from "./Reviews";
import { Users } from "./User";

@Entity()
export class Likes extends BaseEntity {

    @PrimaryColumn("uuid") id: string;

    @Column("datetime", { nullable: false }) created: Date;

    @Column("text") userId: string
    @ManyToOne(() => Users, user => user.likedReviews) user: Users
    @JoinColumn({ name: "userId"})

    @Column("text") reviewId: string
    @ManyToOne(() => Reviews, review => review.likes) review: Reviews
    @JoinColumn({ name: "reviewId"})

    @BeforeInsert()
    addId() {
        this.id = uuidv4();
    }
}