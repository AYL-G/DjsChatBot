module.exports = {
    name: 'hello',
    description: "I will say hello back.",
    execute(client, message, args){
        message.channel.send('Hi!');
    }
}