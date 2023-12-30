const axios = require("axios");

module.exports = {
	config: {
		name: "ڤيديو_فيسبوك",
		version: "1.3",
		author: "NTKhang & Mohammad Alamin",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Tải video từ facebook",
			en: "تحميل فيديو من الفيس بوك"
		},
		longDescription: {
			vi: "Tải video/story từ facebook (công khai)",
			en: "تنزيل الفيديو/القصة من الفيسبوك (عام)"
		},
		category: "وسائط",
		guide: {
			vi: "   {pn} <url video/story>: tải video từ facebook",
			en: "   {pn} <رابط الفيديو/القصة>: تحميل فيديو من الفيس بوك"
		}
	},

	langs: {
		vi: {
			missingUrl: "Vui lòng nhập url video/story facebook (công khai) bạn muốn tải về",
			error: "Đã xảy ra lỗi khi tải video",
			downloading: "Đang tiến hành tải video cho bạn",
			tooLarge: "Rất tiếc không thể tải video cho bạn vì dung lượng lớn hơn 83MB"
		},
		en: {
			missingUrl: "الرجاء إدخال عنوان.الرابط للفيديو/القصة (العامة) على فيسبوك الذي تريد تنزيله",
			error: "حدث خطأ أثناء تنزيل الفيديو",
			downloading: "جاري تنزيل الفيديو من أجلك",
			tooLarge: "نأسف، لا يمكننا تنزيل الفيديو لك لأن الحجم أكبر من 83ميغابايت"
		}
	},

	onStart: async function ({ args, message, getLang }) {
		if (!args[0]) {
			return message.reply(getLang("missingUrl"));
		}

		let msgSend = null;
		try {
			const response = await axios.get(`https://toxinum.xyz/api/v1/videofb?url=${args[0]}`);

			if (response.data.success === false) {
				return message.reply(getLang("error"));
			}

			msgSend = message.reply(getLang("downloading"));

			const stream = await global.utils.getStreamFromURL(response.data.url2); //url2 is for high quality videos & url1 is for low quality videos
			await message.reply({ attachment: stream });

			message.unsend((await msgSend).messageID);
		}
		catch (e) {
			message.unsend((await msgSend).messageID);
			return message.reply(getLang("tooLarge"));
		}
	}
};
