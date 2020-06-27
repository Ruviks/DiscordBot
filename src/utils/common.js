/**
 * @param {string} date
 * @returns {number} time in units of seconds
 */
module.exports = function timeParser(date) {
    let x = date.split(" ");
    let time = 0;
    dict = { "h": 3600, "s": 1, "m": 60 }
    x.forEach(element => {
        time += parseInt(element.slice(0, -1)) * dict[element.slice(-1)]
    });
    return time;
}
