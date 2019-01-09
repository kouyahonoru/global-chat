require("http").createServer((req,res)=>{
    res.end("Start Discord bot!!");
}).listen(3000);

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Botを起動しました ${client.user.tag}!`);
});

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
});

client.login(process.env.TOKEN);