module.exports = {
    name: "currency_shop",
    columns: {
        item_id: {
            type: "varchar",
            unique: true,
            primary: true,
        },
        cost: {
            type: "int",
            nullable: false,
        },
    }
}