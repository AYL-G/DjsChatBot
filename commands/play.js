const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['p', 'skip', 'stop', 'pause', 'resume','queue','loop'], //We are using aliases to run the skip and stop command follow this tutorial if lost: https://www.youtube.com/watch?v=QBUJ3cdofqc
    cooldown: 5,
    description: 'Advanced music bot',
    async execute(client, message, cmd, args, Discord){
        //Checking for the voicechannel and permissions (you can add more permissions if you like).
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a voice channel to execute this command!');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissions');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissions');

        //This is our server queue. We are getting this server queue from the global queue.
        const server_queue = queue.get(message.guild.id);

        //If the user has used the play command
        if (cmd === 'play' || cmd === 'p'){
            if (!args.length) return message.channel.send('You need to send the second argument!');
            let song = {};

            //If the first argument is a link. Set the song object to have two keys. Title and URl.
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
            } else {
                //If there was no link, we use keywords to search for a video. Set the song object to have two keys. Title and URl.
                const video_finder = async (query) =>{
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video){
                    song = { title: video.title, url: video.url }
                } else {
                     message.channel.send('Error finding video.');
                }
            }

            //If the server queue does not exist (which doesn't for the first video queued) then create a constructor to be added to our global queue.
            if (!server_queue){

                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: [],
                    loopone: false,
                    loopall: false,
                }
                
                //Add our key and value pair into the global queue. We then use this to get our server queue.
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);
    
                //Establish a connection and play the song with the vide_player function.
                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('There was an error connecting!');
                    throw err;
                }
            } else{
                server_queue.songs.push(song);
                return message.channel.send(`👍 **${song.title}** added to queue!`);
            }
        }

        else if(cmd === 'skip') skip_song(message, server_queue);
        
        /*else if(cmd === 'skip') {
            if(args[0]<1){
                skipnumber(message, server_queue, args);
            }else{
                for(var i=1; i<args[0];i++){
                    skipnumber(message, server_queue, args);
                    video_player(message.guild, queue_constructor.songs[1]);
                }
                skipnumber(message, server_queue, args);
            }
        }*/
        else if(cmd === 'stop') stop_song(message, server_queue);
        else if(cmd === 'pause') pause(message, server_queue);
        else if(cmd === 'resume') resume(message, server_queue);
        else if(cmd === 'loop') loop(message, args, server_queue)
        else if(cmd === 'queue') queue2(message, server_queue)
    }
    
}

// I replaced every server_queue in the video_player function code by song_queue, because that's the name of your "server_queue" within this function, you just fetched it via const song_queue = queue.get(guild.id) (line 92)
// I also removed the song_queue.songs.shift() above line 111, since it comes after an else, which means it will always shift at least one time, so in the case of no loop, it will shift twice, we dont want that..

const video_player = async (guild, song, message) => {
    const song_queue = queue.get(guild.id);
    //If no song is left in the server queue. Leave the voice channel and delete the key and value pair from the global queue.
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
        if(song_queue.loopone){
            //do nothing
        }
        else if (song_queue.loopall){
           song_queue.songs.push(song_queue.songs[0])
           song_queue.songs.shift()
        }else{
            song_queue.songs.shift()
        }
        // by putting nothing for the if(song_queue.loopone) you avoid repitition of the video_player(guild, song_queue.songs[0]), which is an even "better" way to put it
        video_player(guild, song_queue.songs[0]);
    });
    await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`)
}


const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
    server_queue.connection.dispatcher.end();
    message.channel.send('🔊 The song has been skipped')
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
    message.channel.send('🔇 The music has been stopped')
}


const pause = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
    if(server_queue.connection.dispatcher.paused){
        return message.channel.send('This song is already paused');
    }
    server_queue.connection.dispatcher.pause();
    message.channel.send('🔈 The song has been paused')
}

const resume = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
    if(server_queue.connection.dispatcher.resumed){
        return message.channel.send('The song is already playing');
    }
    server_queue.connection.dispatcher.resume();
    message.channel.send('🔊 The song has been resumed')
}

const loop = (message, args, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
    switch(args[0].toLowerCase()) {
        case `all`:
            server_queue.loopall = !server_queue.loopall;
            server_queue.loopone = false;

            if(server_queue.loopall === true) {
                message.channel.send('Loop all has been turned on!');
            } 
            else {
                message.channel.send('Loop all has been turned off!');
            }
            break;
        case `one`:
            server_queue.loopone = !server_queue.loopone;
            server_queue.loopall = false;

            if(server_queue.loopone === true) {
                message.channel.send('Loop one has been turned on!');
            } else {
                message.channel.send('Loop one has been turned off!');
            }
            break;
        case `off`:
            server_queue.loopall = false;
            server_queue.loopone = false;

            message.channel.send('The loop has been turned off')
            break;
        default: message.channel.send('Please specify what loop you want. +loop one/all/off')
    }
}

const queue2 = (message, server_queue) => {
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
    let nowPlaying = server_queue.songs[0];
    let qmsg = `**Now playing:** ${nowPlaying.title}\n-------------------\n**Upcoming next:** \n`
    let hola = `**Now playing:** ${nowPlaying.title}\n-------------------\n`

    for (var i=1; i<server_queue.songs.length; i++){
        qmsg += `${i}. ${server_queue.songs[i].title}\n`
    }

    if(!server_queue.songs || server_queue.songs.length<=1) {
        message.channel.send(`>>> ${hola}Requested by: ${message.author.username}`)
    }else{
        message.channel.send(`>>> ${qmsg}-------------------\nRequested by: ${message.author.username}`);
    }
}


//Testing a skip "number" of songs
const skipnumber = (message, server_queue, args) => {
    if(!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
    server_queue.connection.dispatcher.end();
    message.channel.send('🔊 The song has been skipped')
}