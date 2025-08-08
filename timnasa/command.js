const fs = require('fs');
const path = require('path');

// Reference to your main command registration system
const { cmd } = require('../commands'); // Adjust path if needed

cmd(
  {
    pattern: '🫰',
    desc: 'TEAMNASA full menu – includes video intro & audio',
    category: 'system',
    filename: __filename
  },
  async ({ client, message }) => {
    // Step 1: Send Intro Video
    await client.sendMessage(message.jid, {
      video: { url: './media/Readme.mp4' },
      gifPlayback: true,
      caption: '🎬 _Welcome to TEAMNASA-TMD_\n_Enjoy this short intro_...'
    });

    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds

    // Step 2: Send Background Audio
    await client.sendMessage(message.jid, {
      audio: { url: './media/X-GALACTICO(256k).mp3' },
      mimetype: 'audio/mp4',
      ptt: true
    });

    // Step 3: Generate Dynamic Menu from All Registered Commands
    const { commands } = require('../commands'); // Adjust path if needed
    const menuText = generateTeamNasaMenu(commands);

    // Step 4: Send Formatted Menu
    await client.sendMessage(message.jid, { text: menuText });
  }
);

// ✅ Menu Generator Function
function generateTeamNasaMenu(commandsArray) {
  const grouped = {};

  // Group commands by category
  for (const cmd of commandsArray) {
    const category = (cmd.category || 'misc').toUpperCase();
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(cmd);
  }

  // Format Header
  let menu = `╔══════════════ ⬣\n`;
  menu += `║  🛸 *TEAMNASA-TMD MAIN MENU* 🔭\n`;
  menu += `╚══════════════ ⬣\n\n`;

  // Format Each Category
  for (const [category, cmds] of Object.entries(grouped)) {
    menu += `🔰 *${category}*\n`;
    menu += `══════════════════════════════\n`;
    for (const cmd of cmds) {
      const cmdText = cmd.pattern ? `.${cmd.pattern}` : '';
      const desc = cmd.desc || '';
      menu += `👉 *${cmdText.padEnd(14)}* ➤ ${desc}\n`;
    }
    menu += `──────────────────────────────\n\n`;
  }

  // Footer
  menu += `🔵 _Bot Powered by TEAMNASA-TMD_\n`;
  menu += `📅 ${new Date().toLocaleDateString()}`;

  return menu;
}