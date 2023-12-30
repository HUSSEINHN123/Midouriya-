const { findUid } = global.utils;
const regExCheckURL = /^(http|https):\/\/[^ "]+$/;

module.exports = {
	config: {
		name: "آيدي",
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Xem uid",
			en: "عرض الآيدي الخاص بك"
		},
		longDescription: {
			uid: "Xem user id facebook của người dùng",
			en: "عرض آيدي المستخدم أو الخاص بك"
		},
		category: "معلومات",
		guide: {
			vi: "   {pn}: dùng để xem id facebook của bạn"
				+ "\n   {pn} @tag: xem id facebook của những người được tag"
				+ "\n   {pn} <link profile>: xem id facebook của link profile"
				+ "\n   Phản hồi tin nhắn của người khác kèm lệnh để xem id facebook của họ",
			en: "   {pn}:  تستخدم لعرض آيدي مستخدم الفيسبوك أو الخاص بك "
				+ "\n   {pn} @منشن: لعرض آيدي المستخدم الذي الذي قمت بعمل منشن عليه"
				+ "\n   {pn} <profile link>: عرض آيدي مستخدم الفيسبوك من أجل  رابط الملف الشخصي"
				+ "\n   قم بالرد على رسالة شخص ما باستخدام الأمر لعرض آيدي مستخدم الفيسبوك الخاص به "
		}
	},

	langs: {
		vi: {
			syntaxError: "Vui lòng tag người muốn xem uid hoặc để trống để xem uid của bản thân"
		},
		en: {
			syntaxError: "أرجوك قم ب عمل تاغ على الشخص الذي تريد رواية الآيدي الخاص به أو أتركها فارغة لترى الآيدي الخاص بك"
		}
	},

	onStart: async function ({ message, event, args, getLang }) {
		if (event.messageReply)
			return message.reply(event.messageReply.senderID);
		if (!args[0])
			return message.reply(event.senderID);
		if (args[0].match(regExCheckURL)) {
			let msg = '';
			for (const link of args) {
				try {
					const uid = await findUid(link);
					msg += `${link} => ${uid}\n`;
				}
				catch (e) {
					msg += `${link} (ERROR) => ${e.message}\n`;
				}
			}
			message.reply(msg);
			return;
		}

		let msg = "";
		const { mentions } = event;
		for (const id in mentions)
			msg += `${mentions[id].replace("@", "")}: ${id}\n`;
		message.reply(msg || getLang("syntaxError"));
	}
};