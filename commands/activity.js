module.exports = {
    name: 'activity',
    description: "This will change my activity",
    permission: ["ADMINISTRATOR"],
    execute(client, message, cmd, args, Discord){
        //here you tell the bot to choose the kind of activity
        if (args[0] === "playing"){
            types=0
        } else if (args[0] === "listening") {
            types=2
        } else if (args[0] === "watching") {
            types=3
        } else if (args[0] === "competing") {
            types = 5
        }else if (args[0] === "reset") {
            client.user.setActivity(`+help`, {type:"STREAMING"}) //you can change that to whatever you like
            return message.channel.send('Status changed succesfully')
        }else {
            return message.channel.send('Invalid activity type.')
        }

        args.shift()
        content = args.join(' ')
        client.user.setPresence({
            activity: {
                name:content,
                type: types
            }
        })
        message.channel.send('Status changed succesfully')

    }
}