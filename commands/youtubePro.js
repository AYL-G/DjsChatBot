const search = require('youtube-search');
const opts = {
    maxResults: 10,
    key: process.env.YTcode,
    type: 'video'
};

module.exports = {
    name: 'ytsearch' ,
    aliases: ["yts"],
    description: 'Use it to do a youtube search.',
    async execute(client, message, cmd, args, Discord) {

        const embed = new Discord.MessageEmbed()
            .setColor("#73ffdc")
            .setDescription("Please enter a search query. Remember to narrow down your search.")
            .setTitle("YouTube Search API");

        let embedMsg = await message.channel.send(embed);

        let filter = m => m.author.id === message.author.id;

        let query = await message.channel.awaitMessages(filter, { max: 1 });

        let results = await search(query.first().content, opts).catch(err => console.log(err));

        if(results) {
            let youtubeResults = results.results;
            let i  =0;
            let titles = youtubeResults.map(result => {
                i++;
                return i + ") " + result.title;
            });

            //console.log(titles);
            
            message.channel.send({
                embed: {
                    title: 'Select which song you want by typing the number',
                    description: titles.join("\n")
                }
            }).catch(err => console.log(err));


            //console.log(filter)
            
            filter = m => (m.author.id === message.author.id) && m.content >= 1 && m.content <= youtubeResults.length;
            let collected = await message.channel.awaitMessages(filter, { max: 1 });
            let selected = youtubeResults[collected.first().content - 1];
            /*console.log(filter)
            console.log(selected)
            console.log(collected)*/
            const newembed = new Discord.MessageEmbed()
                .setTitle(`${selected.title}`)
                .setURL(`${selected.link}`)
                .setDescription(`${selected.description}`)
                .setThumbnail(`${selected.thumbnails.default.url}`);

            message.channel.send(newembed);
        }
    }
}