module.exports = {
    name: 'invite',
    description: "I will send AsYouLike's server invitation.",
    execute(client, message, cmd, args, Discord){

        message.channel.send('https://discord.gg/NZGty4F');
        message.author.send('https://discord.gg/NZGty4F')
        
    }
}