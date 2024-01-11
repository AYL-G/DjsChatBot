module.exports = {
    name: 'rr',
    description: "Sets up a reaction role message!",
    permissions: ["ADMINISTRATOR"],
    async execute(client, message, cmd, args, Discord) {
        const channel = args[2];
        const yellowTeamRole = message.guild.roles.cache.find(role => role.name === args[0]);
        const blueTeamRole = message.guild.roles.cache.find(role => role.name === args[1]);
 
        const yellowTeamEmoji = "😉";
        const blueTeamEmoji = "😎";

        if (!args[0]) {
            const embed1 = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .addFields(
                {name: '*Error:*', value: "Please specify the first role"},
            )
            message.channel.send(embed1)
            return;
        }
        if (!args[1]) {
            const embed2 = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .addFields(
                {name: '*Error:*', value: "Please specify the second role"},
            )
            message.channel.send(embed2)
            return;
        }
        if (!args[2]) {
            const embed3 = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .addFields(
                {name: '*Error:*', value: "Please specify the channel id"},
            )
            message.channel.send(embed3)
            return;
        }

        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Choose your role!')
            .setDescription('Choosing a role will allow to use some features\n\n'
                + `${yellowTeamEmoji} for ${args[0]} role\n`
                + `${blueTeamEmoji} for ${args[1]} role`);
 
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