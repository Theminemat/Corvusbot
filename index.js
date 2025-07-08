require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const WELCOME_CHANNEL_ID = '1026942719236513824';
const GREETING_KEYWORDS = ['morning', 'moin', 'hello'];
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

client.once('ready', () => {
  console.log(`✅ Bot started as ${client.user.tag}`);
});

// Welcome Message
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
});

// Greeting detection
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const contentLower = message.content.toLowerCase();
  if (!GREETING_KEYWORDS.some(keyword => contentLower.includes(keyword))) return;

  const prompt = `You are connected to a discord bot decide if the message is meant as a greeting or the word morning is just used within the sentence. Reply just with true if it's a greeting or false if it’s not a greeting.\n\nMessage: ${message.content}`;

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
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

client.login(process.env.TOKEN);
