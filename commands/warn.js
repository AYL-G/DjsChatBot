module.exports = {
    name: 'warn' ,
    permissions: ['KICK_MEMBERS'],
    description: 'Use it to warn a user.',
    execute(client, message, cmd, args, Discord) {

        const mod = message.mentions.members.first();

        if(mod.permissions.has('KICK_MEMBERS')) return message.channel.send("You can\'t warn an admin")

        let user = message.mentions.users.first()
        let msguser = args[0]
        let reason = args.slice(1).join(' ')
        if (!user) return message.channel.send("Who should I warn?")
        message.reply(` you have warned ${user}`)
        message.delete()

        const admin = `${message.author}`
        const warnchannel = client.channels.cache.get(process.env.warnchannel)

        const embed1 = new Discord.MessageEmbed()
        .setColor('#F32F05')
        .setTitle('__Warning__')
        .setDescription(admin + ' warned ' + msguser + " for " + reason)

        const embed2 = new Discord.MessageEmbed()
        .setColor('F32F05')
        .setTitle('__Warning__')
        .setDescription(admin + ' warned ' + msguser)

        if(!reason) {
            warnchannel.send(embed2)
        }else{
            warnchannel.send(embed1)
        }
        
    }
}