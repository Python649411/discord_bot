import { Client, GatewayIntentBits, Message } from 'discord.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ping = require('ping') as any;
async function sever_check(msg: Message) {
    try {
        // 1. 데이터 가져오기 (비유: 짜장면 배달 대기)
        const res = await axios.get('https://api.mcstatus.io/v2/status/java/서버주소');
        const isOnline = res.data.online;

        // 2. 받은 msg에 바로 답장하기!
        if (isOnline) {
            await msg.reply("# `서버가 켜져있습니다!  에서 자세한 정보를 확인하세요!`");
        } else {
            await msg.reply("# `서버가 꺼져있습니다!`");
        }
    } catch (error) {
        // 혹시나 API 주소가 틀렸거나 인터넷 안될 때를 대비!
        await msg.reply("# `알수 없습니다.`");
    }
}
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
        sever_check(msg)

        });

    }
})

client.login('');
