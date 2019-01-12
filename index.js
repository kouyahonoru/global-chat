require("http").createServer().listen(3000);

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Botを起動しました ${client.user.tag}!`);
});

client.on("message", message => {
    if(message.author.bot)return;
    if (!message.channel.name === "esc-global-chat") return;

    if(message.content === "g!help"){
        let embed = {
            "title":`${client.user.tag}の使い方`,
            "fields":[{
            "name":"利用規約",
            "value":"正しくご利用をお願いします",
            "name":"接続方法",
            "value":"`esc-global-chat`を作成するだけです！",
            "name":"必要権限",
            "value":"webhook、メッセージの編集権限をください！",
            "name":"バグ・質問",
            "value":"準備中",
            "name":"作成者",
            "value":"Esc",
            }]
            };
            message.reply({embed});
    }

    const global_msg = message.content;

    client.channels.forEach((channel)=>{
        if(channel.name === "esc-global-chat"){
            message.channel.send(global_msg);
        }
    });
});

client.login(process.env.TOKEN);