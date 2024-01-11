//Syntax: <prefix><whatever you name it>
const { execute } = require("./say");

module.exports = {
    name: "bug",
    aliases: ['report'],
    description: 'let users report bugs',
    cooldown: 60,
    async execute(client, message, cmd, args, Discord){
        //the channel you want the bug-reports to be send to
        const channel = client.channels.cache.get(process.env.bugchannel)

         //look if there is a bug specified
        const query = args.join(' ');
        if(!query) return message.reply('Please specify the bug')
        
         //create an embed for the bug report
        const reportEmbed = new Discord.MessageEmbed()
        .setTitle('New Bug!')
        .addField('Author', message.author.toString(), true)
        .addField('Guild', message.guild.name, true)
        .addField('Report', query)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        channel.send(reportEmbed);
        //send the embed to the channel
        message.channel.send("*Bug report has been sent!*")
        console.log("We recieved a new report")
    }
}