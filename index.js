// Require the necessary discord.js classes
const { Client, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const axios = require('axios');

// Create a new client instance
const client = new Client({
  intents: [ Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});


// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

  if (commandName === 'profile') {

    axios.post('http://127.0.0.1:8000/discord/get_profile', {
      user_id: interaction.user.id
    })
    .then(function (response) {
      //console.log(response);
    })
    .catch(function (error) {
      //console.log(response);
    });

    const profileEmbed = new MessageEmbed();
    profileEmbed.setColor('#ffc107');
    profileEmbed.setTitle("Chungus's Profile");
    profileEmbed.setURL("https://chungus.site/profile/chungus");

    profileEmbed.setAuthor({
      name: 'Chungus',
      iconURL: 'https://cdn.discordapp.com/avatars/324590145061781506/ab11c9c64266a3b9505332b374b86ed0.webp',
      url: 'https://chungus.site/profile/chungus'
    });

    profileEmbed.addFields(
      { name: 'Title', value: 'Developer', inline: true },
      { name: 'Achievements', value: '3', inline: true },
      { name: 'Member for', value: '2 years, 3 months', inline: true },
    );

    profileEmbed.setImage('https://cdn.discordapp.com/avatars/324590145061781506/ab11c9c64266a3b9505332b374b86ed0.webp');

    await interaction.channel.send({ embeds: [profileEmbed] });

  }

});


// Listen for messages
client.on('messageCreate', async message => {

  if ( message.author.bot ) return;

  // Execute code
  //console.log(message)
  message.channel.send("I've been watching you for a while now...");

});


//Listen for reactions
client.on('messageReactionAdd', (reaction, user) => {
  console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
  console.log(client.users.cache.get(user.id))
  //console.log(reaction);
  //console.log(user);
});

// Login to Discord with your client's token
client.login(token);
