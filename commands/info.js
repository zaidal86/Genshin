const { MessageEmbed } = require('discord.js');
const gi = require('../gi.json')

module.exports = {
	name: 'info',
	description: 'Give infos about a character.',
	execute(message) {
    const split = message.content.split(/ +/);
    const args = split.slice(1);
    const char = args[1].toLocaleLowerCase();
    
    return message.channel.send(
      new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(gi[char].name,gi[char].elements)
        .addField('Element', gi[char].desc)
        .setThumbnail(gi[char].logo)
        .addField('Vie de base', gi[char].healt, true)
        .addField('Attaque de base', gi[char].damage, true)
        .addField('Défense de base', gi[char].defend, true)
        .addField('Arme', gi[char].weapon, true)
        .addField('Etoile', gi[char].stars, true)
        .setTimestamp()
    );
	}
};
