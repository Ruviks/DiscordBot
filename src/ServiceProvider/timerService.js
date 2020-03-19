module.exports = async function SetTimer(message, { init, interval }) {
    let _init_ = init;
    let channel = message.channel;
    let x = setInterval(async () => {

        _init_ = _init_ - interval;
        await channel.send(`${_init_} seconds left`);
        if (_init_ == 0) clearInterval(x);
    }, interval * 1000);
}
