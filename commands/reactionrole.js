module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
    permissions: ["ADMINISTRATOR"],
    async execute(client, message, cmd, args, Discord) {
        const channel = args[0];
        const yellowTeamRole = message.guild.roles.cache.find(role => role.name === "Fortnite Player");
        const blueTeamRole = message.guild.roles.cache.find(role => role.name === "Fortnite fan");
 
        const yellowTeamEmoji = '🤙';
        const blueTeamEmoji = '👏';
        if (!args[0]) {
            const embed1 = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .addFields(
                {name: '*Error:*', value: "Please specify the channel id"},
            )
            message.channel.send(embed1)
            return;
        }
 
        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Choose a team to play on!')
            .setDescription('Choosing a team will allow you to interact with your teammates!\n\n'
                + `${yellowTeamEmoji} for fortnite player team\n`
                + `${blueTeamEmoji} for fortnite fan team`);
 
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(yellowTeamEmoji);
        messageEmbed.react(blueTeamEmoji);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === yellowTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(yellowTeamRole);
                }
                if (reaction.emoji.name === blueTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(blueTeamRole);
                }
            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === yellowTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(yellowTeamRole);
                }
                if (reaction.emoji.name === blueTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(blueTeamRole);
                }
            } else {
                return;
            }
        });
        setTimeout(() => message.delete(), 1000)
    }
 
}