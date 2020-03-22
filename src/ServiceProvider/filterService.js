const typeorm = require('typeorm');

module.exports = async function filter(message, { text }) {
    //testing word filtering 
    const { channel } = message;
    const wordrepo = typeorm.getConnection().getRepository("BadWords");
    const badwords = await wordrepo.find();

    const matches = badwords.filter(item => {
        const wordExp = new RegExp(`\\b${item.word.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
        return wordExp.test(text);
    })
    const matchedWords = matches.reduce((a,b) =>  a+=b.word, '')

    if(matchedWords) {
        channel.send(matchedWords)
    } else {
        channel.send('you are good :)')
    }

}
