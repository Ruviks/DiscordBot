const { green, orange, red } = require('../utils/colors')
const colorEmbed = require('../utils/embeds')
module.exports = async function SetTimer(message, { init, interval }) {
    let _init_ = init;
    let channel = message.channel;
    let messageobject = await channel.send(colorEmbed(green, `Timer set for ${_init_} seconds `))
    let x = setInterval(async () => {

        _init_ = _init_ - interval;
        if (_init_ <= 0) { await messageobject.edit(colorEmbed(red, `Timer Finished`)); clearInterval(x); }
        else
            await messageobject.edit(colorEmbed(orange, `${_init_} seconds left`));

    }, interval * 1000);
}
