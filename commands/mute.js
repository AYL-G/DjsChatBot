const ms = require('ms');
module.exports = {
    name: 'mute',
    description: "Mutes a user.",
    permissions: ["MUTE_MEMBERS"],
    execute(client, message, cmd, args, Discord){

        const target = message.mentions.users.first();

        const mod = message.mentions.members.first();

        if(mod.permissions.has('MUTE_MEMBERS')) return message.channel.send("You can\'t mute an admin")

        if(target){
            let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'MUTED MEMBER');

            let memberTarget= message.guild.members.cache.get(target.id);

            if (!args[1]){
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted`);
                console.log(`${message.author.tag} muted ${memberTarget.user.tag}`)
                return
            }
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);

            setTimeout(function(){
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
            }, ms(args[1]));
        }else{
            message.channel.send('User not found')
        }
        
    }
}