const {
 Command
} = require('../../commands')

module.exports = class resumeCommand extends Command {
 constructor() {
  super({
   name: 'resume',
   aliases: [],
   category: 'music',
   priority: 7,
   permLvl: 0
  })
 }
 async execute(msg, args, discord, client) {
  const queue = client.queue;
  const serverQueue = queue.get(msg.guild.id);

  if (!msg.member.voice.channel) return msg.channel.send('Bir ses kanalına bağlı olmanız Gerekiyor.')
  if (!serverQueue) return msg.channel.send('Çalmakta olan şarkı yok.')

 
  if (serverQueue && !serverQueue.playing) {
   serverQueue.playing = true;
   console.log('Reanudando');
   serverQueue.connection.dispatcher.resume();

   return msg.channel.send('Devam Ediliyor..');
  }

  msg.channel.send('Durdurulan şarkı yok.')

 }
}