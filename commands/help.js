module.exports = {
    name: 'help',
    description: "I will show a list of commands.",
    cooldown: 5,
    // slash cmd builder format
    /*data: new require('@discordjs/builders').SlashCommandBuilder()
        .setName('help')
        .setDescription('Lists the available commands')
        .addStringOption(option =>
            option.setName('help type')
                .setDescription('the help you need')
                .setRequired(false)
        ),*/

    execute(client, message, cmd, args, Discord){

        const color = [
            ['#66FF66'],
            ['#FFFF4D'],
            ['#00FFFF'],
            ['#FF0000'],
        ]

        const rnd = Math.floor(Math.random() * color.length) //for random return;

        if (rnd > (color.length-1)) rnd = 0; //is the same as the if below

        let img = message.author.displayAvatarURL({ dynamic: true })

        const Newembed = new Discord.MessageEmbed()
        .setColor(color[rnd][0])
        .setAuthor(message.author.tag, img)
        //.setTitle('__Help__')
        .addFields(
            {name: '**+help commands**', value: 'Shows the list of normal commands'},
            {name: '**+help args**', value: 'Shows the list of args commands'},
            {name: '**+help music**', value: 'Shows the list of music commands'},
        )
        .setThumbnail("https://www.lollydaskal.com/wp-content/uploads/2019/04/Screen-Shot-2019-04-16-at-5.16.54-PM.png")
        .setFooter('Contact AsYouLike#9662 in case there\'s any issue.'/*\n \n*/ );;


        const Newembed1 = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setTitle('__List of Commands__')
        .addFields(
            {name: '**+hello**', value: 'I will say hello back'},
            {name: '**+rules**', value: 'Displays a summary of the Server\'s Rules'},
            {name: '**+media**', value: 'Displays an embed for my social media'},
            {name: '**+instagram**', value: 'Displays the owner\'s instagram account - This will also give you a specific role'},
            {name: '**+vibe**', value: 'Just for vibin!'},
            {name: '**+guess**', value: 'Launches a minigame - Guess the number'},
            {name: '**+ticket or +tkt**', value: 'Creates a help ticket.'},
            {name: '**+faq**', value: 'Displays some Frequently Asked Questions'},
            {name: '**+ping**', value: 'Pings the bot\'s latency'},
            {name: '**+invite**', value: 'Sends the invite link to this server!'},
        )
        .setFooter('Don\'t forget to give us a review about our bot!');;//\n  \nTry +args and +music to check other commands.');;

        const Newembed2 = new Discord.MessageEmbed()
        .setColor('#800080')
        .setTitle('__List of Music Commands__')
        .addFields(
            {name: '**+play {music}**', value: 'Plays a certain music'},
            {name: '**+pause**', value: 'Pauses the current playing music'},
            {name: '**+resume**', value: 'Resumes the current playing music'},
            {name: '**+skip**', value: 'Skips the current music in the queue'},
            {name: '**+stop**', value: 'Stops playing the current music'},
            {name: '**+queue**', value: 'Shows the songs in the queue'},
            {name: '**+loop one**', value: 'Loops the current playing song'},
            {name: '**+loop all**', value: 'Loops the current queue'},
            {name: '**+loop off**', value: 'Turns off all sorts of loops'},
            {name: '**+lyrics {Artist Name}**', value: 'Gives you a song\'s lyrics. The bot will ask for the song\'s name to look it up.'},
        )
        .setFooter('Let\'s vibe and dance together 🤪');;

        const Newembed3 = new Discord.MessageEmbed()
        .setColor('#BE3B0E')
        .setTitle('__List of args Commands__')
        .addFields(
            {name: '**+number {Max number value}**', value: 'Sends a random number between 1 and a maximum value you set'},
            {name: '**+question {some text} or +qst {some text}**', value: 'Sends a random answer to your question'},
            {name: '**+image {something} or +img {something}**', value: 'Search for an image on the web! If i do not respond within 1 minute then i couldn\'t find any image.'},
            {name: '**+weather {city name}**', value: 'Displays the weather in a city of your choice'},
            {name: '**+remind {time}{reminder}**', value: 'Sets a reminder. The bot will send it to you by dm (time in: d h m s)'},
            {name: '**+spotifysearch {Song name} or +sp {Song name}**', value: 'Searches for a song on Spotify'},
            {name: '**+google {something}  or  +g {something}**', value: 'Searches for stuff on google'},
            {name: '**+youtube {Video name}  or  +yt {Video name}**', value: 'Searches for a video on youtube'},
            {name: '**+ytsearch  or  +yts**', value: 'Searches for a video on youtube [Gives a list of videos]'},
            {name: '**+avatar or +icon or +pfp {user}**', value: 'Displays a user\'s avatar'},
            {name: '**+embed {title}{color}{description}**', value: 'Creates a custom embed'},
            {name: '**+bug {bug} or +report {bug}**', value: 'Lets you report bugs directly to the moderators'},
            {name: '**+suggest {suggestion}**', value: 'Sends a suggestion in the suggestions\' channel'},
        )
        .setFooter('Those commands won\'t work if you don\'t specify the second argument.\n \n Don\'t forget to replace {...} with the correct args.');;

        if (args[0] == 'commands') {
            message.author.send(Newembed1)
            message.channel.send("Check your Dms 😎")
        } else if (args[0] == 'music') {
            message.author.send(Newembed2)
            message.channel.send("Check your Dms 🥳")
        } else if (args[0] == 'args') {
            message.author.send(Newembed3)
            message.channel.send("Check your Dms 🤩")
        }else {
            message.channel.send(Newembed)
            setTimeout(() => message.delete(), 500);
        }

    }
}