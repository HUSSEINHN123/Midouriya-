module.exports = {
  config: {
    name: "شخصيتي",
    aliases: ["my-character"],
    version: "1.0",
    author: "HUSSEIN",
    countDown: 5,
    role: 0,
    shortDescription: "يقوم بإقتراح عليك شخصيتك من الأنمي ",
    longDescription: "",
    category: "أنمي",
    guide: "{pn}أنمي"
  },

  onStart: async function ({ api, event }) {
    // قم بتحديث المتغيرات العامة
    const mention = Object.keys(event.mentions);

    const mentionName = event.mentions[mention[0]].replace("@", ""); 
    
    if (mention.length !== 1) {
        api.sendMessage(" ⚠️ |الرجاء عمل منشن للشخص اللذي تريد اهانته.", event.threadID);
    } 
    
    var link = [
             "https://i.imgur.com/RRnddBS.jpg",
       "https://i.imgur.com/4av6OnG.jpg",
       "https://i.imgur.com/bID48JU.jpg",
       "https://i.imgur.com/Kkc5CZs.jpg",
       "https://i.imgur.com/T9WwPxL.jpg",
       "https://i.imgur.com/R7trNF3.jpg",
       "https://i.imgur.com/pp3L51v.jpg",
       "https://i.imgur.com/nmTpfIV.jpg",
       "https://i.imgur.com/G7Cmlm5.jpg",
       "https://i.imgur.com/gyk1KTE.jpg",
       "https://i.imgur.com/0C40VMA.jpg",
       "https://i.imgur.com/b0YCfBO.jpg",
       "https://i.imgur.com/EF63R6y.jpg",
       "https://i.imgur.com/uaBmGDh.jpg",
       "https://i.imgur.com/J68g1dP.jpg",
       "https://i.imgur.com/co4wnOI.jpg",
       "https://i.imgur.com/rcXzlbD.jpg",
       "https://i.imgur.com/4K2Lx2E.jpg",
       "https://i.imgur.com/d9KlCjt.jpg",
       "https://i.imgur.com/KriNOKQ.jpg",
       "https://i.imgur.com/phrVQXt.jpg",
       "https://i.imgur.com/5j3cTq5.jpg",
       "https://i.imgur.com/Ot3QVTg.jpg",
       "https://i.imgur.com/QHZN13e.jpg",
       "https://i.imgur.com/SdO0pM9.jpg",
       "https://i.imgur.com/ci4PEdV.jpg",
       "https://i.imgur.com/wJ8Xf7y.jpg",
       "https://i.imgur.com/tWAcRGP.jpg",
       "https://i.imgur.com/BAydztZ.jpg",
       "https://i.imgur.com/vMNBrY3.jpg",
       "https://i.imgur.com/h2bGRek.jpg",
      "https://i.imgur.com/Sg3Ai4Y.jpg",
       "https://i.imgur.com/KFdJypu.jpg",
       "https://i.imgur.com/PChQ6Ea.jpg",
       "https://i.imgur.com/pekp4LZ.jpg",
       "https://i.imgur.com/uKmiejK.jpg",
       "https://i.imgur.com/pXUtKtB.jpg",
       "https://i.imgur.com/Foi1zGB.jpg",
       "https://i.imgur.com/iQ3DWx5.jpg",
       "https://i.imgur.com/r8yrFRw.jpg",
       "https://i.imgur.com/4PqzyWP.jpg",
    ];

    let img = link[Math.floor(Math.random() * link.length)];

    // React to the message with a check mark
    api.setMessageReaction("🤔", event.messageID, (err) => {}, true);

    api.sendMessage({
      body: `「 💫 | لو كان ${mentionName} شخصية أنمي سيكون : 」`,
      attachment: await global.utils.getStreamFromURL(img)
    }, event.threadID);
  }
};
 //هل يمكنك أنتجعله يعمل على اللذي يستخدم الأمر وعلى اللذي يتم عمل منشن له