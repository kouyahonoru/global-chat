module.exports.run = (client, message) => {
    if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) {
        message.reply("WebHooksの管理権限を付与してください");
        return;
    }
    /*globals global_msg,hook_option*/
    global_msg = message.cleanContent;
    hook_option = {
        username: message.author.tag,
        avatarURL: message.author.avatarURL,
        disableEveryone: true,
    };

    if (message.attachments.some(e => e.attachment)) {
        global_msg = `file:${global_msg}`;
        hook_option.file = message.attachments.first().url;
    }

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
                    "エラーが発生しました\nもう一度送信しても解決しない場合は`mouse#2240`まで"
                );
            }
        }
    });

    message
        .delete(2000)
        .catch(() =>
            message.reply(
                "メッセージの管理権限を付与してください\nそれでも解決しない場合は`mouse#2240`まで"
            )
        );
};
