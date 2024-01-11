module.exports = {
    name: 'instagram',
    description: "I will send AsYouLike's instagram.",
    execute(client, message, cmd, args, Discord){

        //if (message.channel instanceof Discord.DMChannel) { message.channel.send(newerEmbed)} else {

        let role = process.env.notifrole

        if (message.member.roles.cache.has(role)){
            message.channel.send('https://www.instagram.com/asyoulike_ps');

        }else {
            message.channel.send('You don\'t have the @📢 role to access this, but I gave it to you :)');
            message.member.roles.add(role).catch(console.error);
        }
        
    }
}