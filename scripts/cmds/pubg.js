const axios = require('axios');

module.exports = {
  config: {
    name: "بابجي",
    aliases: ['pubg'],
    version: "1.0",
    author: "Samir B. Thakuri",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "لعبة ببجي تخمين العناصر."
    },
    longDescription: {
      en: "تخمين هذا البند، من PUBG"
    },
    category: "لعبة",
    guide: {
      en: "{pn}"
    },
  },

  onReply: async function ({ args, event, api, Reply, commandName }) {
    let { dataGame, answer, nameUser } = Reply;
    if (event.senderID != Reply.author) return;

    switch (Reply.type) {
      case "reply": {
        const userReply = event.body.toLowerCase();

        if (userReply === answer.toLowerCase()) {
          api.unsendMessage(Reply.messageID);
          const msg = {
            body: `✅ ${nameUser}, لقد قمت بالإجابة بشكل صحيح!\n\nالجواب: ${answer}`
          };
          return api.sendMessage(msg, event.threadID, event.messageID);
        } else {
          api.unsendMessage(Reply.messageID);
          const msg = `${nameUser}, الجواب خطأ!!\nالجواب الصحيح هو: ${answer}`;
          return api.sendMessage(msg, event.threadID);
        }
      }
    }
  },

  onStart: async function ({ api, event, usersData, commandName }) {
    const { threadID, messageID } = event;
    const timeout = 60;

    try {
      const response = await axios.get('https://www.nguyenmanh.name.vn/api/pubgquiz?apikey=OFZgi8xx');
      const quizData = response.data.result;
      const { link, body, answer } = quizData;
      const namePlayerReact = await usersData.getName(event.senderID);

      const msg = {
        body: `ما اسم العنصر الموضح في الصورة: \n\n${body}\n\nقم بالرد بالإجابة المناسبة`,
        attachment: await global.utils.getStreamFromURL(link)
      };

      api.sendMessage(msg, threadID, async (error, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          type: "reply",
          commandName,
          author: event.senderID,
          messageID: info.messageID,
          dataGame: quizData,
          answer,
          nameUser: namePlayerReact
        });

        setTimeout(function () {
          api.unsendMessage(info.messageID);
        }, timeout * 1000);
      });
    } catch (error) {
      console.error("خطأ غير متوقع قم قم بإعادة المحاولة لاحقا:", error);
    }
  }
};