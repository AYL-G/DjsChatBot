module.exports = {
    name: 'ban',
    description: "Bans a user.",
    permissions: ["BAN_MEMBERS"],
    execute(client, message, cmd, args, Discord){

        const member = message.mentions.users.first();

        const mod = message.mentions.members.first();

        //console.log(mod._roles)

        if(mod.permissions.has('BAN_MEMBERS')) return message.channel.send("You can\'t ban an admin")
        
        if(member){
            const memberTarger = message.guild.members.cache.get(member.id);
            memberTarger.ban();
            message.channel.send("User has been banned");
            console.log(`${message.author.tag} banned ${memberTarget.user.tag}`)
        }else{
            message.channel.send('You couldn\'t ban that member')
        }
    }
}