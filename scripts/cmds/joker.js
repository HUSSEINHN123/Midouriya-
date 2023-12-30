module.exports = {
  config: {
    name: "أقوال_الجوكر",
    aliases: ["أقوال_الجوكر", "joker_Sayings"],
    version: "1.0",
    author: "HUSSEIN",
    countDown: 10,
    role: 0,
    shortDescription: "مجموعة من فيديوهات من أقول الجوكر الحكيمة",
    longDescription: "سوف يرسل لك مختلف مقاطع من أقوال الجوكر ",
    category: "أخرى",
    guide: "{pn} أقول_الجوكر",
  },

  onStart: async function ({ api, event }) {
    const sentMessage = await api.sendMessage("✅ يتم تحميل الآن أقوال الجوكر من أجلك\nإنتظر من فضلك...!", event.threadID);
    const link = [
      "https://drive.google.com/uc?export=download&id=12HEqwl9okZ3cUcO88LaDsTy1QN_RgvX2",
      "https://drive.google.com/uc?export=download&id=12YbRmyxxdZGnIkKCqoNDO4P8LlGfdZ__", 
      "https://drive.google.com/uc?export=download&id=12aCj0WGG7dS3gN_73L38dnMzEBvjBXx1",
      "https://drive.google.com/uc?export=download&id=12_LU4NAWeyPGqVO4yyuB3RYNlccmu-he", 
      "https://drive.google.com/uc?export=download&id=12bURwNaW_DFyaudIcm6s-Al3HxNsB6hE", 
      "https://drive.google.com/uc?export=download&id=12czTMxOLCA63zxYDRmw8tpXhMZdwoBir",
      "https://drive.google.com/uc?export=download&id=12bURwNaW_DFyaudIcm6s-Al3HxNsB6hE",
      "https://drive.google.com/uc?export=download&id=12e1M51uKvNPZ8O97DXfOub8kP2mYK44m",
      "https://drive.google.com/uc?export=download&id=12iyJL4OBMRSkFY_OOMHuBBmPrPlFnL-7",
      "https://drive.google.com/uc?export=download&id=12l1xeGpnt5kc4kzFJdSq5HXnqOtezqtv",
      "https://drive.google.com/uc?export=download&id=12peIXZsSiP865XOQ2ueGXVky4yUWIOVs",
      "https://drive.google.com/uc?export=download&id=12mXmw7gLIuYISqIYmyp7uAutBLVUCzwT",
      "https://drive.google.com/uc?export=download&id=12macEiLDc7_ekcpm4B996cCWyQgRTUUu",
      "https://drive.google.com/uc?export=download&id=12uuxq44P2hIidxEwQJkkpgC7FbGZXz73",
      "https://drive.google.com/uc?export=download&id=12wtZ9f6dOF80bEJ9X4WKmPMWPgygSZ-f",
      "https://drive.google.com/uc?export=download&id=12z5abz-k4ELYAFXtPXqaqw78-HJZx2qu",
      "https://drive.google.com/uc?export=download&id=12yF8sYjXp9epfnpp5EMGqNcHL-vtW1hs",
      "https://drive.google.com/uc?export=download&id=12uarp7dxjSDP1OkjtdvYzqqOPomHwDyL",
      "https://drive.google.com/uc?export=download&id=12wDKEDSfK3zYtQk97If2nMezKuKqLCk3",
      "https://drive.google.com/uc?export=download&id=12z_OJ-8VcV5jANO08eO2YA-M20FS8FAL",
      "https://drive.google.com/uc?export=download&id=136yI3zjfzfYNlAfB--HrTkE_QnHbTIBs",
      "https://drive.google.com/uc?export=download&id=130fCN_SdaP2shCn5jsysAG4n7VT99oO-",
      "https://drive.google.com/uc?export=download&id=136PADfVX7RmKv8y4cthQRsVROCtvl9EV",
      "https://drive.google.com/uc?export=download&id=134-44PpOO4zJtYoHy4FCrZJgivT2Md5I",
      "https://drive.google.com/uc?export=download&id=133KjEbXE_GGZmrFakWOdr_zVH92xAfb2",
      "https://drive.google.com/uc?export=download&id=13DZDbJP4o5JO0ng1EjepUhlJJpIhuPW8",
      "https://drive.google.com/uc?export=download&id=13DBWkx7nfgK4qtA4X_Xtu5ZqFa68OTEB",
      "https://drive.google.com/uc?export=download&id=13FLeISZWLULu7Oyx8jyN9ho9SuD28AA2",
      "https://drive.google.com/uc?export=download&id=13Gfh3eAPH66wjo6PSpMvm-QZBX1W7zQF",
      "https://drive.google.com/uc?export=download&id=13GNwli7kz0WPYkNztxowYITjPtj432pX",
      "https://drive.google.com/uc?export=download&id=13JxwzxyU9L1iAnsjQlok9NuRjVR47rEC",
      "https://drive.google.com/uc?export=download&id=13LjbHqzcO4psMpLxzxi3w5TmD3E8cR-U",
      // Add more video links here
    ];

    const randomIndex = Math.floor(Math.random() * link.length);
    const randomVideo = link[randomIndex];

    await api.sendMessage({
      body: 'إستمتع..!💚',
      attachment: await global.utils.getStreamFromURL(randomVideo),
    }, event.threadID);

    
    setTimeout(() => {
      api.unsendMessage(sentMessage.messageID);
    }, 10000); 
  },
};