const axios = require('axios');
//not for mirai/botpack
module.exports = {
  config: {
    name: 'جوت',
    version: '1.0',
    author: 'JV Barcenas && LiANE', // do not change
    credits: 'JV Barcenas && LiANE', // do not change
    role: 0,
    usePrefix: true,
    hasPermission: 2,
    category: 'الذكاء الإصطناعي',
    commandCategory: 'Ai - Chat',
    description: 'قم بصناعة أوامر الجوت مع الذكاء الإصطناعي',
    usages: '[الوصف]',
    vip: false,
    license: `جميع الحقوق محفوظة\n\nحقوق الطبع والنشر (ج) [السنة] [المؤلف]\n\nجميع الحقوق محفوظة. لا يجوز إعادة إنتاج أي جزء من هذا البرنامج أو توزيعه أو نقله بأي شكل أو بأي وسيلة، بما في ذلك التصوير الفوتوغرافي.`,
    shortDescription: {
      en: 'قم بصناعة أوامر بإستخدام الذكاء الإصطناعي',
    },
    longDescription: {
      en: 'قم بإصدار الأوامر بمساعدة جوت الذكاء الإصطناعي',
    },
    guide: {
      en: '{pn} [الوصف]',
    },
  },
  onStart: async function (context) {
    const { api, event } = context;

    try {
      //const prompt = event.body.trim();
      const [cmd, ...args] = event.body.split(" ");
      const prompt = args.join(" ");
      if (prompt) {


        const response = await axios.get(`https://school-project-lianefca.bene-edu-ph.repl` +`.co/` + `ask/goatai?query=${encodeURIComponent(prompt)}`);

        if (response.data) {
          const messageText = response.data.message;
          await api.sendMessage(messageText, event.threadID, event.messageID);

          console.log('Sent answer as a reply to the user');
        } else {
          throw new Error('Invalid or missing response from API');
        }
      }
    } catch (error) {
      console.error(`Failed to get an answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.\n\n ❌ |يمكنك محاولة كتابة سؤالك مرة أخرى أو إعادة إرساله، حيث قد يكون هناك خطأ من الخادم يسبب المشكلة. قد يحل المشكلة.`,
        event.threadID
      );
    }
  },
  run: async function (context) {
    module.exports.onStart(context);
  },
  execute: async function (context) {
    module.exports.onStart(context);
  },
  onPREFIX: async function (context) {
    module.exports.onStart(context);
}
};