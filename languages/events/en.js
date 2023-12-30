module.exports = {
	// You can customize the language here or directly in the command files
	autoUpdateThreadInfo: {},
	checkwarn: {
		text: {
			warn: " ⛔ |العضو %1 تم تحذيره ثلاثة مرات و قد تم حظره من المجموعة \n- الإسم: %1\n- الآيدي: %2\n- من أجل إلغاء الحظر, أرجوك إيتعمل \"%3مستخدم رفعذ_الحظر <آيدس>\" الأمر (مع الآيدي هو معرف الشخص الذي تريد إلغاء حظره)",
			needPermission: " ⚠️ |يحتاج البوت إلى إذن المسؤول لطرد الأعضاء المحظورين"
		}
	},
	leave: {
		text: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			leaveType1: "left the group",
			leaveType2: "was kicked from the group"
		}
	},
	logsbot: {
		text: {
			title: "====== Bot logs ======",
			added: "\n✅\nEvent: bot has been added to a new group\n- Added by: %1",
			kicked: "\n❌\nEvent: bot has been kicked\n- Kicked by: %1",
			footer: "\n- User ID: %1\n- Group: %2\n- Group ID: %3\n- Time: %4"
		}
	},
	onEvent: {},
	welcome: {
		text: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			welcomeMessage: "Thank you for inviting me to the group!\nBot prefix: %1\nTo view the list of commands, please enter: %1help",
			multiple1: "you",
			multiple2: "you guys"
		}
	}
};