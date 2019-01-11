require("http")
    .createServer()
    .listen(3000);

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Botを起動しました ${client.user.tag}!`);
});

const global_chat = require("./global.js");

client.on("message", message => {
    if (message.author.bot || !message.guild) return;

    if (message.channel.name === "esc-global-chat") {
        global_chat.run(client, message);
    }
});

client.login(process.env.TOKEN);
