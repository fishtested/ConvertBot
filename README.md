# ConvertBot
A Discord.js bot that converts units and currencies quickly and easily.

## How it works
- Run `/convert` with the input and unit you want it to be converted to
- The script finds the formula for your input and requested unit
- Replies to your message with the result
- Currency conversion rates and data are from [ExchangeRate-API](https://www.exchangerate-api.com/). The free plan allows 1.5K requests per month and daily updates with an API key.


## Screenshot
<img width="269" height="46" alt="command" src="https://github.com/user-attachments/assets/3ee7e575-8052-47dc-ab52-6011ad9ff024" /><br>
<img width="308" height="163" alt="weight result" src="https://github.com/user-attachments/assets/289a3a39-306f-424f-80e0-dcf793c41870" /><br>
<img width="460" height="85" alt="currency result" src="https://github.com/user-attachments/assets/3f83ca9a-3f80-4b46-96bd-f4247d713d40" /><br>
<img width="252" height="87" alt="length result" src="https://github.com/user-attachments/assets/9563691d-debb-4b23-9734-40a3e8e5f164" />

## Installation
1. Install the Node.js dependencies (npm install discord.js) 
2. Download the bot.js file
3. Create a config.json file with your bot token and ExchangeRate-API key
4. Run the bot (node bot.js)
