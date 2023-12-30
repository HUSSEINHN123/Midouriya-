async function checkShortCut(nickname, uid, usersData) {
	try {
		/\{userName\}/gi.test(nickname) ? nickname = nickname.replace(/\{userName\}/gi, await usersData.getName(uid)) : null;
		/\{userID\}/gi.test(nickname) ? nickname = nickname.replace(/\{userID\}/gi, uid) : null;
		return nickname;
	}
	catch (e) {
		return nickname;
	}
}

module.exports = {
	config: {
		name: "ضبط_الإسم",
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Đổi biệt danh ",
			en: "تغيير اللقب"
		},
		longDescription: {
			vi: "Đổi biệt danh của tất cả thành viên trong nhóm chat hoặc những thành viên được tag theo một định dạng",
			en: "قم بتغيير اللقب لجميع الأعضاء في الدردشة أو الأعضاء الذين تم وضع منشن عليهم بواسطة أحد التنسيقات"
		},
		category: "المجموعة",
		guide: {
			vi: {
				body: "   {pn} <nick name>: thay đổi biệt danh của bản thân"
					+ "\n   {pn} @tags <nick name>: thay đổi biệt danh của những thành viên được tag"
					+ "\n   {pn} all <nick name>: thay đổi biệt danh của tất cả thành viên trong nhóm chat"
					+ "\n\n   Với các shortcut có sẵn:"
					+ "\n   + {userName}: tên của thành viên"
					+ "\n   + {userID}: ID của thành viên"
					+ "\n\n   Ví dụ: (xem ảnh)",
				attachment: {
					[`${__dirname}/assets/guide/setname_1.png`]: "https://i.ibb.co/gFh23zb/guide1.png",
					[`${__dirname}/assets/guide/setname_2.png`]: "https://i.ibb.co/BNWHKgj/guide2.png"
				}
			},
			en: {
				body: "   {pn} <إسم اللقب>: يقوم بتغيير إسم اللقب الخاص بك"
					+ "\n   {pn} @منشن <إسم اللقب>: يغير لقب الشخص اللذي قمت بوضع منشن عليه"
					+ "\n   {pn} الكل <إسم اللقب>: تغيير لقب كل أعضاء المجموعة"
					+ "\n\nمع الاختصارات المتاحة:"
					+ "\n   +  {إسم المستخدم}: إسم العضو"
					+ "\n   + {آيدي المستخدم}: آيدي العضو"
					+ "\n\n   مثال: (ستقوم برؤيته في الصور )",
				attachment: {
					[`${__dirname}/assets/guide/setname_1.png`]: "https://i.ibb.co/gFh23zb/guide1.png",
					[`${__dirname}/assets/guide/setname_2.png`]: "https://i.ibb.co/BNWHKgj/guide2.png"
				}
			}
		}
	},

	langs: {
		vi: {
			error: "Đã có lỗi xảy ra, thử tắt tính năng liên kết mời trong nhóm và thử lại sau"
		},
		en: {
			error: " ⚠️ |حدث خطأ، حاول إيقاف ميزة رابط الدعوة في المجموعة وحاول مرة أخرى لاحقًا"
		}
	},

	onStart: async function ({ args, message, event, api, usersData, getLang }) {
		const mentions = Object.keys(event.mentions);
		let uids = [];
		let nickname = args.join(" ");

		if (args[0] === "الكل" || mentions.includes(event.threadID)) {
			uids = (await api.getThreadInfo(event.threadID)).participantIDs;
			nickname = args[0] === "الكل" ? args.slice(1).join(" ") : nickname.replace(event.mentions[event.threadID], "").trim();
		}
		else if (mentions.length) {
			uids = mentions;
			const allName = new RegExp(Object.values(event.mentions).join("|"), "g");
			nickname = nickname.replace(allName, "").trim();
		}
		else {
			uids = [event.senderID];
			nickname = nickname.trim();
		}

		try {
			const uid = uids.shift();
			await api.changeNickname(await checkShortCut(nickname, uid, usersData), event.threadID, uid);
		}
		catch (e) {
			return message.reply(getLang("error"));
		}

		for (const uid of uids)
			await api.changeNickname(await checkShortCut(nickname, uid, usersData), event.threadID, uid);
	}
};