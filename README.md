# Corvusbot

A Discord bot with welcome functionality and additional features.

**Note:** This is a private project and not officially affiliated with any community or organization.

## Features

- Automated welcome messages for new Discord members
- Custom welcome cards with member avatars and count
- Additional bot functionality

## Setup

### Prerequisites
- Node.js
- Discord bot token

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Theminemat/Corvusbot.git
   cd Corvusbot
   ```

2. Install dependencies:
   ```bash
   npm install discord.js dotenv
   ```

3. Create a `.env` file:
   ```env
   TOKEN=your_discord_bot_token_here
   ```

4. Configure the welcome channel ID in `index.js`

5. Run the bot:
   ```bash
   node index.js
   ```

## Requirements

- `Send Messages` permission
- `Embed Links` permission  
- `Server Members Intent` enabled