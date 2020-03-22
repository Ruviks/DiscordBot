module.exports = {
    name: "BadWords",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        word: {
            type: "varchar"
        }
    }
};