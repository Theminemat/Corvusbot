# 🤖 Corvusbot

<div align="center">

![Discord Bot](https://img.shields.io/badge/Discord-Bot-7289da?style=for-the-badge&logo=discord&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**A Discord bot for the Corvus Coasters community** 🎢

</div>

---

## 📝 About

Corvusbot is a specialized Discord bot designed for the **Corvus Coasters** server.

## ✨ Features

🎯 **Automated Welcome System**
- Greets new members with personalized welcome messages
- Generates custom welcome cards with member avatars
- Displays current member count
- Sends helpful DMs to new members with rules and introduction channel links

🤖 **Other features**
- AI powered greeting detection ads a wave reaction to greetings.
- Simple to use moderation commands

## 🌐 Community Links

Join the Corvus Coasters Discord to connect with other theme park enthusiasts – and don’t forget to check out the Corvus YouTube channel!


[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/@corvuscoasters?si=5qbsNMQlLxikaCQb)
[![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/invite/3gn79gHbdx)

- 🎥 **YouTube Channel**: [Corvus Coasters](https://youtube.com/@corvuscoasters?si=5qbsNMQlLxikaCQb)
- 💬 **Discord Server**: [Join the Server](https://discord.com/invite/3gn79gHbdx)

## 🛠️ Setup & Installation

If you need any help dm me Discorduser: theminemat

### Prerequisites

- Node.js (v14 or higher)
- Discord Application & Bot Token
- Access to Discord server with appropriate permissions

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Theminemat/Corvusbot.git
   cd Corvusbot
   ```

2. **Install dependencies**
   ```bash
   npm install discord.js dotenv node-fetch
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   TOKEN=your_discord_bot_token_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   You can get an free gemini api key here: https://aistudio.google.com/app/apikey

4. **Discord Bot Setup**
   - Create a new application at [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a bot user and copy the token
   - Enable the following bot permissions:
     - `Send Messages`
     - `Embed Links`
     - `Read Message History`
     - `Add Reactions`
     - `Moderate Members`
     - `Ban Members`
   - Enable the following privileged gateway intents:
     - `Server Members Intent`
     - `Message Content Intent`

5. **Invite Bot to Server**
   Generate an invite link with the required permissions and add the bot to your Discord server.

## 🚀 Usage

1. **Start the bot**
   ```bash
   node index.js
   ```

2. **Verify Operation**
   - Check console for "✅ Bot started as [BotName]" message
   - Test by having a new member join the Discord server
   - Welcome message should appear in the designated welcome channel
   - Test AI greeting detection by sending messages with greetings
   - Verify moderation commands work with appropriate permissions

## ⚙️ Configuration

### Channel Configuration
The bot is configured to send welcome messages to a specific channel. Update the `WELCOME_CHANNEL_ID` and `MAIN_GUILD_ID`  in `index.js`:

```javascript
const WELCOME_CHANNEL_ID = 'your_channel_id_here';
const MAIN_GUILD_ID = 'your_server_id_here';
```

### Role Configuration
Configure the verified role ID for the role-based messaging system:

```javascript
const VERIFIED_ROLE_ID = 'your_verified_role_id_here';
```

### Moderation Configuration
Whitelist specific users for moderation commands by updating the `WHITELISTED_USERS` array:

```javascript
const WHITELISTED_USERS = ['user_id_1', 'user_id_2'];
```

### Welcome Card Customization
The welcome card background and styling can be modified by updating the `imageUrl` parameters in the code.

## 🔧 Technical Details

- **Runtime**: Node.js
- **Main Library**: Discord.js v14
- **External APIs**: 
  - Popcat.xyz (for welcome card generation)
  - Google Gemini API (for AI-powered greeting detection)
- **Environment**: Supports dotenv for configuration management

### Bot Intents
- `GatewayIntentBits.Guilds`
- `GatewayIntentBits.GuildMembers`
- `GatewayIntentBits.GuildMessages`
- `GatewayIntentBits.MessageContent`
- `GatewayIntentBits.DirectMessages`

## 📋 Requirements

- Discord server administrator permissions
- Node.js runtime environment
- Valid Discord bot token

## 🤝 Contributing

This bot is specifically designed for the Corvus Coasters community. For bug reports or suggestions that fit the scope of the Corvus Discord:

1. Open an issue on this repository
2. Submit pull requests for approved changes

## 📄 License

This project is developed for the Corvus Coasters Discord. You are free to modify and use the bot for your own server as described above. Please link to this repo if you do.

---

<div align="center">

Made by theminemat

</div>
