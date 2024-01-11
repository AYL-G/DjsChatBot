const ytsr = require("ytsr");

module.exports = {
    name: 'youtube' ,
    aliases: ['yt'],
    description: 'Use it to do a youtube search.',
    async execute(client, message, cmd, args, Discord) {

        const query = args.join(" ")
        if (!query) return message.channel.send("Please provide a video name")

        sentMessage = await message.reply('please wait a moment.')

        const res = await ytsr(query).catch(e => {
            return message.channel.send("No results were found.");
        });

        const video = res.items.filter(i => i.type === "video")[0];
        if(!video) return message.channel.send("No results were found.");

        const embed = new Discord.MessageEmbed()
        .setTitle(video.title)
        .setImage(video.bestThumbnail.url)
        .setColor("#F32F05")
        .setDescription(`**[${video.url}](${video.url})**`)
        .setAuthor(video.author.name)
        .addField("Views", video.views.toLocaleString(), true)
        .addField("Duration", video.duration, true)

        //console.log(video, video.thumbnail, video.url)

        sentMessage.edit("", embed)
        //sentMessage.delete()
        //return message.channel.send(embed);
    }
}