import { Entity } from "typeorm";

@Entity()
export class User {
    id: number;
    name: string;
    description: string;
    filename: string;
    views: number;
    isPublished: boolean;
}