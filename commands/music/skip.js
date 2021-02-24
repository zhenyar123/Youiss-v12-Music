const {
  Command
} = require('../../commands')

module.exports = class skipCommand extends Command {
  constructor() {
    super({
      name: 'skip',
      aliases: ['saltar'],
      category: 'music',
      priority: 7,
      permLvl: 0
    })
  }
  async execute(msg, args, discord, client) {
    const queue = client.queue;
    
    const serverQueue = queue.get(msg.guild.id);

    if (!msg.member.voice.channel) return msg.channel.send('Bir ses kanalına bağlı olmanız Gerekiyor')
    if (!serverQueue) return msg.channel.send('Çalmakta olan şarkı yok.')

    if(msg.member.voice.channel.members.size === 2) {

      msg.channel.send('Çalınan şarkı atlandı.')
      await serverQueue.connection.dispatcher.end();
      return;
    }

    const map = client.skipvote;
    const mapload = map.get(msg.guild.id);
    
    if (mapload) {

      if (mapload.users.includes(msg.author.id)) return msg.reply('Zaten oy verdiniz.');
      await mapload.users.push(msg.author.id)
      
      if (mapload.users.length > 1) {
        let skipNumber = 1 + parseInt(msg.member.voice.channel.members.size / 2);
        msg.channel.send(`${msg.author.username} geçerli şarkıyı atlamak için oy kullandı. **${mapload.users.length}/${skipNumber}**`)
      }

      const number = parseInt(msg.member.voice.channel.members.size / 2);
   
      if (mapload.users.length < number) return;

      msg.channel.send('Mevcut şarkı oylama ile çıkarıldı.');
      
      await serverQueue.connection.dispatcher.end();

    } else {
      const listUser = {
        users: []
      }
      await map.set(msg.guild.id, listUser)
      await listUser.users.push(msg.author.id);

      let skipNumber = parseInt(msg.member.voice.channel.members.size / 2);

      return msg.channel.send(`**${msg.author.username}** mevcut şarkıyı atlamak için yeni bir oylama başlatmak. Gerekli(n) **${skipNumber}** voto(s) para saltar la canción.`)

    }
    

  }
}