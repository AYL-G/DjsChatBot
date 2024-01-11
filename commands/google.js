module.exports = {
    name: 'google' ,
    aliases: ['g'],
    description: 'Use it to do a google search.',
    async execute(client, message, cmd, args, Discord) {

        const color = [
            ['#66FF66'],
            ['#FFFF4D'],
            ['#00FFFF'],
            ['#FF0000'],
        ]

        const rnd = Math.floor(Math.random() * (color.length -1 ))

        //if (rnd > (color.length-1)) rnd = 0;

        const bad = [
            "sex","porn","threesome","twosome","foursome","hookup","dick","penis","ass","tits","boobs","vulva","sperm","masturbation",
            "copulation","vagina","fuck","fucking","asshole","anus","anal","testicles","bitches","sexual","sexuelle","couilles","bite",
            "sperme","ovaires","pute","levrette","missionnaire"
        ]

        const warnchannel = client.channels.cache.get(process.env.warnchannel)

        const embed1 = new Discord.MessageEmbed()
        .setColor('#F32F05')
        .setTitle('__Warning__')
        .setDescription('I warned ' + message.author.tag + " for using \"" + args.join(" ") + "\" in his G search")

        for (let i = 0; i < args.length; i++) {
            if(bad.includes(args[i].toLowerCase())) {
                message.delete()
                message.channel.send("Naughty you " + message.author.tag + ". You have been warned for using a bad word.")
                warnchannel.send(embed1)
                return;
            }
        }


        const query = args.join(" ")
        const msglink = args.join('%20')
        if (!query) return message.channel.send("Please provide some stuff to search for")

        const embed = new Discord.MessageEmbed()
        .setTitle('Google search')
        .setImage('https://cdn.discordapp.com/attachments/809544268498206761/895665129616719882/search-off-the-record-logo.png')
        .setColor(color[rnd][0])
        .setDescription(`[${query}](https://www.google.com/search?q=${msglink})`)

        message.channel.send(embed)


    }
}