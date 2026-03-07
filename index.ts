import { Client, GatewayIntentBits, Message } from 'discord.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ping = require('ping') as any;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    if (msg.content === '!로봇핑') {
        await msg.reply(`퐁! 현재 지연시간: ${client.ws.ping}ms`)
    }
    if (msg.content === '!서버상태') {
        const args = msg.content.split('');
        const ip_num = 'localhost:25565'
        const ip = ip_num
        // await msg.reply('')
        await ping.sys.probe(ip, (isAlive: Boolean) => {
            const result = isAlive
            ? `마크 서버는 열려있습니다! 더 자세한 정보는  를 확인해주세요!`
            : `마크 서버는 닫혀있습니다. Connect Failed : Time out!`
            msg.reply(result)
        });

    }
})

client.login('');
