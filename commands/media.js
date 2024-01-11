module.exports = {
    name: 'media',
    description: "I will send an embed message .",
    execute(client, message, cmd, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#304281')
        .setTitle('Social Media')
        .setURL('https://www.instagram.com/asyoulike_ps')
        //.setDescription('This is an embed for my social media')
        .addFields(
            {name: 'Instagram', value: 'https://www.instagram.com/asyoulike_ps'},
            {name: 'Youtube', value: 'https://youtube.com/channel/UC5AvCw4xdAAeIr74Ko4rtsA'},
            {name: 'Twitch', value: 'https://www.twitch.tv/asyoulike_gaming'}
        )
        .setImage('https://cdn.discordapp.com/attachments/809544268498206761/810491556963418142/As_You_Like_icon.jpg')
        .setFooter('Make sure to check out my instagram!');;

        message.channel.send(newEmbed);
        setTimeout(() => message.delete(), 500);
    }
    
}