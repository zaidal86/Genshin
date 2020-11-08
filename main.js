//Variables//
const Discord = require('discord.js');
var bot = new Discord.Client();
var config = require('./config/config.json');
var GI = require('./config/GI.json');
var prefix = config.prefix;
var author = 'Zaidal';
//---------//

//Clef D'activation du bot //
bot.login(config.token);
//-------------------------//

//Démarrage du bot//
bot.on('ready', () => {
  bot.user.setPresence({ game: { name: prefix + 'command', type: 0 }});
  bot.user.setStatus(config.status);
  console.log('Bot Ready !');
});
//---------------//

//Programme//
bot.on('message', message => {

  if(message.content.startsWith(config.prefix)) {
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();

    if(command === 'status') {
      if(args.length == 1) {
        if(args[0] === 'online') {
          message.channel.sendMessage('Bot en mode online');
          bot.user.setStatus('online');
        }
      }
      if(args[0] === 'invisible') {
        message.channel.sendMessage('Bot en mode invisible');
        bot.user.setStatus('invisible');
      }
      if(args[0] === 'absent') {
        message.channel.sendMessage('Bot en mode absent');
        bot.user.setStatus('idle');
      }
      if(args[0] === 'occupe') {
        message.channel.sendMessage('Bot en mode occupé');
        bot.user.setStatus('dnd');
      }
    }

    if(command === 'command') {
      var help_embed = new Discord.RichEmbed()
        .setColor('00CAFF')
        .setThumbnail('https://www.freeiconspng.com/uploads/wrench-icon-20.png')
        .setTitle("Voici les commandes d'aide !")
        .addField('1: Status','Change le status du bot entre invisible,online,absent et occupe')
        .addField('2: GI','Genshin impact')
        .setTimestamp();

      message.channel.sendMessage(help_embed)
    }

    if(command === 'gi') {
      if(args.length >= 1) {
        if(args[0] === 'info') {
          if(args.length == 2) {
            var perso = args[1].toLocaleLowerCase();

            try {
              const exampleEmbed = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setAuthor(GI[perso].name,GI[perso].elements)
                .addField('Element', GI[perso].desc)
                .setThumbnail(GI[perso].logo)
                .addField('Vie de base', GI[perso].healt, true)
                .addField('Attaque de base', GI[perso].damage, true)
                .addField('Défense de base', GI[perso].defend, true)
                .addField('Arme', GI[perso].weapon, true)
                .addField('Etoile', GI[perso].stars, true)
                .setTimestamp();

              message.channel.sendMessage(exampleEmbed);
            } catch { essage.channel.sendMessage('Error'); }
          } else { message.channel.sendMessage('Manque une info !'); }

          if(args[0] === 'breeding') {
            if(args.length == 2) {
              var perso = args[1].toLocaleLowerCase();
              try {
                const exampleEmbed = new Discord.RichEmbed()
                  .setColor('#0099ff')
                  .setAuthor(GI[perso].name,GI[perso].elements)
                  .setThumbnail(GI[perso].logo)
                  .addField('yolo',GI[perso].breeding['1']['coins'])
                  .setTimestamp();

                message.channel.sendMessage(exampleEmbed);
              } catch { message.channel.sendMessage('Error'); }
            } else { message.channel.sendMessage('Manque une info !'); }
          } else { message.channel.sendMessage('Manque une info !'); }
        }
      }
    }
  }
});
