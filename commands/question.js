module.exports = {
    name: 'question',
    description: "This gives you a random answer to your question",
    aliases: ["qst"],
    cooldown: 5,
    execute(client, message, cmd, args, Discord){
        if (!args[0]){
            message.channel.send("What is your question?")
        }else{
            const array = ["Yes", "No","I don't know", "Definitely!", "Definitely not!"]
            const result = getRandomItem(array);
            const argument = args.join(" ")
            if (!argument.includes('?')) return message.channel.send("A question always ends with a question mark!")
            const fivew = ["what","who","where","when","whose","how","why"]
            // cut off last character, so the "?" when args is only length 1, for example: who?, where?, etc, ...
            if(args.length == 1 && args[0].includes("?")) {
                args[0] = args[0].slice(0, -1)
            }
            for (let i = 0; i < args.length; i++) {
                if(fivew.includes(args[i].toLowerCase())) {
                    message.channel.send("I have no idea")
                    return;
                }
            }

            message.channel.send(result)
        }
    }
}

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random()*arr.length);

    const item = arr[randomIndex]
    return item;
}