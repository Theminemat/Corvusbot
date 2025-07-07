require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});
const WELCOME_CHANNEL_ID = '1026942719236513824';

client.once('ready', () => {
  console.log(`✅ Bot started as ${client.user.tag}`);
});


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


client.login(process.env.TOKEN);
