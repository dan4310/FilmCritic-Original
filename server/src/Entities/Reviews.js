const { EntitySchema, JoinColumn } = require("typeorm");
const { UserType } = require("../Schema/TypeDefs/User");

const Reviews = new EntitySchema({
    name: 'reviews',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: "increment",
        },
        description: {
            type: String,
            length: 50,
            nullable: true,
        },
        rating: {
            type: 'float',
            nullable: false,
        },
        created: {
            type: 'datetime',
            nullable: true,
        },
        authorId: {
            type: 'int',
            nullable: false,
        },
        movieId: {
            type: 'int',
            nullable: false,
        }
    }
})

module.exports.Reviews = Reviews;