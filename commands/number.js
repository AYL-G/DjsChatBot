module.exports = {
    name: 'number',
    description: "This gives you a random number between 1 and a certain number",
    aliases: ["num", "nb"],
    cooldown: 10,
    execute(client, message, cmd, args, Discord){

        const color = [
            ['#FF0000'],
            ['#0000FF'],
            ['#00FFFF'],
            ['#FFFF00'],
            ['#9900CC'],
            ['#1A1AFF'],
        ]

        const rnd = Math.floor(Math.random() * color.length) //for random return;

        if (rnd > (color.length-1)) rnd = 0; //is the same as the if below

        if(!args[0]){
            const embed1 = new Discord.MessageEmbed()
            .setColor(color[rnd][0])
            .addFields(
                {name: '*Error:*', value: "Please specify your maximum number"},
            )
            message.channel.send(embed1)
            return;
        }
        if(args[0]>1000000000000000000000){
            const embed2 = new Discord.MessageEmbed()
            .setColor(color[rnd][0])
            .addFields(
                {name: '*Error:*', value: "This value is too big"},
            )
            message.channel.send(embed2)
            return;
        }
        if(args[0]<1){
            const embed3 = new Discord.MessageEmbed()
            .setColor(color[rnd][0])
            .addFields(
                {name: '*Error:*', value: "This value is too small"},
            )
            message.channel.send(embed3)
            return;
        }
        if(Number.isNaN(+args[0])){
            const embed4 = new Discord.MessageEmbed()
            .setColor(color[rnd][0])
            .addFields(
                {name: '*Error:*', value: "This is not a number"},
            )
            message.channel.send(embed4)
            return;
        }
        let number = args[0]

        const num = Math.ceil(Math.random()*number);
        const embed = new Discord.MessageEmbed()
        .setColor(color[rnd][0])
        .addFields(
            {name: 'Your Number is:', value: num},
        )
        message.channel.send(embed)

    }
}