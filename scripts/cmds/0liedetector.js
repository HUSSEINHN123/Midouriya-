module.exports = {
  config: {
    name: "مكتشف_الكذب",
    aliases: ["ld"],
    shortDescription: {
      en: "مكتشف إذا ماكلن أمر كاذب",
      tl: "Lie detector command"
    },
    longDescription: {
      en: "أمر يكتشف ما إذا كان المستخدم يكذب",
      tl: "Isang command na nakakadetekta kung nagsisinungaling ang user"
    },
    category: "خدمات",
    guide: {
      en: "{p}مكتشف_الكذب <إفادة>",
      tl: "{p}lieDetector <pahayag>"
    },
    role: 0,
  },
  onStart: async function ({ event, message }) {
    const statement = event.body.slice(12); // Get the statement from the message
    const liarProbability = Math.random(); // Generate a random probability of being a liar

    if (liarProbability < 0.5) {
      message.reply(`هذه الإفادة "${statement}" هي صحيحة ✅. المستخدم لا يكذب.`);
    } else {
      message.reply(`الإفادة  "${statement}" هي خاطئة ❌. المستخدم يكذب 🙂.`);
    }
  },
};