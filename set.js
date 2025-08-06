const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { 
    session: "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicURpb0xnN3ZvMnVBdWlNMWRjajNHS0xqUkVSMC9TSFd3UGE2VlZacFUyVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieWcwVitUWHhtNVhNUzJIRnE2M05sTW5OT2NxRUZDZUJaSzU5SXllZmVSdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhRnllQm9vbG9ROUdvclBnNW51VUN5REUzVmgrMXh5NzJEQWpqOVFTejFJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUWWJSL1U0YjdVSENLaTdPSldhMXpiU3NDQ21JUWo0amlnTG1JOVFpbjJ3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9PeVB3WDlyVXQ5WGFPZHZscG5ZNlVQV2s5aHpBMXZFb2JDUHpNcldYM3c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZpSWJ2cUVvY05NMUpZYXNoMkQ1RG05RmRva1oxb3NvdEtCa3ZHdEdEWEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUxDa3JNbW5rUXhsY2hjNFM4MnlrYTlxbzRXclVUUWk1MU42SnBGKzdGST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib3I4SkVoTTlMdXEyc3RCVkdHd3p2bWZxbXdkZ3doUzMxY1hyeFp6cjNYTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNWZ1FmZWM0WWVaOTMwc2M0WktqbVNtZ1B1Yldzd1FHcmZ2RXJrblpCSkFxT3F0NTJ6TjVpb0Ztd21SLzV1M3VwbUZWRm5CamN5OE9zMzBKQ0ZWNERnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE0LCJhZHZTZWNyZXRLZXkiOiJNQlphYkhjMmh5UStjZjIxT3hZMEFNSjBNVFpBWWsyZUdyMXJ6cXhiclcwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJHOUJBRVZYRiIsIm1lIjp7ImlkIjoiMjU0NzQxODE5NTgyOjI2QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdlbTwnZaY8J2WjfCdlobwnZaW8J2VtPCdlofwnZaX8J2WhvCdlo3wnZaO8J2WkiIsImxpZCI6IjgwMTc0NzU4NTQ3NTY2OjI2QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTE9zbVVvUTE5VE14QVlZQXlBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiT0xldVcvRHJWTFBLRjRHeFoxRTdlUVdscUY5cWZjWUNoQXhmUTJzbW9SYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoicU1sTTJMb3BzT2xKc1V0cUdDUHVZb21TdTd0eXdJMk96VjNGaTBGb0JKQVNTTXVVWGhFb0hHQVZNUjQrOFo0akRiRkNCNjN2RDVJRFIyeWFYQ3gyRFE9PSIsImRldmljZVNpZ25hdHVyZSI6IjYweEwrYzVQS2E2QjdlMHVNNXN3QmNjNVE4dTdXV1cyZkdzQUlaaEViN2VNcGxxUzMvcm1RamFpUWtOMkEvQ20vVFFuVWQxclZ4a05kVERCQTdKdEJRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzQxODE5NTgyOjI2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRpM3Jsdnc2MVN6eWhlQnNXZFJPM2tGcGFoZmFuM0dBb1FNWDBOckpxRVgifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1NDQ3NTEwOSwibGFzdFByb3BIYXNoIjoiUFdrNUIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUg3ZSJ9", 

    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://files.catbox.moe/xtkghn.jpg',
    OWNER_NAME : process.env.OWNER_NAME || "Ishaq Ibrahim",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254741819582", 
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
   AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    AUTO_REACT: process.env.AUTO_REACTION || "no",  
    URL: process.env.URL || "https://files.catbox.moe/xtkghn.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "yes",
    AUDIO_REPLY: process.env.AUDIO_REPLY || "no",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by timnasa tmd',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_MESSAGE || 'yes',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VajweHxKQuJP6qnjLM31",
    CAPTION : process.env.CAPTION || "TIMNASA-TMD",
    BOT : process.env.BOT_NAME || 'TIMNASA-TMD⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTI_CALL: process.env.ANTI_CALL || 'yes',              
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});