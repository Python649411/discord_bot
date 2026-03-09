import { Client, GatewayIntentBits, Message } from 'discord.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ping = require('ping') as any;
async function sever_check(msg: Message) {
    try {
        
        const res = await axios.get('https://api.mcstatus.io/v2/status/java/서버주소');
        const isOnline = res.data.online;

        
        if (isOnline) {
            await msg.reply("# `서버가 켜져있습니다!  에서 자세한 정보를 확인하세요!`");
        } else {
            await msg.reply("# `서버가 꺼져있습니다!`");
        }
    } catch (error) {
        
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
    const kimsemin__ = ''
    if (msg.content === `!닉네임 ${kimsemin__}`) {
        await msg.reply(
            `당신의 마크 정보
             운영자 여부 : true // true & false
             베스트 멤버 여부 : false // 마음대로
             UUID: 000000000 // uuid // 마음대로
             밴 횟수 : 0` // 마음대로
        )
    }
    if (msg.content === '!서버상태') {
        sever_check(msg)
        });
    

    }
})

client.login('');
