const axios = require("axios");
const { Telegraf } = require("telegraf");
const TOKEN = "5521036088:AAGKYNxkMybWV5X1oAnx5uly9LWw_VZTUJU";
const bot = new Telegraf(TOKEN);
const Url ='http://api.weatherstack.com/current?access_key=ffb9cc197e90faf3db8073cd1f2e654b&query="'

const fetchData = async (cityName) => {
    const res = await axios.get(`${Url + cityName}`);
    return res;
  };





//custom commands
bot.hears('hi', (ctx) => ctx.reply('Hey there'))


bot.help((ctx) => ctx.reply('Hey just type name of city or contry and enjoy our service ! ( exemple type : Monastir tunisia) '))
bot.command('secondbot', Telegraf.reply('Check our second bot  \n Tunis Weather 🇹🇳 \n\n  @TunisWeather_bot'))
bot.command('tunisweather', Telegraf.reply('Check our second bot  \n Tunis Weather 🇹🇳 \n\n  @TunisWeather_bot'))
 bot.command('owner', Telegraf.reply('Created By Aymen Ghnia 🇹🇳 \n\n  @aymenghnia \n\n  📱 :instagram : instagram.com/aymen_ghnia \n\n 💻 : Facebook : facebook.com/ghniaaymen3/ \n\n 📞 : +216 51 550 022 \n\n Check our second bot  \n Tunis Weather 🇹🇳 \n\n  @TunisWeather_bot'))
 





//fetchData('Sousse Tunisia')
bot.start((ctx)=>{
    ctx.reply('Hello there !  im a bot 😍 ')
});

bot.on("text", async (ctx) => {
  const { message } = ctx;
  const { data } = await fetchData(message.text);
  if (data.success === false) {
    ctx.reply(" ❌ Enter a valid city name: ❌");
  } else {  
    const  { current, location } = data;
    const weatherStatus = current.weather_descriptions[0];

    ctx.reply(
      `🌆 City : ${location.name}\n\n 🌡 Temperature ${
        current.temperature
      }°\n\n❓ Weather status  : ${
        (weatherStatus.toLowerCase().includes("clear") === true && "☀️") ||
        (weatherStatus.toLowerCase().includes("sunny") === true && "☀️") ||
        (weatherStatus.toLowerCase().includes("cloud") === true && "☁️") ||
        (weatherStatus.toLowerCase().includes("overcast") === true && "☁️") ||
        (weatherStatus.toLowerCase().includes("rain") === true && "🌧") ||
        (weatherStatus.toLowerCase().includes("snow") === true && "❄️")
      } ${current.weather_descriptions[0]}`
    );
  }
}); 




bot.launch();