module.exports = {
  config: {
    name: "تحويل",
    version: "1.0",
    author: "Riley",
    role: 0,
    shortDescription: "قم بإعطاء العملات  إلى مستخدم آخر",
    category: "إقتصاد",
    guide: "{p}تحويل <آيدي المستخدم> <الكمية>",
  },
  onStart: async function ({ api, event, args, usersData }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);

    const recipientID = args[0]; // ID penerima
    const amount = parseInt(args[1]); // Jumlah uang yang ingin diberikan

    if (isNaN(amount) || amount <= 0) {
      return api.sendMessage("أرجوك قم بإدخل الكمية.", event.threadID);
    }

    if (userData.money < amount) {
      return api.sendMessage("هذه العملات ليست كافية.", event.threadID);
    }

    const recipientData = await usersData.get(recipientID);

    userData.money -= amount; // Kurangi uang dari pengirim
    recipientData.money += amount; // Tambahkan uang ke penerima

    await usersData.set(senderID, userData);
    await usersData.set(recipientID, recipientData);

    api.sendMessage(`لقد أعطيت ملا يقدر ب ${amount}  إلى المستخدم دولار.`, event.threadID);
  },
};