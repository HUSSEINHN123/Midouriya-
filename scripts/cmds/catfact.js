const axios = require('axios');
const fs = require('fs');
const https = require('https');
const os = require('os'); // استيراد وحدة 'os'

// دالة لترجمة النص من الإنجليزية إلى العربية
const translateToArabic = async (text) => {
    try {
        const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`);
        const translation = translationResponse.data[0][0][0];
        return translation;
    } catch (error) {
        console.error("Error translating text:", error);
        return text; // في حالة حدوث خطأ، يتم إرجاع النص كما هو دون ترجمة
    }
};

module.exports = {
    config: {
        name: "قطط",
        version: "1.1",
        author: "Shikaki",
        countDown: 5,
        role: 0,
        shortDescription: {
            en: "احصل على حقيقة وصورة لقطة عشوائية."
        },
        longDescription: {
            en: "احصل على حقيقة عشوائية حول القطط مع صورة لقطة جميلة."
        },
        category: "متعة",
        guide: {
            en: "{pn} قطط"
        }
    },

    onStart: async function ({ message }) {
        try {
            // استرجاع حقيقة القطة العشوائية
            const factResponse = await axios.get('https://meowfacts.herokuapp.com/');
            const catFact = factResponse.data.data;

            // ترجمة حقيقة القطة إلى اللغة العربية
            const translatedCatFact = await translateToArabic(catFact);

            // استرجاع رابط صورة القطة العشوائية
            const imageResponse = await axios.get('https://api.thecatapi.com/v1/images/search');
            const catImageURL = imageResponse.data[0].url;

            // إنشاء رد بالحقيقة المترجمة وإرسال الصورة كمرفق
            message.reply({
                body: `🐱 **إليك حقيقة طريفة حول القطط:**\n\n${translatedCatFact}`,
                attachment: catImageURL
            });

        } catch (error) {
            console.error("Error fetching cat fact and image:", error);
            // Handle errors by sending an empty message
            message.reply("");
        }
    }
};
