const Discord = require('discord.js'); // defining Discord


module.exports = {
    name: "spotifysearch",
    aliases: ["sp"],
    description: "Makes a spotify search",

    async execute(client, message, cmd, args, Discord){
        let msglink = args.join('%20') 
        // we're joining the args using %20, so if the args are Hello World it would be Hello%20World
        let msg = args.join(' ') 
        // we're joining the args using a space. If you don't have the space Hello World would be HelloWorld

if(!args[0]) return message.channel.send('Please give me a song name to search') 
// if there is not args[0] stop reading the code and send that message.

        let embed = new Discord.MessageEmbed() // making the embed
        .setTitle("Spotify search")
        .setColor('GREEN')
        .setDescription(`[${msg}](https://open.spotify.com/search/${msglink})`) 
        .setImage('https://cdn.discordapp.com/attachments/809544268498206761/895667378740940880/1_c0FaLqy4tcO1uuYLP8AWBw.jpeg')
        // this is how you make a hyperlink ONLY IN DESCRIPTIONS [message](link), the ${} is used to call a variable in a string. You can only use it when using backticks.

        message.channel.send(embed) // sending the embed
    }
}

//I'm using %20 because if you look at the url in the webbrowser it will take your arguments and join them using %20