const fs = require('fs');
const axios = require('axios');

module.exports = {
  config: {
    name: "عملة",
    aliases: ["bet"],
    version: "1.0",
    author: "Convert to goatbot",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "تحويل العملة إلى عملة أخرى"
    },
    longDescription: {
      vi: "",
      en: ""
    },
    category: "وسائط",
    guide: {
      vi: "",
      en: ""
    }
  },
  onStart: async function ({ api, event, args }) {
    const amount = parseFloat(args[0]);
    const fromCurrency = args[1];
    const toCurrency = args[2];

    if (isNaN(amount) || !fromCurrency || !toCurrency) {
      api.sendMessage("يرجى تقديم مبلغ صالح، من العملة، وإلى العملة.", event.threadID);
      return;
    }

    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const exchangeRates = response.data.rates;
      if (toCurrency in exchangeRates) {
        const convertedAmount = (amount * exchangeRates[toCurrency]).toFixed(2);
        api.sendMessage(`${amount} ${fromCurrency} تقريبا ${convertedAmount} ${toCurrency}.`, event.threadID);
      } else {
        api.sendMessage("تم توفير رموز العملة غير صالحة.", event.threadID);
      }
    } catch (error) {
      console.error("حدث خطأ أثناء جلب أسعار الصرف:", error);
      api.sendMessage("حدث خطأ أثناء جلب أسعار الصرف.", event.threadID);
    }
  }
};