module.exports = {
    name: 'clear',
    description: "Clears a certain amount of messages.",
    permissions: ["MANAGE_MESSAGES"],
    async execute(client, message, cmd, args, Discord){ 
        if (!args[0]) return message.reply("Please enter the amount of messages to clear!");

            if(isNaN(args[0])) return message.reply("Please type a real number!");
    
            if(args[0] > 99) return message.reply("You can't remove more than 99 messages!");
    
            if(args[0] < 1) return message.reply("You have to delete at least one message!");

            if(args[0].includes('.')) return message.reply("You cannot delete " + args[0] + " messages!")

            const lim = parseInt(args[0], 10)+1

            //create a variable to store the messages that can be deleted
            var _messages = []
            //create a variable to check if all messages were deleted or not
            var _deleteOk = 1

            try{

                await message.channel.messages.fetch({ limit: lim }).then(messages =>{
                    // for each m (message) in the messages array/collection
                    messages.forEach((m) => {
                      // 14 days to millisecs -> 14d * 24h * 60m * 60s * 1000ms = 14*24*60*60*1000 = 1 209 600 000 ms
                      if((Date.now() - m.createdTimestamp) < 1209600000){
                        //push the message that is send within 14 days or less into the new _messages array
                         _messages.push(m)
                      }
                      else{
                         //if message that you try to delete is older than or 14 days old, substract 1 from args[0] so the count of the messages that will be deleted is still correct
                         args[0] -= 1
                         //switch the variable to 0 so u can send a message that some messages were older than 2 weeks
                         _deleteOk = 0
                      }
                    })
                    //bulkdelete everything in the _messages array
                    message.channel.bulkDelete(_messages) 
                    console.log(`${message.author.tag} deleted ` + args[0] + ` messages`)
                    //if the variable is 0 (!0 = true), send a message that not everything was deleted
                    if(!_deleteOk){
                        message.channel.send(`🚮 I have deleted ${args[0]}  message! \n \n⛔ Because of Discord limitations I can't delete messages past 2 weeks. \n \n👍 If you want to clear a whole channel just right-click the channel then select "Clone Channel`)
                    }
                })

            }catch(err){
                message.channel.send("There was an error deleting the messages")
                console.log(err)
            }
    }
}
