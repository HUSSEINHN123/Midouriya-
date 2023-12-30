const { getStreamsFromAttachment } = global.utils;

module.exports = {
	config: {
		name: "إشعار",
		aliases: ["notify", "noti"],
		version: "1.6",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		shortDescription: {
			vi: "Gửi thông báo từ admin đến all box",
			en: "إرسال إشعار من المشرف للجميع في المجموعة"
		},
		longDescription: {
			en: "Gửi thông báo từ admin đến all box",
			en: "إرسال إشعار من المشرف للجميع من في المجموعة"
		},
		category: "المالك",
		guide: {
			en: "{pn} < الرسالة >"
		},
		envConfig: {
			delayPerGroup: 250
		}
	},

	langs: {
		vi: {
			missingMessage: "Vui lòng nhập tin nhắn bạn muốn gửi đến tất cả các nhóm",
			notification: "Thông báo từ admin bot đến tất cả nhóm chat (không phản hồi tin nhắn này)",
			sendingNotification: "Bắt đầu gửi thông báo từ admin bot đến %1 nhóm chat",
			sentNotification: "✅ Đã gửi thông báo đến %1 nhóm thành công",
			errorSendingNotification: "Có lỗi xảy ra khi gửi đến %1 nhóm:\n%2"
		},
		en: {
			missingMessage: " ⚠️ |الرجاء إدخال الرسالة التي تريد إرسالها إلى كافة المجموعات",
			notification: "\n~*⊹‏⊱≼━━━⌬〔 🔥 〕⌬━━━≽⊰⊹*~\n\t⛩️🔥 إشـٰـُ͢ـُٰـعـ๋͜‏ـۂاࢪ مـٰن اݪمـٰطُوُࢪ  🔥⛩️\n=====================\n⚠️(لا ترد على هذه الرسالة)⚠️\n~*⊹‏⊱≼━━━⌬〔 🔥 〕⌬━━━≽⊰⊹*~",
			sendingNotification: "ابدأ بإرسال إشعار من المشرف على البوت إلى %1 مجموعات",
			sentNotification: "✅ |تم إرسال الإشعار إلى %1 مجموعات بنجاح",
			errorSendingNotification: "حدث خطأ أثناء الإرسال إلى %1 مجموعات:\n%2"
		}
	},

	onStart: async function ({ message, api, event, args, commandName, envCommands, threadsData, getLang }) {
		const { delayPerGroup } = envCommands[commandName];
		if (!args[0])
			return message.reply(getLang("missingMessage"));
		const formSend = {
			body: `${getLang("notification")}\n────────────────\n${args.join(" ")}`,
			attachment: await getStreamsFromAttachment(
				[
					...event.attachments,
					...(event.messageReply?.attachments || [])
				].filter(item => ["photo", "png", "animated_image", "video", "audio"].includes(item.type))
			)
		};

		const allThreadID = (await threadsData.getAll()).filter(t => t.isGroup && t.members.find(m => m.userID == api.getCurrentUserID())?.inGroup);
		message.reply(getLang("sendingNotification", allThreadID.length));

		let sendSucces = 0;
		const sendError = [];
		const wattingSend = [];

		for (const thread of allThreadID) {
			const tid = thread.threadID;
			try {
				wattingSend.push({
					threadID: tid,
					pending: api.sendMessage(formSend, tid)
				});
				await new Promise(resolve => setTimeout(resolve, delayPerGroup));
			}
			catch (e) {
				sendError.push(tid);
			}
		}

		for (const sended of wattingSend) {
			try {
				await sended.pending;
				sendSucces++;
			}
			catch (e) {
				const { errorDescription } = e;
				if (!sendError.some(item => item.errorDescription == errorDescription))
					sendError.push({
						threadIDs: [sended.threadID],
						errorDescription
					});
				else
					sendError.find(item => item.errorDescription == errorDescription).threadIDs.push(sended.threadID);
			}
		}

		let msg = "";
		if (sendSucces > 0)
			msg += getLang("sentNotification", sendSucces) + "\n";
		if (sendError.length > 0)
			msg += getLang("errorSendingNotification", sendError.reduce((a, b) => a + b.threadIDs.length, 0), sendError.reduce((a, b) => a + `\n - ${b.errorDescription}\n  + ${b.threadIDs.join("\n  + ")}`, ""));
		message.reply(msg);
	}
};