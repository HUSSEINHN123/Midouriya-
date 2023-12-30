const numberslst = {};

module.exports = {
  config: {
    name: 'أرقام',
    aliases: ["nums"],
    author: 'allou mohamed',
    version: '1.0.0',
    role: 0,
    category: 'الألعاب',
    guide: '{pn}',
    description: 'لعبة أرقام مثل إكسون 🌞'
  },

  onStart: async function ({ api, message, event }) {
    if (!numberslst[event.threadID]) numberslst[event.threadID] = {};
    numberslst[event.threadID].s = {
      a: true,
      b: getRandomNumber(1, 100),
      d: 0
    };

    api.sendMessage('حسنًا إحزر رقمًا بين 1 و 100.', event.threadID);
  },

  onMessage: async function ({ api, message, event, usersData }) {
    if (!numberslst[event.threadID] || !numberslst[event.threadID].s) return;

    let { a, b, d } = numberslst[event.threadID].s;

    const c = parseInt(event.body);

    if (a && (c < 1 || c > 100)) {
      api.sendMessage({
        body: 'الرجاء إدخال رقم صحيح بين 1 و 100.',
        mentions: [{
          tag: event.senderID,
          id: event.senderID
        }]
      }, event.threadID);
      return;
    }

    if (a && c !== b) {
      numberslst[event.threadID].s.d = d + 1;
      if (c > b) {
        api.sendMessage('⬇️', event.threadID);
      } else {
        api.sendMessage('⬆️', event.threadID);
      }
      return;
    }

    const name = await usersData.getName(event.senderID);

    if (a && c === b) {
      let r;
      let m;
      if (d < 10) {
        r = 400;
        m = "عدد محاولاتك قليل جداً، أداء رائع!";
      } else {
        r = 200;
        m = "محاولاتك كانت كثيرة قليلاً!";
      }
      api.sendMessage('🥳', event.threadID);
      api.sendMessage(`كفوا ${name} الرقم هو ${b} فعلا.\n- ربحت ${r} لأن ${m}\n- ${d} محاولات.`, event.threadID);
      numberslst[event.threadID].s = {};
    }
  }
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
