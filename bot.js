const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let result;
let match;
client.once(Events.ClientReady, async readyClient => {
  console.log(`Connected as ${readyClient.user.tag}!`);
  await registerCommands();
});

async function registerCommands() {
  const commands = [
  new SlashCommandBuilder()
      .setName('convert')
      .setDescription('Converts units, currencies, or timezones')
      .addStringOption(option =>
        option.setName('input')
          .setDescription('What are you converting? (number and unit)')
          .setRequired(true)
      )
      .addStringOption(option =>
        option.setName('to')
          .setDescription('What are you converting it to?')
          .setRequired(true)
      )
  ].map(cmd => cmd.toJSON());

  try {
    await client.application.commands.set(commands);
    console.log('Command registered');
  } catch (error) {
    console.error('Error registering command:', error);
  }
}

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'convert') {
    const input = interaction.options.getString('input');
    const to = interaction.options.getString('to');
    match = input.replace(/\s+/g, '');
    match = match.match(/^([\d.]+)([a-zA-Z]+)$/);
    if (!match) {
      return await interaction.reply("Input must be in this format: `2mi` or `34 cm`.");
    }

    const value = parseFloat(match[1]);
    const from = match[2];

    if (from === "m" && to === "ft") result = value * 3.281;
    else if (from === "ft" && to === "m") result = value / 3.281;

    else if (from === "km" && to === "m") result = value * 1000;
    else if (from === "m" && to === "km") result = value / 1000;

    else if (from === "mL" && to === "L") result = value / 1000;
    else if (from === "L" && to === "mL") result = value * 1000;

    else if (from === "in" && to === "ft") result = value / 12;
    else if (from === "ft" && to === "in") result = value * 12;

    else if (from === "in" && to === "cm") result = value * 2.54;
    else if (from === "cm" && to === "in") result = value / 2.54;

    else if (from === "mm" && to === "cm") result = value / 10;
    else if (from === "cm" && to === "mm") result = value * 10;

    else if (from === "mm" && to === "m") result = value / 1000;
    else if (from === "m" && to === "mm") result = value * 1000;

    else if (from === "mm" && to === "km") result = value / 1000000;
    else if (from === "km" && to === "mm") result = value * 1000000;

    else if (from === "mm" && to === "m") result = value / 1000;
    else if (from === "m" && to === "mm") result = value * 1000;

    else if (from === "km" && to === "cm") result = value * 100000;
    else if (from === "cm" && to === "km") result = value / 100000;

    else if (from === "gal" && to === "L") result = value * 3.78541;
    else if (from === "L" && to === "gal") result = value / 3.78541;

    else if (from === "mi" && to === "km") result = value * 1.60934;
    else if (from === "km" && to === "mi") result = value / 3.78541;

    await interaction.reply(`${value} ${from} = ${result} ${to}`);
  }
});

client.login(token);
