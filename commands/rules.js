module.exports = {
    name: 'rules',
    description: "I will show you the rules .",
    execute(client, message, cmd, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('The Rules')
        .addFields(
            {name: 'Rule 1:', value: 'Do not share personal information with other users.'},
            {name: 'Rule 2:', value: 'Account selling/buying is against our rules.'},
            {name: 'Rule 3:', value: 'Keep the chat a peaceful place. Any sort of racism against other users is prohibited.'},
            {name: 'Rule 4:', value: 'Do not spam in any channel, especially in the tickets you open. Be patient and wait for a moderator to respond.'},
            {name: 'Rule 5:', value: 'Do not discuss cheating or hacking.'},
            {name: 'Rule 6:', value: 'No advertising except in the promotions\' channel.'},
            {name: 'Rule 7:', value: 'Do not attempt to impersonate any moderator.'},
            {name: 'Rule 8:', value: 'Respect everyone in the voice chats. Do not share any content containing violence, self harm, racism, hate speech, nudity or pornography...'},
            {name: 'Rule 9:', value: 'Names must be composed of normal letters or numbers. Do not use names containing special characters or names that are longer than one line of text.'}
        )
        .setFooter('Breaking any of those rules will result in moderation actions taken against you.');;

        message.channel.send(newEmbed);
    }
    
}