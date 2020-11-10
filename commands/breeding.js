const { MessageEmbed } = require('discord.js');
const gi = require('../gi.json')

module.exports = {
	name: 'breeding',
	description: 'Give infos about spells.',
	execute(message) {
    const split = message.content.split(/ +/);
    const args = split.slice(1);
    const char = args[1].toLocaleLowerCase();
    
    return message.channel.send(
      new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(gi[char].name,gi[char].elements)
        .setThumbnail(gi[char].logo)
        .addField('yolo',gi[char].breeding[0].comp1[0].coins)
        .setTimestamp()
    );
	}
};
