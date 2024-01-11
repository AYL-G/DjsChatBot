module.exports = {
    name: 'shutdown' ,
    permissions: ['ADMINISTRATOR'],
    description: 'Use it to shut down the bot.',
    execute(client, message, cmd, args, Discord) {
        const embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .addFields(
            {name: '*WARNING*', value: `@${client.user.tag} has been shut down. To turn me back on, restart your terminal.`},
        )
        .setFooter(`Shut down by ${message.author.tag}`);;

        let password = args.join(' ')

        if (password == process.env.password){
            message.channel.send(embed)
            message.delete()
            setTimeout(() => client.destroy(), 500);
            console.log(`The client has been destroyed by ${message.author.tag}.`)
        }else if(!password) {
            message.reply(" please enter a password")
            console.log(`${message.author.tag} tried to destroy the client.`)
        }else{
            message.channel.send("Incorrect password, please try again")
            console.log(`${message.author.tag} tried to destroy the client.`)
        }
        
    }

}

