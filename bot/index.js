const { Client, Events, GatewayIntentBits } = require('discord.js');
const token = process.env.DISCORD_TOKEN;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	]
});

client.isExperimenting = false;

client.once(Events.ClientReady, c => {
	console.log(`Discbot Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async m => {
	if (m.author.username.includes('Midjourney Bot')) {
		client.messageCallback(m);
	}
});

client.login(token);

module.exports = client;