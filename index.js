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

    if (message.content === "g!help") {
        const embed = {
            title: `${client.user.tag}の使い方`,
            fields: [
                {
                    name: "利用規約",
                    value: "正しくご利用をお願いします",
                },
                {
                    name: "接続方法",
                    value: "`esc-global-chat`を作成するだけです！",
                },
                {
                    name: "必要権限",
                    value: "webhook、メッセージの編集権限をください！",
                },
                {
                    name: "バグ・質問",
                    value: "[こちら](https://discord.gg/7dGssZn)にお願いします",
                },
                {
                    name: "作成者",
                    value: "[Esc]™ グループ",
                },
            ],
        };
        message.channel.send({ embed });
    }

    if (message.channel.name === "esc-global-chat") {
        global_chat.run(client, message);
    }
});

client.login(process.env.TOKEN);
