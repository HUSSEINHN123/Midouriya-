const { drive, getStreamFromURL, getExtFromUrl, getTime } = global.utils;

module.exports = {
	config: {
		name: "ضبط_الترحيب",
		aliases: ["setwc"],
		version: "1.5",
		author: "NTKhang",
		countDown: 5,
		role: 1,
		shortDescription: {
			vi: "Chỉnh sửa nội dung tin nhắn chào mừng",
			en: "تعديل محتوى رسالة الترحيب"
		},
		longDescription: {
			vi: "Chỉnh sửa nội dung tin nhắn chào mừng thành viên mới tham gia vào nhóm chat của bạn",
			en: "قم بتعديل رسالة الترحيب مع صورة مرفقة معه أو فيديو أو صوت إلى مجموعتك الخاصة"
		},
		category: "النظام",
		guide: {
			vi: {
				body: "   {pn} text [<nội dung> | reset]: chỉnh sửa nội dung văn bản hoặc reset về mặc định, với những shortcut có sẵn:"
					+ "\n  + {userName}: tên của thành viên mới"
					+ "\n  + {userNameTag}: tên của thành viên mới (tag)"
					+ "\n  + {boxName}:  tên của nhóm chat"
					+ "\n  + {multiple}: bạn || các bạn"
					+ "\n  + {session}:  buổi trong ngày"
					+ "\n\n   Ví dụ:"
					+ "\n    {pn} text Hello {userName}, welcome to {boxName}, chúc {multiple} một ngày mới vui vẻ"
					+ "\n"
					+ "\n   Reply (phản hồi) hoặc gửi kèm một tin nhắn có file với nội dung {pn} file: để thêm tệp đính kèm vào tin nhắn chào mừng (ảnh, video, audio)"
					+ "\n\n   Ví dụ:"
					+ "\n    {pn} file reset: xóa gửi file",
				attachment: {
					[`${__dirname}/assets/guide/setwelcome/setwelcome_vi_1.png`]: "https://i.ibb.co/vd6bQrW/setwelcome-vi-1.png"
				}
			},
			en: {
				body: "   {pn} نص [<محتوى> | إعادة]: تعديل نص الترحيب أو إعادة بناءه ، مع إحترام الإسم :"
					+ "\n  + {userName} : إسم العضو الجديد"
					+ "\n  + {userNameTag}: إسم العضو الجديد  (منشن)"
					+ "\n  + {boxName}:  إسم المجموعة "
					+ "\n  + {multiple}: أنت || أنتم "
					+ "\n  + {session}:  إسم الأيام "
					+ "\n\n   مثال :"
					+ "\n    {pn} نص أهلا يا {userName}, مرحبا بك في {boxName}, أتمنى أن تحظى ب {multiple}"
					+ "\n"
					+ "\n   قم بالرد أو أرسل المرفق اللذي تريده أن يكون مرافقا لرسالة التحية {pn} ملف : من أجل أن تضيف مرفق مع رسالة الترحيب  (صورة , فيديو , صوت )"
					+ "\n\n   مثال :"
					+ "\n    {pn} ملف إستعادة : العودة إلى الرسالة وحدها بدون أي مرفق ",
				attachment: {
					[`${__dirname}/assets/guide/setwelcome/setwelcome_en_1.png`]: "https://i.ibb.co/vsCz0ks/setwelcome-en-1.png"
				}
			}
		}
	},

	langs: {
		vi: {
			turnedOn: "Đã bật chức năng chào mừng thành viên mới",
			turnedOff: "Đã tắt chức năng chào mừng thành viên mới",
			missingContent: "Vui lùng nhập nội dung tin nhắn",
			edited: "Đã chỉnh sửa nội dung tin nhắn chào mừng của nhóm bạn thành: %1",
			reseted: "Đã reset nội dung tin nhắn chào mừng",
			noFile: "Không có tệp đính kèm tin nhắn chào mừng nào để xóa",
			resetedFile: "Đã reset tệp đính kèm thành công",
			missingFile: "Hãy phản hồi tin nhắn này kèm file ảnh/video/audio",
			addedFile: "Đã thêm %1 tệp đính kèm vào tin nhắn chào mừng của nhóm bạn"
		},
		en: {
			turnedOn: " ✅ | تم تشغيل رسالة الترحيب",
			turnedOff: " ❎ | تم إيقاف رسالة الترحيب",
			missingContent: " ⚠️ | أرجوك قم بإدخال رسالة الترحيب",
			edited: " ✅ | تم تغيير رسالة الترحيب الخاصة بمجموعتكم إلى : %1",
			reseted: "⚙️ | تم إعادة تعيين رسالة الترحيب إلى الرسالة المعتادة",
			noFile: " ⚠️ | لا يوجد أي مرفق لحذفه",
			resetedFile: " تم إعادة تعيين المرفق إلى الوضع القديم بنحاح ✅",
			missingFile: " ⚠️ | أرجوك قم بالرد على مرفق (صورة أو صوت أو فيديو ) لإضافته إلى رسالة الترحيب الخاصة بمجموعتكم",
			addedFile: " ✅ | تم إضافة  %1 من المرفقات إلى رسالة الترحيب الخاصة بمجموعتكم بشكل تام "
		}
	},

	onStart: async function ({ args, threadsData, message, event, commandName, getLang }) {
		const { threadID, senderID, body } = event;
		const { data, settings } = await threadsData.get(threadID);

		switch (args[0]) {
			case "text": {
				if (!args[1])
					return message.reply(getLang("missingContent"));
				else if (args[1] == "reset")
					delete data.welcomeMessage;
				else
					data.welcomeMessage = body.slice(body.indexOf(args[0]) + args[0].length).trim();
				await threadsData.set(threadID, {
					data
				});
				message.reply(data.welcomeMessage ? getLang("edited", data.welcomeMessage) : getLang("reseted"));
				break;
			}
			case "مرفق": {
				if (args[1] == "إستعادة") {
					const { welcomeAttachment } = data;
					if (!welcomeAttachment)
						return message.reply(getLang("noFile"));
					try {
						await Promise.all(data.welcomeAttachment.map(fileId => drive.deleteFile(fileId)));
						delete data.welcomeAttachment;
					}
					catch (e) { }
					await threadsData.set(threadID, {
						data
					});
					message.reply(getLang("resetedFile"));
				}
				else if (event.attachments.length == 0 && (!event.messageReply || event.messageReply.attachments.length == 0))
					return message.reply(getLang("missingFile"), (err, info) => {
						global.GoatBot.onReply.set(info.messageID, {
							messageID: info.messageID,
							author: senderID,
							commandName
						});
					});
				else {
					saveChanges(message, event, threadID, senderID, threadsData, getLang);
				}
				break;
			}
      case "تشغيل":
			case "إيقاف": {
				settings.sendWelcomeMessage = args[0] == "تشغيل";
				await threadsData.set(threadID, { settings });
				message.reply(settings.sendWelcomeMessage ? getLang("turnedOn") : getLang("turnedOff"));
				break;
			}
			default:
				message.SyntaxError();
				break;
		}
	},

	onReply: async function ({ event, Reply, message, threadsData, getLang }) {
		const { threadID, senderID } = event;
		if (senderID != Reply.author)
			return;

		if (event.attachments.length == 0 && (!event.messageReply || event.messageReply.attachments.length == 0))
			return message.reply(getLang("missingFile"));
		saveChanges(message, event, threadID, senderID, threadsData, getLang);
	}
};

async function saveChanges(message, event, threadID, senderID, threadsData, getLang) {
	const { data } = await threadsData.get(threadID);
	const attachments = [...event.attachments, ...(event.messageReply?.attachments || [])].filter(item => ["photo", 'png', "animated_image", "video", "audio"].includes(item.type));
	if (!data.welcomeAttachment)
		data.welcomeAttachment = [];

	for (const attachment of attachments) {
		const { url } = attachment;
		const ext = getExtFromUrl(url);
		const fileName = `${getTime()}.${ext}`;
		const infoFile = await drive.uploadFile(`setwelcome_${threadID}_${senderID}_${fileName}`, await getStreamFromURL(url));
		data.welcomeAttachment.push(infoFile.id);
	}
	await threadsData.set(threadID, {
		data
	});
	message.reply(getLang("addedFile", attachments.length));
}
