require("http").createServer().listen(3000);

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Botを起動しました ${client.user.tag}!`);
});

client.on("message", message => {
<<<<<<< HEAD
    if(message.author.bot)return;
=======
>>>>>>> acb507e68db1514e0f5a4ff9f23c31b1d5b3421f
    if (!message.channel.name === "esc-global-chat") return;
    
    const global_msg = message.content;

    client.channels.forEach((channel)=>{
        if(channel.name === "esc-global-chat"){
            message.channel.send(global_msg);
        }
    });
});

client.login(process.env.TOKEN);