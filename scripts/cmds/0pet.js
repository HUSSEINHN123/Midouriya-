const fs = require("fs");
const path = require("path");
class VirtualPet {
  constructor(name) {
    this.name = name;
    this.happiness = 50;
    this.hunger = 50;
    this.energy = 100;
    this.coins = 0;
    this.lastRestTime = null;
    this.foods = ["🍒", "🍎", "🍉", "🍑", "🍊", "🥭", "🍍", "🌶️", "🍋", "🍈", "🍏", "🍐", "🥝", "🍇", "🥥", "🍅", "🥕", "🍠", "🌽", "🥦", "🥒", "🥬", "🥑", "🍆", "🥔", "🌰", "🥜", "🍞", "🥐", "🥖", "🥯", "🥞", "🍳", "🥚", "🧀", "🥓", "🥩", "🍗", "🍖", "🍔", "🌭", "🥪", "🥨", "🍟", "🍕", "🌮", "🌯", "🥙", "🥘", "🍝", "🥫", "🥣", "🥗", "🍲", "🍛", "🍜", "🦞", "🍣", "🍤", "🥡", "🍚", "🥟", "🥟", "🍢", "🍙", "🍘", "🍥", "🍡", "🥠", "🥮", "🍧", "🍨", "🍦", "🥧", "🍰", "🍮", "🎂", "🧁", "🍭", "🍫", "🍫", "🍩", "🍪", "🍯", "🧂", "🍿", "🥤", "🥛", "🍵", "☕", "🍹", "🍶"];
  }
  
  feed() {
    if (this.hunger >= 10) {
      const randomFood = this.foods[Math.floor(Math.random() * this.foods.length)];
      this.hunger -= 10;
      this.happiness += 5;
      this.energy += 2;
      return `${this.name} لقد إستمتعت به 😁 ${randomFood}!\n\nالجوع: ${this.hunger}\nالسعادة: ${this.happiness}\nالطاقة: ${this.energy}`;
    } else {
      return `${this.name} هو بالفعل مليئ!`;
    }
  }

  play() {
    if (this.energy >= 10) {
      this.happiness += 10;
      this.energy -= 5;
      this.coins += 5;
      return `${this.name} قضيت وقتًا رائعًا في اللعب!\n\nالسعادة: ${this.happiness}\nالطاقة: ${this.energy}\n\nتهانينا! لقد حصلت على 5 دولار 💰`;
    } else {
      return `${this.name} أنا أشعر بالتعب الآن ربما في وقت لاحق 🥺.`;
    }
  }

  rest() {
    const currentTime = Date.now();
    if (!this.lastRestTime || (currentTime - this.lastRestTime) >= 7200000) {
      this.energy += 10;
      this.lastRestTime = currentTime;
      return `${this.name} حصلت على راحة جيدة واستعدت الطاقة.\n\nالطاقة ⚡: ${this.energy}`;
    } else {
      const remainingTime = Math.floor((7200000 - (currentTime - this.lastRestTime)) / 60000);
      return `${this.name} هو لازال يرتاح المرجو العودة بعد ${remainingTime} دقيقة.`;
    }
  }

  getStatus() {
    return `حالة ${this.name} كما يلي :\n\nالجوع 🍗: ${this.hunger}\nالسعادة 😁: ${this.happiness}\nالطاقة ⚡: ${this.energy}\n الرصيد 💰: $${this.coins}`;
  }
}

const petDataFile = "petData.json";
const userPets = loadPetData();

function loadPetData() {
  try {
    const data = fs.readFileSync(petDataFile);
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

function savePetData() {
  fs.writeFileSync(petDataFile, JSON.stringify(userPets, null, 2));
}

module.exports = {
config: {
  name: "حيوان_أليف",
  author:"August/zed",// Convert By Goatbot Zed
   role: 0,
  shortDescription: "قم بإنشاء حيوان أليف إفتراضي",
  longDescription: "حيوان أليف إفتراضي وتقوم بالإعتناء به ",
  category: "لعبة",
  guide: "{pn}حيوان_أليف"
},

  onStart: async function ({api, event, args }) {
  const action = args[0];
  const petName = args[1];

  if (!action) {
    return api.sendMessage(" ⚠️ | أرجوك قم بإختيار فعل:\n⌲ إنشاء\n⌲ إطعام\n⌲ لعب\n⌲ راحة\n⌲ الحالة\n⌲ الرصيد\n⌲ إستعادة", event.threadID, event.messageID);
  }

  if (action === "إنشاء") {
    if (userPets[event.senderID]) {
      return api.sendMessage(` ⚠️ | أنت بالفعل لديك حيوان و إسمه هو "${userPets[event.senderID].name}". يمكنك إنشاء واحد آخر لكن بإسم مختلف.`, event.threadID, event.messageID);
    }

    if (!petName) {
      return api.sendMessage(" ⚠️ | أرجوك قم بإدخال إسم لحيوانك الأليف", event.threadID, event.messageID);
    }
    
    userPets[event.senderID] = new VirtualPet(petName);
    savePetData();
    return api.sendMessage(` ✅ | لقد قمت بإنشاء حيوان أليف و إسمه هو ${petName}.`, event.threadID, event.messageID);
  }

  if (!userPets[event.senderID]) {
    return api.sendMessage(" ⚠️ | تحتاح أن تنشئ حيوان أليف هكذا ©حيوان_أليف [إسم الحيوان].", event.threadID, event.messageID);
  }

  const pet = userPets[event.senderID];
  let result = "";

  switch (action) {
    case "إنشاء":
      result = ` ✅ | لقد قمت بإنشاء حيوان أليف إسمه ${pet.name}.`;
      break;
    case "إطعام":
      result = pet.feed();
      break;
    case "لعب":
      result = pet.play();
      break;
    case "إستعادة":
      result = pet.rest();
      break;
    case "الحالة":
      result = pet.getStatus();
      break;
    case "الرصيد":
      result = `رصيدك من تربية ${pet.name} هو :  دولار 💰${pet.coins}`;
      break;
    case "إستعادة":
      if (!petName) {
        return api.sendMessage(" ⚠️ |يرجى تحديد اسم الحيوان الأليف لإعادة التعيين.", event.threadID, event.messageID);
      }
      if (pet.name !== petName) {
        return api.sendMessage(` ⚠️ |يمكنك فقط إعادة ضبط حيوانك الأليف. تم تسمية حيوانك الأليف "${pet.name}".`, event.threadID, event.messageID);
      }
      delete userPets[event.senderID];
      savePetData();
      return api.sendMessage(` ✅ | الحيوان الأليف "${petName}" تمت إعادة تعيينه. إستخدم ©حيوان_أليف إنشاء [الإسم] من أجل إنشاء إسم حيوان جديد.`, event.threadID, event.messageID);
    default:
      result = " ❌ | فعل مجهول و خاطئ. الأفعال المتاحة:\n\n⌲ إنشاء\n⌲ إطعام\n⌲ لعب\n⌲ راحة\n⌲ الحالة\n⌲ الرصيد\n⌲ إستعادة";
  }

  savePetData();
  return api.sendMessage(result, event.threadID, event.messageID);
},
  };
      