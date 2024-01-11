const { canadaCasesByProvincesAndHealthRegion } = require('covid19-api/src/api/api');
const Discord = require('discord.js');

require('dotenv').config();

const  client = new Discord.Client({partials: ["MESSAGE", "CHANNEL","REACTION"]});

const fs = require('fs');
const { fileURLToPath } = require('url');

const membercounter = require('./counters/member-counter');

client.commands = new Discord.Collection();

client.events = new Discord.Collection();

['command_handler' , 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
});

//const WOKCommands = require('wokcommands')
//const path = require('path')

/*
client.on('ready', () => {
    new WOKCommands(client, {
        //commandsDir: path.join(__dirname, 'slashcommands'),
        commandsDir: 'slashcommands',
        testServers: [process.env.guildID],
        showWarns: false,
    })

})
*/

///*------------------START-------------------

const getApp = (guildID) => {
    const app = client.api.applications(client.user.id)
    if(guildID){
        app.guilds(guildID)
    }
    return app
}

client.on('ready', async () => {
    const guildID = process.env.guildID;
    const commands = await getApp(guildID).commands.get() //retrieve commands
    console.log(commands)

    //ping pong
    /*await getApp(guildID).commands.post({ //create commands
        data: {
            name:'ping',
            description: 'test command'
        }
    })*/ 

    //await getApp(guildID).commands('1008671623672504381').delete()

    //TO DELETE THE COMMAND FROM MY SERVER
    //await getApp(guildID).commands('id in console.log').delete()
    //also comment the await code down there

    await getApp(guildID).commands.post({ //id: 1010115533951209533
        data: {
            name: 'info',
            description: 'Displays information about AYL+',
        }
    })    

    await getApp(guildID).commands.post({ //id: 673206849721466923
        data: {
            name: 'rules',
            description: 'Displays the server\'s rules',
        }
    })    

    await getApp(guildID).commands.post({ //id: 1008678970058883112
        data: {
            name: 'embed',
            description: 'Creates a custom embed',
            options: [
                {
                    name: 'name',
                    description: 'Your name',
                    required: true,
                    type: 3 //string
                },
                {
                    name:'age',
                    description: 'Your age',
                    required: false,
                    type: 4 //int
                }
            ]
        }
    })

    client.ws.on('INTERACTION_CREATE', async(interaction) =>{
        const { name, options } = interaction.data

        const command = name.toLowerCase()

        const args = {}

        console.log(options)

        if(options) {
            for(const option of options){
                const{ name,value } = option
                args[name] = value
                console.log(args)
            }
        }

        //for embeds' random colors
        const color = [
            ['#66FF66'],
            ['#FFFF4D'],
            ['#00FFFF'],
            ['#FF0000'],
        ]

        const rnd = Math.floor(Math.random() * color.length) //for random return;

        if (rnd > (color.length-1)) rnd = 0; //is the same as the if below
        
        //Here you define each command seperately

        if(command === 'ping') {
            reply(interaction, 'pong')
        }else if(command === 'embed') {

            const embed=new Discord.MessageEmbed()
            .setTitle("Custom Embed")
            .setColor(color[rnd][0])
            for(const arg in args) {
                const value = args[arg]
                embed.addField(arg, value)
            }
            reply(interaction, embed)

        }else if(command === 'info'){

            const embed=new Discord.MessageEmbed()
            .setTitle("__About AYL+__")
            .setColor(color[rnd][0])
            .setThumbnail('https://cdn.discordapp.com/attachments/809544268498206761/810491556963418142/As_You_Like_icon.jpg')
            .addFields(
                {name: 'Who am I?', value: 'I am a bot, created by AsYouLike. I was created for testing purpose. By reporting any issues you find, you are helping me evolve faster and faster :)'},
                {name: 'When was AYL+ created?', value: 'I was created on January 2020 as part of the AYL official discord server in order to serve the discord community, however I\'m still in the testing phase'},
                {name: 'What version of discord.js do I use?', value:'I was programmed with discord.js v12; however, my creators will be moving me to discord.js v14 soon; stay tuned for more updates!'},
                {name: 'Why do I have a small number of slash commands?', value:'Slash commands are very limited on discord.js v12, I\'ll be getting more updates as soon as I move to discord.js v14!'},
                {name: 'Is there a way for us users to code a bot like AYL+?', value:'You will need advanced javascript knowledge and you will have to read many documentations about discord.js; you can also follow some youtube tutorials\n However if you don\'t undersatnd what you\'re coding, I\'d advise you to use some websites to create bots for you such as botghost and to give up on coding the bot\n[Click here](https://discord.com/developers/docs/intro) for more.'}
            )
            .setFooter('Don\'t forget to give us a review about our bot!');

            reply(interaction, embed)
        }else if(command === 'rules'){
            const embed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('The Rules')
            .addFields(
                {name: 'Rule 1:', value: 'Do not share personal information with other users.'},
                {name: 'Rule 2:', value: 'Account selling/buying is against our rules.'},
                {name: 'Rule 3:', value: 'Keep the chat a peaceful place. Any sort of racism against other users is prohibited.'},
                {name: 'Rule 4:', value: 'Do not spam in any channel, especially in the tickets you open. Be patient and wait for a moderator to respond.'},
                {name: 'Rule 5:', value: 'Do not discuss cheating or hacking.'},
                {name: 'Rule 6:', value: 'No advertising except in the promotions\' channel.'},
                {name: 'Rule 7:', value: 'Do not attempt to impersonate any moderator.'},
                {name: 'Rule 8:', value: 'Respect everyone in the voice chats. Do not share any content containing violence, self harm, racism, hate speech, nudity or pornography...'},
                {name: 'Rule 9:', value: 'Names must be composed of normal letters or numbers. Do not use names containing special characters or names that are longer than one line of text.'}
            )
            .setFooter('Breaking any of those rules will result in moderation actions taken against you.');

            reply(interaction, embed)
        }
    })

    const reply = async (interaction, response) => {

        let data = {
            content: response,
        }
        //check for embeds
        if(typeof response === 'object') {
            data = await createAPIMessage(interaction, response)
        }

        client.api.interactions(interaction.id, interaction.token).callback.post({
            data:{
                type: 4,
                data,
            }  
        })
    }

    const createAPIMessage = async (interaction, content) => {
          const { data, files} = await Discord.APIMessage.create(
              client.channels.resolve(interaction.channel_id),
             content
            )
         .resolveData()
         .resolveFiles()

         return { ...data, files }
    }

})

//------------------END-------------------*/

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'new member');

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.find(channel => channel.id == process.env.welcomechannel).send(`Welcome <@${guildMember.user.id}> to our server!`)
});

client.login(process.env.DISCORD_TOKEN);