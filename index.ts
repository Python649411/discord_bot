import { ActivityType, Client, GatewayIntentBits, Message, } from 'discord.js';
import { createRequire } from 'module';
import { exec } from 'child_process';
import axios from 'axios';
const require = createRequire(import.meta.url);
const ping = require('ping') as any;



let wasOnline = true;

async function sever_check(msg: Message) {
    try {
        // 1. 데이터 가져오기
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
        await msg.reply("# `Connect Error : Time out`");
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
    if (msg.content === '!핑') {
        await msg.reply(`퐁! 현재 지현시간: ${client.ws.ping}ms`)
    }
    if (msg.content === "!상점") {
        msg.reply("오늘은 상점 재고 별로 없습니다!") // 이건 맘대로
    }
    if (msg.content === '!서버상태') {
        sever_check(msg)
    }
    if (msg.content === '!장소좌표') {
        msg.reply("해당 장소의 좌표는 x:* y:* z:* 입니다")
    }
    const name = ''
    if (msg.content === `!닉네임 ${name}`) {
        await msg.reply(
            `당신의 마크 정보
             운영자 여부 : true
             UUID: 
             밴 횟수 : 0`
        )
    }


});


client.login('')
