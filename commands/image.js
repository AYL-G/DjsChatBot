var Scraper = require('images-scraper');
const google = new Scraper ({
    puppeteer : {
        headless : true
    }
})

module.exports = {
    name: 'image' ,
    aliases: ['img'],
    cooldown: 10,
    description: 'Use it to search for images.',
    async execute(client, message, cmd, args, Discord) {

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

        try{
        const image_query = args.join(' ');
        if(!image_query) return message.channel.send('Please enter an image name') && console.log(message.author.tag, 'didn\'t specify the second argument for GSearch    ID:', message.author.id);
        else{
            sentMessage = await message.reply('please wait a moment.')
            }
        const image_results = await google.scrape(image_query, 1);
        sentMessage.edit(image_results[0].url);
        console.log('The image was found')
        } catch (err){
            message.reply("There was an error looking for this image");
            console.log(err)

        }
    }

}