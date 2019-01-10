require("http")
  .createServer()
  .listen(3000);

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Botを起動しました ${client.user.tag}!`);
});

client.on("message", message => {
  if (message.author.bot || !message.guild) return;

  if (!message.channel.name === "esc-global-chat") return;

  if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
    message.reply("WebHooksの管理権限を付与してください");
    return;
  }

  if (message.mentions.users.first()) {
    message.reply("グローバルチャットでのメンションは禁止です");
    return;
  }

  const global_msg = message.content;
  const hook_option = {
    username: message.author.tag,
    avatarURL: message.author.avatarURL,
    disableEveryone: true
  };

  message
    .delete(2000)
    .catch(() =>
      message.reply(
        "メッセージの管理権限を付与してください\nそれでも解決しない場合は`mouse#2240`まで"
      )
    );

  client.channels.forEach(async channel => {
    if (channel.name === "esc-global-chat") {
      try {
        if (!channel.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
        const hooks = await channel.fetchWebhooks();

        if (hooks.size === 0) {
          if (channel.id === message.channel.id) {
            channel.createWebhook("global-chat").then(hook => {
              message.channel.send(
                "グローバルチャットが利用できるようになりました！"
              );
              hook.send(global_msg, hook_option);
            });
          }
        } else {
          hooks.first().send(global_msg, hook_option);
        }
      } catch (error) {
        message.reply(
          "エラーが発生しました\nもう一度送信しても解決しない場合は`mouse#2240`まで" +
            error
        );
      }
    }
  });
});

client.login(process.env.TOKEN);
