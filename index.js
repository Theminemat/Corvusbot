require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  Events,
  Partials,
  PermissionsBitField,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel] // for DMs
});

// IDs & constants
const BOT_TOKEN = process.env.TOKEN;
const WELCOME_CHANNEL_ID = '1026942719236513824';
const VERIFIED_ROLE_ID = '1158486797261738075';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MAIN_GUILD_ID = '1026942718708043866';
const GREETING_KEYWORDS = ['morning', 'moin', 'hello'];
const WHITELISTED_USERS = ['795259393356333076']; // for moderation actions

// Bot is ready
client.once('ready', () => {
  console.log(`✅ Bot started as ${client.user.tag}`);
});

// Welcome embed + DM
client.on('guildMemberAdd', async (member) => {
  const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
  if (!channel) return;

  const username = member.user.username;
  const memberCount = member.guild.memberCount;
  const avatarUrl = message.author.displayAvatarURL({ format: 'png', dynamic: false });
  const imageUrl = `https://api.popcat.xyz/welcomecard?background=https://i.imgur.com/gKnorS3.jpeg&text1=${encodeURIComponent(username)}&text2=Welcome+on+Corvus+Discord&text3=Member+No.+${memberCount}&avatar=${encodeURIComponent(avatarUrl)}`;

  // Log PipcatAPI image link creation
  console.log(`🖼️ PipcatAPI welcome card generated for ${username} (Member #${memberCount}) at ${new Date().toISOString()}`);
  console.log(`🔗 Image URL: ${imageUrl}`);

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
  } catch {
    console.log(`❌ Couldn't send welcome DM to ${member.user.tag}.`);
  }
});

// DM after verified role
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
    } catch {
      console.log(`❌ Couldn't send role DM to ${newMember.user.tag}.`);
    }
  }
});

// Detect greetings using Gemini
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const contentLower = message.content.toLowerCase();
  if (!GREETING_KEYWORDS.some(keyword => contentLower.includes(keyword))) return;

  const prompt = `You are connected to a Discord bot. Decide if the message is meant as a greeting or if the word 'morning' is just used in a sentence. Reply just with true if it's a greeting or false if not.\n\nMessage: ${message.content}`;

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
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

// !welcometest command for whitelisted users
client.on('messageCreate', async (message) => {
  if (message.content !== '!welcometest') return;
  if (message.author.bot) return;

  // Check if user is whitelisted
  if (!WHITELISTED_USERS.includes(message.author.id)) {
    return message.reply('❌ You are not authorized to use this command.');
  }

  const username = message.author.username;
  const memberCount = message.guild.memberCount;
  const avatarUrl = message.author.displayAvatarURL({ format: 'png', dynamic: false });
  const imageUrl = `https://api.popcat.xyz/welcomecard?background=https://i.imgur.com/gKnorS3.jpeg&text1=${encodeURIComponent(username)}&text2=Welcome+Test+Banner&text3=Member+No.+${memberCount}&avatar=${encodeURIComponent(avatarUrl)}`;

  // Log PipcatAPI image link creation for test
  console.log(`🧪 PipcatAPI test welcome card generated for ${username} at ${new Date().toISOString()}`);
  console.log(`🔗 Test Image URL: ${imageUrl}`);

  const embed = new EmbedBuilder()
    .setDescription(`🧪 **Welcome Test Banner**\nGenerated for ${username}`)
    .setColor(0x000000)
    .setImage(imageUrl);

  message.reply({ embeds: [embed] });
});

// !delete and !ban logic
client.on('messageCreate', async (message) => {
  if (!['!delete', '!ban'].includes(message.content)) return;
  if (!message.reference) return;

  const refMsg = await message.channel.messages.fetch(message.reference.messageId).catch(() => null);
  if (!refMsg) return;

  const member = await message.guild.members.fetch(message.author.id);
  const isWhitelisted = WHITELISTED_USERS.includes(message.author.id);
  const hasPermission =
    message.content === '!delete'
      ? member.permissions.has(PermissionsBitField.Flags.ModerateMembers)
      : member.permissions.has(PermissionsBitField.Flags.BanMembers);

  if (!isWhitelisted && !hasPermission) return;

  await message.delete().catch(() => {});
  if (message.content === '!delete') {
    await refMsg.delete().catch(() => {});
  } else if (message.content === '!ban') {
    const target = await message.guild.members.fetch(refMsg.author.id).catch(() => null);
    if (target) await target.ban({ reason: `Banned by ${message.author.tag} via !ban` }).catch(() => {});
  }
});

// !send via DM only (channel picker)
client.on('messageCreate', async (message) => {
  if (message.channel.type !== 1 || message.content !== '!send') return;

  const isWhitelisted = WHITELISTED_USERS.includes(message.author.id);
  const guild = client.guilds.cache.get(MAIN_GUILD_ID);
  const member = await guild.members.fetch(message.author.id).catch(() => null);
  const hasPermission = member?.permissions.has(PermissionsBitField.Flags.ModerateMembers);

  if (!isWhitelisted && !hasPermission) {
    return message.reply('❌ You are not allowed to use this command.');
  }

  const channels = guild.channels.cache
    .filter(c => c.type === 0 && c.viewable)
    .map(c => ({ label: c.name, value: c.id }))
    .slice(0, 25); // Max 25 options

  const menu = new StringSelectMenuBuilder()
    .setCustomId('channel_select')
    .setPlaceholder('Select a channel')
    .addOptions(channels);

  const row = new ActionRowBuilder().addComponents(menu);
  await message.reply({ content: 'Choose a channel to send to:', components: [row] });
});

// Channel selected → show modal
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isStringSelectMenu() || interaction.customId !== 'channel_select') return;

  const modal = new ModalBuilder()
    .setCustomId(`send_modal:${interaction.values[0]}`)
    .setTitle('Send Message')
    .addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('content')
          .setLabel('Message')
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true)
      )
    );

  await interaction.showModal(modal);
});

// Modal submitted → send message
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isModalSubmit() || !interaction.customId.startsWith('send_modal:')) return;

  const channelId = interaction.customId.split(':')[1];
  const content = interaction.fields.getTextInputValue('content');
  const channel = client.channels.cache.get(channelId);

  if (!channel || !channel.isTextBased()) return;

  const sentMsg = await channel.send({ content });

  const buttonRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`delete_msg:${sentMsg.id}:${channelId}`)
      .setLabel('🗑️ Delete')
      .setStyle(ButtonStyle.Danger)
  );

  await interaction.reply({
    content: `✅ Sent your message to <#${channelId}>.`,
    components: [buttonRow],
    ephemeral: true
  });
});

// Delete button pressed → remove public message
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton() || !interaction.customId.startsWith('delete_msg:')) return;

  const [, msgId, channelId] = interaction.customId.split(':');
  const channel = client.channels.cache.get(channelId);
  const msg = await channel?.messages.fetch(msgId).catch(() => null);

  if (msg) await msg.delete().catch(() => {});
  await interaction.reply({ content: '🗑️ Message deleted.', ephemeral: true });
});

// Start bot
client.login(BOT_TOKEN);
