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

  client.channels.forEach(async channel => {
    if (channel.name === "esc-global-chat") {
      try {
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
        message.reply("WebHookの管理権限を付与してください");
      }
    }
    message
      .delete(100)
      .catch(() => message.reply("メッセージの管理権限を付与してください"));
  });
});

client.login(process.env.TOKEN);
