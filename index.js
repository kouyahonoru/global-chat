require("http")
  .createServer()
  .listen(3000);

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Botを起動しました ${client.user.tag}!`);
});

client.on("message", message => {
  if (message.author.bot) return;

  if (!message.channel.name === "esc-global-chat") return;

  const global_msg = message.content;

  client.channels.forEach(channel => {
    if (channel.name === "esc-global-chat") {
      message.channel.send(global_msg);
    }
  });
});

client.login(process.env.TOKEN);
