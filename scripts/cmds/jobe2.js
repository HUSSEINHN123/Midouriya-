module.exports = {
  config: {
    name: "عمل",
    aliases: ["nea"], 
    version: "1.0",
    author: "LiANE",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "Làm việc để kiếm tiền",
      en: "قم بالعمل من أجل أن تكسب المال"
    },
    longDescription: {
      vi: "Thực hiện công việc và nhận tiền thưởng.",
      en: "أداء المهام وكسب المكافآت."
    },
    category: "إقتصاد", 
    guide: {
      vi: "   {pn} إرتفاع المستوى: رصيدك من الجائزة: ?\n"
        + "   {pn} إحزر الرقم: رصيدك من الجائزة: ?\n"
        + "   {pn} إختبار الحظ: رصيدك من الجائزة: ?",
      en: "   {pn} إرتفاع_المستوى: رصيدك من الجائزة: ?\n"
        + "   {pn} لعبة_التخمين: رصيدك من الجائزة: ?\n"
        + "   {pn} إختبار_الحظ: رصيدك من الجائزة: ?"
    }
  },

  onStart: async function ({ args, message, event, usersData }) {
    const command = args[0];

    if (command === "إرتفاع_المستوى") {

      const result = Math.random() > 0.5;
      const reward = result ? 1000 : -500; // Adjust the reward
      if (result) {
        return message.reply(`لقد أكملت تحدي المستوى الأعلى بنجاح وحصلت على ${reward} $. تهانينا!`);
      } else {
        return message.reply(`تحدي رفع المستوى لم يسير كما هو مخطط له. لقد خسرت ${Math.abs(reward)} $. حظ أوفر في المرة القادمة.`);
      }
    } else if (command === "لعبة_التخمين") {
      // Guessing Game: Make it a fun game
      const guess = Math.floor(Math.random() * 10); // Random number to guess
      const userGuess = parseInt(args[1]);

      if (!isNaN(userGuess) && userGuess === guess) {
        const reward = 200; // Reward amount
        return message.reply(`تهانينا! لقد فزت في لعبة التخمين وحصلت على ${reward} $.`);
      } else {
        return message.reply("حاول تخمين رقم بين 0 و 9.");
      }
    } else if (command === "إختبار_الحظ") {
      // Luck Test: Make it a luck-based task
      const lucky = Math.random() > 0.5;
      const reward = lucky ? 1000 : -500; // Reward amount
      if (lucky) {
        return message.reply("وكان الحظ إلى جانبك! لقد اجتزت اختبار الحظ وحصلت على 1000 دولار.");
      } else {
        return message.reply("لسوء الحظ، لم يكن الحظ إلى جانبك هذه المرة. لقد خسرت 500 دولار.");
      }
    } else if (command === "عرض_الكل") {
      // Provide a list of available work commands
      return message.reply(`أوامر العمل المتاحة:\n\n`
        + `1. إرتفاع_المستوى: مجموعة من التحديات, مكافأة الجائزة: متنوع\n`
        + `2.  لعبة_التخمين: لعبة التخمين، ومكافأة الجائزة 200 دولار\n`
        + `3. إختبار_الحظ: إختبار يعتمد على الحظ, مكافأة الجائزة: متنوع`);
    } else {
      return message.reply(`إستخدام غير صالح الأمر عنل. إستخدم "عمل2: عرض_الكل" لرؤية الأوامر المتاحة.`);
    }
  }
};
      