module.exports = {
    name: 'kick',
    description: "Kicks a user.",
    permissions: ["KICK_MEMBERS"],
    execute(client, message, cmd, args, Discord){

        const mod = message.mentions.members.first();

        if(mod.permissions.has('KICK_MEMBERS')) return message.channel.send("You can\'t kick an admin")

        const member = message.mentions.users.first();
        if (member){
            const memberTarger = message.guild.members.cache.get(member.id);
            memberTarger.kick();
            message.channel.send("User has been kicked");
            console.log(`${message.author.tag} kicked ${memberTarget.user.tag}`)
        }else{
            message.channel.send('You couldn\'t kick that member')
        }
    }
}