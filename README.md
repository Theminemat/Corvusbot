# 🤖 Corvusbot

<div align="center">

![Discord Bot](https://img.shields.io/badge/Discord-Bot-7289da?style=for-the-badge&logo=discord&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**A welcoming Discord bot for the Corvus Coasters community** 🎢

</div>

---

## 📝 About

Corvusbot is a specialized Discord bot designed exclusively for the **Corvus Coasters** server. This bot enhances the community experience by providing automated welcome messages for new members, creating a warm and inviting atmosphere for roller coaster enthusiasts and theme park lovers.

## ✨ Features

🎯 **Automated Welcome System**
- Greets new members with personalized welcome messages
- Generates custom welcome cards with member avatars
- Displays current member count for community growth tracking
- Uses stylish embedded messages with custom background imagery

🎨 **Custom Welcome Cards**
- Dynamic welcome cards with member avatars
- Beautiful background featuring Corvus Coasters branding
- Real-time member count integration
- Generated via external API for consistent styling

## 🌐 Community Links

Join the Corvus Coasters community and connect with fellow theme park enthusiasts!

[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/@corvuscoasters?si=5qbsNMQlLxikaCQb)
[![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/invite/3gn79gHbdx)

- 🎥 **YouTube Channel**: [Corvus Coasters](https://youtube.com/@corvuscoasters?si=5qbsNMQlLxikaCQb)
- 💬 **Discord Server**: [Join our community](https://discord.com/invite/3gn79gHbdx)

## 🛠️ Setup & Installation

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
   npm install discord.js dotenv
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   TOKEN=your_discord_bot_token_here
   ```

4. **Discord Bot Setup**
   - Create a new application at [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a bot user and copy the token
   - Enable the following bot permissions:
     - `Send Messages`
     - `Embed Links`
     - `Read Message History`
   - Enable the following privileged gateway intents:
     - `Server Members Intent`

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

## ⚙️ Configuration

### Channel Configuration
The bot is configured to send welcome messages to a specific channel. Update the `WELCOME_CHANNEL_ID` in `index.js`:

```javascript
const WELCOME_CHANNEL_ID = 'your_channel_id_here';
```

### Welcome Card Customization
The welcome card background and styling can be modified by updating the `imageUrl` parameters in the code.

## 🔧 Technical Details

- **Runtime**: Node.js
- **Main Library**: Discord.js v14
- **External APIs**: Popcat.xyz (for welcome card generation)
- **Environment**: Supports dotenv for configuration management

### Bot Intents
- `GatewayIntentBits.Guilds`
- `GatewayIntentBits.GuildMembers`

## 📋 Requirements

- Discord server administrator permissions
- Node.js runtime environment
- Valid Discord bot token
- Network access for external API calls

## 🤝 Contributing

This bot is specifically designed for the Corvus Coasters community. For bug reports or feature suggestions:

1. Open an issue on this repository
2. Contact the development team via Discord
3. Submit pull requests for approved changes

## 📄 License

This project is developed for the Corvus Coasters community. Please respect the community guidelines and usage terms.

## 📞 Support

Need help or have questions?

- 💬 Join our [Discord server](https://discord.com/invite/3gn79gHbdx)
- 🐛 Report issues on GitHub
- 📺 Check out our [YouTube channel](https://youtube.com/@corvuscoasters?si=5qbsNMQlLxikaCQb) for updates

---

<div align="center">

**Made with ❤️ for the Corvus Coasters community**

*Bringing roller coaster enthusiasts together, one welcome message at a time* 🎢

</div>