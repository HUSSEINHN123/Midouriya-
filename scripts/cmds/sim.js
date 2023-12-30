const axios = require("axios");
module.exports = {
	config: {
		name: 'ميدوريا',
		version: '1.2',
		author: 'KENLIEPLAYS',
		countDown: 0,
		role: 0,
		shortDescription: 'قم بالدردشة مع ميدوريا',
		longDescription: {
			en: 'قم بالدردشة مع ميدوريا'
		},
		category: 'دردشة',
		guide: {
			en: '   {pn} <كلامك>: دردشة مع ميدوريا'
				+ '\n   Example:{pn} أهلا'
		}
	},

	langs: {
		en: {
			chatting: 'أنت بالفعل تدردش مع ميدوريا...',
			error: 'آسف أخي لكن يبدو أن هناك خطأ حاول لاحقا'
		}
	},

	onStart: async function ({ args, message, event, getLang }) {
		if (args[0]) {
			const yourMessage = args.join(" ");
			try {
				const responseMessage = await getMessage(yourMessage);
				return message.reply(`${responseMessage}`);
			}
			catch (err) {
				console.log(err)
				return message.reply(getLang("error"));
			}
		}
	},

	onChat: async ({ args, message, threadsData, event, isUserCallCommand, getLang }) => {
		if (!isUserCallCommand) {
			return;
		}
		if (args.length > 1) {
			try {
				const langCode = await threadsData.get(event.threadID, "settings.lang") || global.GoatBot.config.language;
				const responseMessage = await getMessage(args.join(" "), langCode);
				return message.reply(`${responseMessage}`);
			}
			catch (err) {
				return message.reply(getLang("error"));
			}
		}
	}
};

async function getMessage(yourMessage, langCode) {
	try {
		const res = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=ar&message=${yourMessage}&filter=false`);
		if (!res.data.success) {
			throw new Error('أعادت واجهة برمجة التطبيقات (API) رسالة غير ناجحة');
		}
		return res.data.success;
	} catch (err) {
		console.error('حدث خطأ أثناء استلام الرسالة:', err);
		throw err;
	}
}