const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
	config: {
		name: "صفعة_الوطواط",
		version: "1.1",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: "صورة لصفعة الوطواط",
		longDescription: "صورة لصفعة الوطواط",
		category: "صور",
		guide: {
			en: "   {pn} @تاغ"
		}
	},

	langs: {
		vi: {
			noTag: "Bạn phải tag người bạn muốn tát"
		},
		ar: {
			noTag: "يجب عليك وضع علامة على الشخص الذي تريد صفعه"
		}
	},

	onStart: async function ({ event, message, usersData, args, getLang }) {
		const uid1 = event.senderID;
		const uid2 = Object.keys(event.mentions)[0];
		if (!uid2)
			return message.reply(getLang("noTag"));
		const avatarURL1 = await usersData.getAvatarUrl(uid1);
		const avatarURL2 = await usersData.getAvatarUrl(uid2);
		const img = await new DIG.Batslap().getImage(avatarURL1, avatarURL2);
		const pathSave = `${__dirname}/tmp/${uid1}_${uid2}Batslap.png`;
		fs.writeFileSync(pathSave, Buffer.from(img));
		const content = args.join(' ').replace(Object.keys(event.mentions)[0], "");
		message.reply({
			body: `${(content || "يا لها من صفعة ساخنة 😵‍💫😵")}`,
			attachment: fs.createReadStream(pathSave)
		}, () => fs.unlinkSync(pathSave));
	}
};