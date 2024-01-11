module.exports = {
    name: 'faq',
    description: "Frequently Asked Question .",
    execute(client, message, cmd, args, Discord){

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#FFFF00')
        .setTitle('FAQ')
        .setDescription('This embed shows some frequently asked questions')
        .setThumbnail('https://cdn.discordapp.com/attachments/809544268498206761/810491556963418142/As_You_Like_icon.jpg')
        .addFields(
            {name: 'Command \"+faq 1\"', value: 'Who is AYL+?'},
            {name: 'Command \"+faq 2\"', value: 'Who created AYL+?'},
            {name: 'Command \"+faq 3\"', value: 'Can I invite AYL+ to my server?'}
        )
        .setFooter('Make sure to inform us about any issues you find.');;

        const newEmbed1 = new Discord.MessageEmbed()
        .setColor('#00FFFF')
        .setThumbnail('https://cdn.discordapp.com/attachments/809544268498206761/810491556963418142/As_You_Like_icon.jpg')
        .addFields(
            {name: 'Who am I?', value: 'I am a bot, created by AsYouLike. I was created for testing purpose. Each time you use me, you are expected to send reports to the administrators about any bugs or issues you find.'},
        )
        .setFooter('Make sure to inform us about any issues you find.');;

        const newEmbed2 = new Discord.MessageEmbed()
        .setColor('#00FFFF')
        .setThumbnail('https://cdn.discordapp.com/attachments/809544268498206761/810491556963418142/As_You_Like_icon.jpg')
        .addFields(
            {name: 'Who is my creator?', value: 'Technically speaking, that would be AsYouLike#9662. No big deal.🤙😁'},
        )
        .setFooter('Make sure to inform us about any issues you find.');;

        const newEmbed3 = new Discord.MessageEmbed()
        .setColor('#00FFFF')
        .setThumbnail('https://cdn.discordapp.com/attachments/809544268498206761/810491556963418142/As_You_Like_icon.jpg')
        .addFields(
            {name: 'Can you invite me?', value: 'Not yet. I am on BETA and my owner is still optimising my commands. When i am available to be invited, you will find an \"invite to server\" command in my list of commands!'},
        )
        .setFooter('Make sure to inform us about any issues you find.');;

        if(args[0] == '1'){
            message.channel.send(newEmbed1)
        }else if(args[0] == '2'){
            message.channel.send(newEmbed2)
        }else if(args[0] == '3'){
            message.channel.send(newEmbed3)
        }else {
            message.channel.send(newEmbed)
        }
    }
    
}