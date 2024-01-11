const membercounter = require("../../counters/member-counter");
var rnd = 0;

module.exports=(Discord, client) => {
    console.log('AYL+ is online!');

    membercounter(client);

    presence()  
    setInterval(()  => presence(), 10000)

    function presence(){
        const activities = [
            ["PLAYING", "+help", " "],
            ["WATCHING", "over \"Team AYL\"", " "],
            ["LISTENING", "your commands", " "],
            ["STREAMING", "AYL on twitch", "https://www.twitch.tv/asyoulike_gaming"],
        ]
        /*----------------------------------console.log("The bot\'s activity has been changed")*/
        //console.log(activities)
        //const rnd = Math.floor(Math.random() * activities.length) for random

        //if (rnd > (activities.length-1)) rnd = 0; is the same as the if below
        if (rnd == activities.length) rnd = 0; 

        if(activities[rnd][0] == 'STREAMING'){
          client.user.setPresence({
              status: 'online',
              activity:{
                name: activities[rnd][1],
                type: activities[rnd][0],
                url: activities[rnd][2]
              }
          })
        }
        else{
          client.user.setPresence({
              status: 'online',
              activity:{
                 name: activities[rnd][1],
                 type: activities[rnd][0],
              }
          })
       }
    rnd++;
    }
  
  /*client.on('ready', async () => {
    const guildID = '673206849721466923' 
    const commands = await client.api
    .applications(client.user.id)
    .guilds(guildID)
    .commands.get()
    console.log(commands)
  })*/


  const MyStickyChannelID = process.env.stickychannel;
  let cacheMsgs = [];
  
  client.on('ready', async () => {
  // Get channel, if found then send the message to that channel and cache it

  const stickyChannel = client.channels.cache.get(MyStickyChannelID);
  if (stickyChannel) {
    const m = await stickyChannel.send('This is some sticky content. (string/embed)');
    cacheMsgs.push(m.id);
  }});
  
  client.on('message', async message => {
  if (message.author.bot) return;

  // Remove a message and remove form cache
  async function remove(id) {
    const msg = message.channel.messages.cache.get(id);
    cacheMsgs.shift();
    if (msg) await msg.delete().catch(_e => {});
  }

  // check channel is the sticky channel
  if (message.channel.id === MyStickyChannelID) {
    // if length is more or 2 but not 0 then queue delete all and return without a message
    if (cacheMsgs.length >= 2 && cacheMsgs.length !== 0) return cacheMsgs.forEach(async id => remove(id));

    // if cache is more then 0 then queue delete all AND send a message
    if (cacheMsgs.length > 0) cacheMsgs.forEach(async id => await remove(id));

    // Send message and add to cache
    const m = await message.channel.send('This is some sticky content. (string/embed)');
    cacheMsgs.push(m.id);
  }});

}