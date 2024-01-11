const ms = require('ms');
module.exports = {
    name: 'unmute',
    description: "Unmutes a user.",
    permissions: ["MUTE_MEMBERS"],
    execute(client, message, cmd, args, Discord){

      const mod = message.mentions.members.first();

        if(mod.permissions.has('MUTE_MEMBERS')) return message.channel.send("You can\'t unmute an admin")

        const target = message.mentions.users.first();
        if(target){
          let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
          let muteRole = message.guild.roles.cache.find(role => role.name === 'MUTED MEMBER');

          let memberTarget= message.guild.members.cache.get(target.id);

          memberTarget.roles.remove(muteRole.id);
          memberTarget.roles.add(mainRole.id);
          message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
          console.log(`${message.author.tag} unmuted ${memberTarget.user.tag}`)
        }else{
          message.channel.send('User not found')
        }
        
    }
}