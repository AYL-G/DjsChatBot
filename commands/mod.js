module.exports = {
    name: 'mod',
    description: "I will show a list of mod commands.",
    permissions: ["ADMINISTRATOR"],
    execute(client, message, cmd, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#800080')
        .setTitle('__List of Moderation Commands__')
        .addFields(
            {name: '**+clear {number}**', value: 'Deletes a certain amount of messages'},
            {name: '**+warn {user} {reason}**', value: 'Warns a user'},
            {name: '**+Kick {member}**', value: 'Kicks a member'},
            {name: '**+ban {member}**', value: 'Bans a member'},
            {name: '**+mute {member}**', value: 'Mutes a member'},
            {name: '**+unmute {member}**', value: 'Unmutes a member'},
            {name: '**+reactionrole {channel id}**', value: 'Adds a reaction role message (must be custumised for each RR)'},
            {name: '**+rr {role 1}{role 2}{channel id}**', value: 'Adds a reaction role message (doesn\'t need any customisation)'},
            {name: '**+say {channel}{something}**', value: 'Makes the bot send a message to a specific channel'},
            {name: '**+activity {activity}**', value: 'Changes the bot\'s activity'},
            {name: '**+shutdown**', value: 'Kills the bot'},
        )
        .setFooter('Here are the commands dear administrator :)');;

        message.channel.send("Check your Dms 😎")
        message.author.send(newEmbed);
    }
    
}