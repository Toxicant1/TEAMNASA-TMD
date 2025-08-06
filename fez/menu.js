const util = require('util'); const fs = require('fs-extra'); const { timoth } = require(__dirname + "/../timnasa/timoth"); const { format } = require(__dirname + "/../timnasa/mesfonctions"); const os = require("os"); const moment = require("moment-timezone"); const s = require(__dirname + "/../set"); const more = String.fromCharCode(8206) const readmore = more.repeat(4001)

timoth({ nomCom: "menu", categorie: "Menu" }, async (dest, zk, commandeOptions) => { let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions; let { cm } = require(__dirname + "/../timnasa//timoth"); var coms = {}; var mode = "public"; if ((s.MODE).toLocaleLowerCase() != "yes") { mode = "private"; } cm.map(async (com, index) => { if (!coms[com.categorie]) coms[com.categorie] = []; coms[com.categorie].push(com.nomCom); }); moment.tz.setDefault('Etc/GMT'); const temps = moment().format('HH:mm:ss'); const date = moment().format('DD/MM/YYYY');

let infoMsg =  `

╭▱▰「 ${s.BOT} 」▱▰❂ ┃⊛╭▰▱▰▱▰▱▰▱➻ ┃⊛│◆ 𝙾𝚠𝚗𝚎𝚛 : ${s.OWNER_NAME} ┃⊛│◆ 𝙿𝚛𝚎𝚏𝚒𝚡 : [ ${s.PREFIXE} ] ┃⊛│◆ 𝙼𝚘𝚍𝚎 : ${mode} ┃⊛│◆ 𝚁𝚊𝚖  : 𝟴/𝟭𝟯𝟮 𝗚𝗕 ┃⊛│◆ 𝙳𝚊𝚝𝚎  : ${date} ┃⊛│◆ 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖 : ${os.platform()} ┃⊛│◆ 𝙲𝚛𝚎𝚊𝚝𝚘𝚛 : BeltahTech ┃⊛│◆ 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 : ${cm.length} ┃⊛│◆ 𝚃𝚑𝚎𝚖𝚎 : beltah ┃⊛└▰▱▰▱▰▱▰▱➻ ╰▱▰▱▰▱▰⊷▱▰▱▰▱❂\n${readmore}`;

let menuMsg = `ʙᴇʟᴛᴀʜ ᴄᴏᴍᴍᴀɴᴅ ᴍᴇɴᴜ`;
for (const cat in coms) {
    menuMsg += `

╭▱▱▱✺ ${cat} ✺▰▰▰⊷ ┊│┌▰▱▰⊷•∞•⊷▱▰▱⊛ ┌┤┊ ; for (const cmd of coms[cat]) { menuMsg += 
┊│┊☆  ${cmd}     }  menuMsg +=
┊│└▰▱▰⊷•∞•⊷▱▰▱⊛
╰▰▰▰═⊷✺•∞•✺⊷═▱▱▱⊷} menuMsg +=

> Made By Beltah Txmd\n `;



var lien = mybotpic();
if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { 
         video: { url: lien },
         caption:infoMsg + menuMsg,
         contextInfo: {
            isForwarded: true,
             forwardedNewsletterMessageInfo: {
             newsletterJid: '120363345407274799@newsletter',
              newsletterName: "╭••➤ʙᴇʟᴛᴀʜ_ᴛᴍᴅ1",
              serverMessageId: 143,
            },
        },
     }, { quoted: {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "✆︎ʙᴇʟᴛᴀʜ_ᴛᴍᴅ1 verified",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:BeltahTech;BOT;;;\nFN:Beltah_Tech\nitem1.TEL;waid=254700000000:+254 700 000000\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });
   } catch (e) {
       console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, {
        image: { url: lien }, 
        caption:infoMsg + menuMsg, 
         contextInfo: {
            isForwarded: true,
             forwardedNewsletterMessageInfo: {
             newsletterJid: '120363345407274799@newsletter',
              newsletterName: "╭••➤ʙᴇʟᴛᴀʜ_ᴛᴍᴅ1",
              serverMessageId: 143,
            },
          },
     }, { quoted: ms });
    } catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }

    const audioUrls = [
        "https://files.catbox.moe/y9u7w8.mp3"
    ];

    const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];

    try {
        await zk.sendMessage(dest, {
            audio: { url: randomAudioUrl },
            mimetype: 'audio/mpeg',
            ptt: true,
          contextInfo: {
            isForwarded: true,
             forwardedNewsletterMessageInfo: {
             newsletterJid: '120363345407274799@newsletter',
              newsletterName: "╭••☯️ʙᴇʟᴛᴀʜ_ᴛᴍᴅ1",
              serverMessageId: 143,
              },
            },
        }, { quoted: {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "✆︎ʙᴇʟᴛᴀʜ_ᴛᴍᴅ1 verified",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:BeltahTech;BOT;;;\nFN:Beltah_Tech\nitem1.TEL;waid=254700000000:+254 700 000000\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });
    } catch (e) {
        console.log("🥵🥵 Error sending audio: " + e);
        repondre("🥵🥵 Error sending audio: " + e);
    }
}

});

