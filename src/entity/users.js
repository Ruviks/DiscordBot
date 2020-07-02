module.exports = {
    name: "users",
    columns: {
        user_id: {
            type: "varchar",
            primary: true,
        },
        balance: {
            type: "int",
            default: 0,

        },
    },
    relations: {
        userItems: {
            type: "one-to-many",
            target: 'userItems'
        }
    }
}