module.exports = {
  config: {
    name: "حاسبة",
    version: "1.0",
    author: "AceGun",
    role: 0,
    colldown: 5,
    shortDescription: "إجراء العمليات الحسابية الأساسية.",
    category: "خدمات",
    guide: "{prefix}حاسبة <التعبير>"
  },
  onStart: async function ({ message, args }) {
    const expression = args.join(" ");

    if (!expression) {
      return message.reply(" ⚠️ | ارجوك قم بإدخال تعبير أو رقم من أجل حسابه");
    }

    let result;
    try {
      result = eval(expression);
    } catch (error) {
      console.error(error);
      return message.reply(" ❌ |أُووبس! حدث خطأ ما أثناء محاولة حساب تعبيرك.");
    }

    message.reply(` ✅ | نتيجة التعبير  ${expression} هو ${result}.`);
  },
};