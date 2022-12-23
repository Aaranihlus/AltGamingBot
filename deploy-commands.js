const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const {
  clientId,
  guildId,
  token,
  commandChannelID
} = require('./config.json');

const commands = [
  new SlashCommandBuilder().setName('profile').setDescription('Creates a rich embed with your profile data from the altGaming website'),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
