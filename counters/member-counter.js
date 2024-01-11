module.exports = async (client) =>{
    const guild = client.guilds.cache.get(process.env.guildID);
    setInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get(process.env.membercount);
        channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
        /*console.log('Updating Member Count');*/
    }, 60000);
}