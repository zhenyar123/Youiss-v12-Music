const {
 Command
} = require('../../commands')

module.exports = class volumeCommand extends Command {
 constructor() {
  super({
   name: 'volume',
   aliases: ['vol'],
   category: 'music',
   priority: 7,
   permLvl: 0
  })
 }
 async execute(msg, args, discord, client) {
  const queue = client.queue;
  const serverQueue = queue.get(msg.guild.id);
  let volume = args[0];
  volume = Number(volume);

  if (!msg.member.voice.channel) return msg.channel.send('Sesli bir kanala bağlı olmanız Gerekiyor')
  if (!serverQueue) return msg.channel.send('Çalmakta olan şarkı yok.')

  if(!volume) return msg.channel.send('Hacim için bir değer eklemelisiniz.');
  if(volume > 2) return msg.channel.send('Hacim değeri miktarı 2 den az olmalıdır');

  serverQueue.volume = volume;
  serverQueue.connection.dispatcher.setVolume(volume)

  return msg.channel.send(`Şarkı Sesi : **${volume}**`)

 }
}