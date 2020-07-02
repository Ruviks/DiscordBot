module.exports = {
    name: "userItems",
    columns: {
        user_id: { type: "varchar", primary: true },
        item_id: { type: "varchar" },
        amount: {
            type: "int",
            default: 0,
        },
    }
}