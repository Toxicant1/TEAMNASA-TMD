const fs = require('fs-extra');
const path = require('path');
const { Sequelize } = require('sequelize');

// Load .env if exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

// Database
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL || databasePath;

module.exports = {
    session: "TIMNASA-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0J0bjFadVpOSzRtdytWUTEybjhxZURWck5Ra2liN3M1SG5BQ1ZCM3hrTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidzFxaDREeGNPbzhVTGhXV1J1aWEzNXNSQWszendVVUlybFNWUmZEVHF6cz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnUDRqUm5JTC8rVmRNK1FSV0lyVVU5QTRPb094Ny9JSDhvT3hUNmZKeWxrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxaTNDeFkzSWs4UEd4bzdGM0d6emdhMFM5ZWRaMkdqQThPZXhqdzR3U2s4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNMaUJHRFVNOXdTS2pNWEdvQW12SFhaQXoxVUtVMFFNTTh5c2pzcU41RlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJaZVhucG0wMkNRZkxzNU9CUk81TTh6Ty9QekFVRmxLTTNIVWFVREhVbUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia1BqVGdjY2lUQng1ZDc2dmhHOXI1WnZIcVp2ZU5WZ0s1eVRCV0RpYUZGZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaGRtSDFqajU3cGh4eTQwblBNL1JVUHVJU0Q3UE4vMlNqKyticjlGbjZ5TT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVXaTdwdzNObUZHaHNGWjdFMnVweGxFeUVTNE1aZ0RGWWsvcWxBdVl2bEhJV1BqTmtGajFTc01sV1pVQk8vdzlIOTEwUmVRcVhBUHBHWG84MTczRER3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjcsImFkdlNlY3JldEtleSI6IjlhS0wzQ0Z6b295NGpRelZjUXlmTksrdTk5bnBSZm9rL21jR2F4YzI0dXc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6Ilg1UUdKM1pYIiwibWUiOnsiaWQiOiIyNTQ3NDE4MTk1ODI6MjlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2VtPCdlpjwnZaN8J2WhvCdlpbwnZW08J2Wh/CdlpfwnZaG8J2WjfCdlo7wnZaSIiwibGlkIjoiODAxNzQ3NTg1NDc1NjY6MjlAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMU3NtVW9RdTlQUnhBWVlBaUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJPTGV1Vy9EclZMUEtGNEd4WjFFN2VRV2xxRjlxZmNZQ2hBeGZRMnNtb1JjPSIsImFjY291bnRTaWduYXR1cmUiOiJlWnhxc2lTdVRtVEcwZzlKandjbnlSWG02d0ZYRlUyUlY0UXlhL0t4UUd6MnVCZm1pRkRKN2gxUVV4blZ0N0NnZnVUMUlzWDdqcE11UDV6eG5nSXJEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoic0taU2JHQW8vUlpXRjV2Q3hFbEtBeU50ZURhR05VM0c3Sk5qVXZVMkpxTFdkUmdDSDlmVDljWW5ZdElFUTRXVGdkUkdkSVVqcHNKbVhWSnRXQXRoRGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NDE4MTk1ODI6MjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVGkzcmx2dzYxU3p5aGVCc1dkUk8za0ZwYWhmYW4zR0FvUU1YME5ySnFFWCJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU0NTU2ODczLCJsYXN0UHJvcEhhc2giOiJQV2s1QiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ2E4In0=",
module.exports = {
    // BOT CONFIGURATION
    PREFIXE: process.env.PREFIX || ".",
    GITHUB: process.env.GITHUB || 'https://files.catbox.moe/xtkghn.jpg',
    OWNER_NAME: process.env.OWNER_NAME || "Ishaq Ibrahim",
    NUMERO_OWNER: process.env.NUMERO_OWNER || "254741819582",

    BOT: process.env.BOT_NAME || "『Ｔｅａｍ ＮＡＳＡ』🚀",
    CAPTION: process.env.CAPTION || "『Ｔｅａｍ ＮＡＳＡ』🚀 x Ishaq",
    URL: process.env.URL || "https://files.catbox.moe/xtkghn.jpg",
    WEBSITE: process.env.GURL || "https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31",
    GURL: process.env.GURL || "https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31",

    // FEATURES TOGGLES
    MODE: process.env.PUBLIC_MODE || "yes",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi",
    PM_PERMIT: process.env.PM_PERMIT || "yes",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_SAVE_CONTACTS: process.env.AUTO_SAVE_CONTACTS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || "no",
    AUTO_REACT: process.env.AUTO_REACTION || "no",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || "no",
    AUTO_REPLY: process.env.AUTO_REPLY || "no",

    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || "🛰️ Diagnostics Completed by 『Ｔｅａｍ ＮＡＳＡ』",
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "yes",
    AUDIO_REPLY: process.env.AUDIO_REPLY || "yes",
    AUTO_BIO: process.env.AUTO_BIO || "yes",
    CHAT_BOT: process.env.CHAT_BOT || "no",
    ANTI_CALL: process.env.ANTI_CALL || "yes",
    ANTI_CALL_TEXT: process.env.ANTI_CALL_MESSAGE || "Unauthorized call attempt. 🚫 Connection denied.",
    GCF: process.env.GROUP_HANDLE || "no",
    DP: process.env.STARTING_BOT_MESSAGE || "yes",
    WARN_COUNT: process.env.WARN_COUNT || "5",
    LUCKY_ADM: process.env.ANTI_DELETE_MESSAGE || "yes",

    // Customized Presence Indicator
    ETAT: process.env.PRESENCE || "1", // 👇 Refer below for implementation

    // DATABASE
    DATABASE_URL,
    DATABASE:
        DATABASE_URL === databasePath
            ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9"
            : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
};

// ROTATING PRESENCE STATUS FOR TYPING / RECORDING SIMULATION
global.TEAM_NASA_PRESENCE_LINES = [
    "⚙️ Initializing Neural Threads...",
    "🔬 Engaging Sequence Encoder...",
    "💾 Query Logging via NASA Core",
    "📡 Transmitting Signals...",
    "🔍 Scanning Chat Frequencies...",
    "🧠 Brainwave Simulation in Progress...",
    "⚡ Compiling Smart Response...",
    "🛰️ Syncing Lunar Node AI...",
    "🧪 Cybernetic Agent Protocol Active..."
];

// Add this in your message handler presence function:
global.getDynamicPresence = (() => {
    let i = 0;
    return () => {
        i = (i + 1) % global.TEAM_NASA_PRESENCE_LINES.length;
        return global.TEAM_NASA_PRESENCE_LINES[i];
    };
})();

// Auto reload on changes
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`🔁 Auto-reloaded ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});