const { EntitySchema } = require("typeorm");


const Users = new EntitySchema({
    name: 'users',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: "increment",
        },
        firstName: {
            type: String,
            length: 50,
            nullable: true,
        },
        lastName: {
            type: String,
            length: 50,
            nullable: true,
        },
        username: {
            type: String,
            length: 20,
            nullable: false,
            unique: true,
        },
        password: {
            type: String,
            length: 500,
            nullable: false,
        },
        email: {
            type: String,
            length: 50,
            nullable: false,
            unique: true,
        },
        created: {
            type: 'datetime',
            nullable: true,
        },
        isActive: {
            type: Boolean,
            nullable: false,
        }
    }
})


module.exports.Users = Users;


