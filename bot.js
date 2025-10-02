const { Client, Events, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const { token, erAPI } = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let result;
let match;
let to;
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

const supportedCurrencies = ["aed","afn","all","amd","ang","aoa","ars","aud","awg","azn","bam","bbd","bdt","bgn","bhd","bif","bmd","bnd","bob","brl","bsd","btn","bwp","byn","bzd","cad","cdf","chf","clp","cny","cop","crc","cup","cve","czk","djf","dkk","dop","dzd","egp","ern","etb","eur","fjd","fkp","fok","gbp","gel","ggp","ghs","gip","gmd","gnf","gtq","gyd","hkd","hnl","hrk","htg","huf","idr","ils","imp","inr","iqd","irr","isk","jep","jmd","jod","jpy","kes","kgs","khr","kid","kmf","krw","kwd","kyd","kzt","lak","lbp","lkr","lrd","lsl","lyd","mad","mdl","mga","mkd","mmk","mnt","mop","mru","mur","mvr","mwk","mxn","myr","mzn","nad","ngn","nio","nok","npr","nzd","omr","pab","pen","pgk","php","pkr","pln","pyg","qar","ron","rsd","rub","rwf","sar","sbd","scr","sdg","sek","sgd","shp","sle","sos","srd","ssp","stn","syp","szl","thb","tjs","tmt","tnd","top","try","ttd","tvd","twd","tzs","uah","ugx","usd","uyu","uzs","ves","vnd","vuv","wst","xaf","xcd","xdr","xof","xpf","yer","zar","zmw","zwl"];

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'convert') {
    let input = interaction.options.getString('input');
    to = interaction.options.getString('to');
    input = input.replace(/[$€£¥₹]/g, '');
    input = input.trim();
    input = input.replace(/[^0-9a-zA-Z. ]/g, ''); 
    match = input.match(/^([\d.]+)\s*([a-zA-Z ]+)$/);

    if (!match) {
      return await interaction.reply("Input must use this format: `4mi`, `32CAD`, `2 km` or `12fl oz`.");
    }

    const value = parseFloat(match[1]);
    let from = match[2].trim().toLowerCase();
    to = interaction.options.getString('to').trim().toLowerCase();
    

    if (from === "m" && to === "ft") result = value * 3.28084;
    else if (from === "ft" && to === "m") result = value / 3.28084;

    else if (from === "km" && to === "m") result = value * 1000;
    else if (from === "m" && to === "km") result = value / 1000;

    else if (from === "ml" && to === "l") result = value / 1000;
    else if (from === "l" && to === "ml") result = value * 1000;

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

    else if (from === "km" && to === "cm") result = value * 100000;
    else if (from === "cm" && to === "km") result = value / 100000;

    else if (from === "gal" && to === "l") result = value * 3.78541;
    else if (from === "l" && to === "gal") result = value / 3.78541;

    else if (from === "mi" && to === "km") result = value * 1.60934;
    else if (from === "km" && to === "mi") result = value / 1.60934;

    else if (from === "mi" && to === "cm") result = value * 160934;
    else if (from === "cm" && to === "mi") result = value / 160934;

    else if (from === "mi" && to === "m") result = value * 1609.34;
    else if (from === "m" && to === "mi") result = value / 1609.34;

    else if (from === "ft" && to === "cm") result = value * 30.48;
    else if (from === "cm" && to === "ft") result = value / 30.48;

    else if (from === "ft" && to === "mm") result = value * 304.8;
    else if (from === "mm" && to === "ft") result = value / 304.8;

    else if (from === "yd" && to === "cm") result = value * 91.44;
    else if (from === "cm" && to === "yd") result = value / 91.44;

    else if (from === "yd" && to === "mm") result = value * 914.4;
    else if (from === "mm" && to === "yd") result = value / 914.4;

    else if (from === "yd" && to === "in") result = value * 36;
    else if (from === "in" && to === "yd") result = value / 36;

    else if (from === "ft" && to === "km") result = value * 0.0003048;
    else if (from === "km" && to === "ft") result = value * 3280.84;

    else if (from === "in" && to === "km") result = value * 0.0000254;
    else if (from === "km" && to === "in") result = value * 39370.1;

    else if (from === "in" && to === "mm") result = value * 25.4;
    else if (from === "mm" && to === "in") result = value / 25.4;

    else if (from === "m" && to === "in") result = value * 39.3701;
    else if (from === "in" && to === "m") result = value * 0.0254;

    else if (from === "cup" && to === "l") result = value * 0.236588;
    else if (from === "l" && to === "cup") result = value / 0.236588;

    else if (from === "cup" && to === "mL") result = value * 236.588;
    else if (from === "mL" && to === "cup") result = value / 236.588;

    else if (from === "pt" && to === "l") result = value * 0.473176;
    else if (from === "l" && to === "pt") result = value / 0.473176;

    else if (from === "pt" && to === "mL") result = value * 473.176;
    else if (from === "mL" && to === "pt") result = value / 473.176;

    else if (from === "fl oz" && to === "mL") result = value * 29.5735;
    else if (from === "mL" && to === "fl oz") result = value / 29.5735;

    else if (from === "fl oz" && to === "l") result = value * 0.0295735;
    else if (from === "l" && to === "fl oz") result = value / 0.0295735;

    else if (from === "fl oz" && to === "cup") result = value * 0.125;
    else if (from === "cup" && to === "fl oz") result = value * 8;

    else if (from === "fl oz" && to === "pt") result = value * 0.0625;
    else if (from === "pt" && to === "fl oz") result = value * 16;

    else if (from === "yd" && to === "m") result = value * 0.9144;
    else if (from === "m" && to === "yd") result = value / 0.9144;

    else if (from === "yd" && to === "km") result = value * 0.0009144;
    else if (from === "km" && to === "yd") result = value / 0.0009144;

    else if (from === "yd" && to === "ft") result = value * 3;
    else if (from === "ft" && to === "yd") result = value / 3;

    else if (from === "gal" && to === "mL") result = value * 3785.41;
    else if (from === "mL" && to === "gal") result = value / 3785.41;

    else if (from === "gal" && to === "fl oz") result = value * 128;
    else if (from === "fl oz" && to === "gal") result = value / 128;

    else if (from === "lb" && to === "kg") result = value * 0.4535923;
    else if (from === "kg" && to === "lb") result = value * 2.204624;

    else if (from === "g" && to === "kg") result = value / 1000;
    else if (from === "kg" && to === "g") result = value * 1000;

    else if (from === "g" && to === "lb") result = value * 0.002204623;
    else if (from === "lb" && to === "g") result = value * 453.59237;

    else if (from === "c" && to === "f") result = value * 1.8 + 32;
    else if (from === "f" && to === "c") result = (value - 32) / 1.8;
    
    else if (from === "c" && to === "k") result = value + 273.15;
    else if (from === "k" && to === "c") result = value - 273.15;
    
    else if (from === "f" && to === "k") result = (value - 32) / 1.8 + 273.15;
    else if (from === "k" && to === "f") result = (value - 273.15) * 1.8 + 32;
    

    else if (supportedCurrencies.includes(from) && supportedCurrencies.includes(to)) {
      try {
        const req = await fetch(`https://v6.exchangerate-api.com/v6/${erAPI}/pair/${from}/${to}/${value}`);
        if (!req.ok) throw new Error(`HTTP error ${req.status}`);
        const data = await req.json();
        from = data.base_code;
        to = `${data.target_code} (Data from [Exchange Rate API](https://www.exchangerate-api.com))`;
        result = data.conversion_result;
      } catch (error) {
        console.error(error);
      }
    }

    if (from === "k") from = "°K";
    else if (from === "c") from = "°C";
    else if (from === "f") from = "°F";
    else if (from === "ml") from = "mL";
    else if (from === "l") from = "L";

    if (to === "k") to = "°K";
    else if (to === "c") to = "°C";
    else if (to === "f") to = "°F";
    else if (to === "ml") to = "mL";
    else if (to === "l") to = "L";

    if (result === undefined) {
      return interaction.reply(`Converting from ${from} to ${to} is currently not supported.`);
    }
    

    await interaction.reply(`${value} ${from} = ${result} ${to}`);
  }
});

client.login(token);
