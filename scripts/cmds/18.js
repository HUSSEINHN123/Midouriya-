const fs = require("fs")

module.exports = {
	config: {
		name: "pokebot",
		version: "1.0",
		author: "NIB",
		countDown: 1,
		role: 0,
		shortDescription: "قم بتشغيل البوكيمون و إطفائه",
		longDescription: "",
		category: "بوكيمون",
		guide: "{pn} {{[on | off]}}",
		envConfig: {
			deltaNext: 5
		}
	},
  

	onStart: async function ({ message, event, threadsData, args }) {
   // var pokos = JSON.parse(fs.readFileSync('pokos.json', 'utf8'));

var pokedb = JSON.parse(fs.readFileSync('pokedb.json', 'utf8'));
let pokebot = await threadsData.get(event.threadID, "settings.pokebot");
		
			
    if(pokebot === undefined){
      await threadsData.set(event.threadID, true, "settings.pokebot");
    }
    console.log(await threadsData.get(event.threadID, "settings.pokebot"))
		if (!["on", "off"].includes(args[0]))
			return message.reply("on or off")
		await threadsData.set(event.threadID, args[0] === "on", "settings.pokebot");
    if(args[0] == "on"){
if(!pokedb.hasOwnProperty(event.threadID)){
  pokedb[event.threadID] = {taken:[], usdata:{}}
  fs.writeFile('pokedb.json', JSON.stringify(pokedb), err => { if (err) return console.error(err); });
}
    }
		return message.reply(`Is already ${args[0] === "on" ? "turn on" : "Turn off"}`);
	},

	onChat: async function ({ api, threadsData, usersData, event, message, commandName }) {

    var pokos = JSON.parse(fs.readFileSync('pokos.json', 'utf8'));

var pokedb = JSON.parse(fs.readFileSync('pokedb.json', 'utf8'));
    
		const pokebot = await threadsData.get(event.threadID, "settings.pokebot");
		if (!pokebot)
			return;

    
      
		if(!global.poke.hasOwnProperty(event.threadID)){
    global.poke[event.threadID] = 1;
    }
    global.poke[event.threadID]++
    if(global.poke[event.threadID] == 20) { 
      let time = Math.floor((Math.random()*5)+15)
      console.log(`الوقت فد بدأ من أجل ${time}دقائق`)
      setTimeout(async function(){
			let ind = getRandom(pokos, pokedb[event.threadID].taken)
			try {
				
				const form = {
					attachment : await global.utils.getStreamFromURL(pokos[ind].image)
				}
				message.send(form, (err, info) => {global.fff.push(info.messageID)
global.GoatBot.onReply.set(info.messageID,{
  commandName,
  mid:info.messageID,
  name:pokos[ind].name,
  ind:ind
})
                                     });
				message.send('ظهر بوكيمون بري! قم بإضافته إلى مجموعة البوكيمون الخاصة بك عن طريق الرد على اسم البوكيمون')
        global.poke[event.threadID] = 0
        
			} catch (e) { 
        console.log(e)
        message.reply('🥺 المستخدم مشغول') };
		}, time*60000)}
	},

  onReply: async ({ event, api, Reply, message, getLang }) => {
    var pokos = JSON.parse(fs.readFileSync('pokos.json', 'utf8'));

var pokedb = JSON.parse(fs.readFileSync('pokedb.json', 'utf8'));
		if(Reply.name == event.body.toLowerCase() || Reply.name.split("-")[0] == event.body.toLowerCase()){
      message.unsend(Reply.mid)
      pokedb[event.threadID].taken.push(Reply.ind)
      if(!pokedb[event.threadID].usdata.hasOwnProperty(event.senderID)){
        pokedb[event.threadID].usdata[event.senderID] = []
      }
      pokedb[event.threadID].usdata[event.senderID].push(Reply.name)
      fs.writeFile('pokedb.json', JSON.stringify(pokedb), err => { if (err) return console.error(err); });
      message.reply({body:"تهانينا!!!!! "+Reply.name+" تهانينا لقد تم إضافته إلى حقيبة_البوكيمون الخاصة بك.", attachment:await global.utils.getStreamFromURL(pokos[Reply.ind].image)})
    }else{
      message.send("يا غبي جوابك خاطئ ألم تشاهد أنمي بوكيمون من قبل")
    }
	}
}



function getRandomInt(arra) {
 

   return Math.floor(Math.random() * arra.length);
}


function getRandom(arra, excludeArrayNumbers) {
  let randomNumber;

  if(!Array.isArray(excludeArrayNumbers)) {
    randomNumber = getRandomInt(arra);
    return randomNumber;
  }

  do {
    randomNumber = getRandomInt(arra);
  } while ((excludeArrayNumbers || []).includes(randomNumber));

  return randomNumber;
    }