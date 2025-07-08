require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, Events, Partials } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel] // Wichtig für DMs!
});

// jeys and ids
const BOT_TOKEN = process.env.TOKEN;
const WELCOME_CHANNEL_ID = '1026942719236513824';
const GREETING_KEYWORDS = ['morning', 'moin', 'hello'];
const VERIFIED_ROLE_ID = '1158486797261738075';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Bot start logging
client.once('ready', () => {
  console.log(`✅ Bot started as ${client.user.tag}`);
});

// welcoming banner and dm
client.on('guildMemberAdd', async (member) => {
  const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
  if (!channel) return;

  const username = member.user.username;
  const memberCount = member.guild.memberCount;
  const avatarUrl = member.user.displayAvatarURL({ format: 'png' });
  const imageUrl = `https://api.popcat.xyz/welcomecard?background=https://i.imgur.com/gKnorS3.jpeg&text1=${encodeURIComponent(username)}&text2=Welcome+on+Corvus+Discord&text3=Member+No.+${memberCount}&avatar=${encodeURIComponent(avatarUrl)}`;

  const embed = new EmbedBuilder()
    .setDescription(`👋 Welcome ${username}`)
    .setColor(0x000000)
    .setImage(imageUrl);

  channel.send({ embeds: [embed] });
  try {
    await member.send(
      "👋 Welcome on Corvus Discord!\n" +
      "To interact on the server please read and ✅ accept the rules:\n" +
      "https://discord.com/channels/1026942718708043866/1026945495702179901"
    );
  } catch (err) {
    console.log(`❌ Couldn't send welcome DM to ${member.user.tag}.`);
  }
});

// Rollen dms
client.on(Events.GuildMemberUpdate, async (oldMember, newMember) => {
  const hadRole = oldMember.roles.cache.has(VERIFIED_ROLE_ID);
  const hasRole = newMember.roles.cache.has(VERIFIED_ROLE_ID);

  if (!hadRole && hasRole) {
    try {
      await newMember.send(
        "Great! Now you're officially part of the server and can interact 🥳.\n\n" +
        "If you want to, you can introduce yourself here:\n" +
        "https://discord.com/channels/1026942718708043866/1026989337222594591\n\n" +
        "Enjoy your time here 😃!"
      );
    } catch (err) {
      console.log(`❌ Couldn't send role DM to ${newMember.user.tag}.`);
    }
  }
});

// morning wave ai detection
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const contentLower = message.content.toLowerCase();
  if (!GREETING_KEYWORDS.some(keyword => contentLower.includes(keyword))) return;

  const prompt = `You are connected to a Discord bot. Decide if the message is meant as a greeting or if the word 'morning' is just used in a sentence. Reply just with true if it's a greeting or false if not.\n\nMessage: ${message.content}`;

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toLowerCase();

    if (replyText === 'true') {
      await message.react('👋');
    }
  } catch (error) {
    console.error('❌ Gemini API error:', error);
  }
});

// Bot start
client.login(BOT_TOKEN);
