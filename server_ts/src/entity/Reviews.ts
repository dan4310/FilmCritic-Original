import {Entity, Column, PrimaryColumn, BeforeInsert, BaseEntity, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Likes } from "./Likes";
import { Users } from "./User";

@Entity()
export class Reviews extends BaseEntity {

    @PrimaryColumn("uuid") id: string;

    @Column("text") description: string;

    @Column("int", { nullable: false }) movieId: number;

    @Column("datetime", { nullable: false }) created: Date;

    @Column("float", { nullable: false }) rating: number;


    @Column("text") authorId: string
    @ManyToOne(() => Users, user => user.reviews) author: Users
    @JoinColumn({ name: "authorId"})

    @OneToMany(() => Likes, like => like.review)
    likes: Likes[]

    @BeforeInsert()
    addId() {
        this.id = uuidv4();
    }
}