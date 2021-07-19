import {Entity, Column, PrimaryColumn, BeforeInsert, BaseEntity, OneToMany }  from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Likes } from "./Likes";
import { Reviews } from "./Reviews";

@Entity()
export class Users extends BaseEntity {

    @PrimaryColumn("uuid") id: string;

    @Column("varchar", { length: 255 }) email: string;

    @Column("varchar", { length: 20 }) username: string;

    @Column("varchar", { length: 20, nullable: true }) firstName: string;

    @Column("varchar", { length: 20, nullable: true }) lastName: string;

    @Column("datetime", { nullable: false}) created: Date;

    @Column("text") password: string;

    @OneToMany(() => Reviews, review => review.author)
    reviews: Reviews[];

    @OneToMany(() => Likes, like => like.user)
    likedReviews: Likes[];

    @BeforeInsert()
    addId() {
        this.id = uuidv4();
    }
}
