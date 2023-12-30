module.exports = {
  config: {
    name: "متعة",
    aliases: [],
    version: "1.0",
    author: "HUSSEIN",
    countDown: 20,
    role: 0,
    shortDescription: "",
    longDescription: "سيقوم البوت بإرسال إليك شخصيات مقاطع من لعبة موبايل ليجيند لو كانو في الحقيقة",
    category: "متعة",
    guide: "{pn}",
  },

  sentVideos: [],

  onStart: async function ({ api, event, message }) {
    const senderID = event.senderID;

    const loadingMessage = await message.reply({
      body: " ⏱️ | جاري تحميل فيديو من لعبة موبايل ليجيند المرجو الإنتظار ...✅",
    });

    const link = [
          "https://drive.google.com/uc?export=download&id=14JqykUO4UGQo0BJYT-TTifgANAEnIVnG",// video credits lyrics edit vibe (fb group)
      "https://drive.google.com/uc?export=download&id=14HE5kwdiZYw7JuNYVQzhP-fBsnuuTUML",
      "https://drive.google.com/uc?export=download&id=14G-GfIQuUwpKFsnQ2kfr-tRYVd6jalpq",
      "https://drive.google.com/uc?export=download&id=14KCdPcHcBWSDH4h_BRNbs4mLnzvOPEIE",
      "https://drive.google.com/uc?export=download&id=14Nw8bG1xzPJaQ1iIc2LUeHps_mpQdNf7",
      "https://drive.google.com/uc?export=download&id=14KhPeAeQEqiQ8OFwrAxl5o_McC_5hwpC",
      "https://drive.google.com/uc?export=download&id=14NxVgx3M_GkP6Q2qmTvohCaPfOZaAWby",
      "https://drive.google.com/uc?export=download&id=14Mts-9om9K5BUSM-ZeABLqa9DbDDj1xl",
      "https://drive.google.com/uc?export=download&id=14POL7XrKBj7DAej03TWcka5hN6jSpOQW",
      "https://drive.google.com/uc?export=download&id=14Say46D5VqfhsM-9dsnGnKGXnlJbwtdH",
      "https://drive.google.com/uc?export=download&id=14Q9zDmNOAkZcJg-FAag8CvNGSvgPikwS",
      "https://drive.google.com/uc?export=download&id=14PtNpzTAvtQpz24nsDLJ8-ATBYU_MYLp",
      "https://drive.google.com/uc?export=download&id=14UQYEazzN-lx5u5himMiNJaZbWjk0oJD",
      "https://drive.google.com/uc?export=download&id=14VdvA_tqHFTi48sp8NTVPVAbABwg9-dn",
      "https://drive.google.com/uc?export=download&id=14ZZ4grH1b6oiR7hXlN-bLfOT_dpg5Uob",
      "https://drive.google.com/uc?export=download&id=14cSYUAoNPLZNzdH4pBcWwLiMcUut7qjN",
      "https://drive.google.com/uc?export=download&id=14Xvmyu3ofWirtShZePsS0DSi8CpW6LuM",
      "https://drive.google.com/uc?export=download&id=14n--Jqs4s63-6itedmJoCgtrN4kALhNA",
      "https://drive.google.com/uc?export=download&id=14qqNuKuTCnOHjgZt-hKml5LdW5x4xzm6",
      "https://drive.google.com/uc?export=download&id=14s2JkeYQjxuO82Q2rylw1IdSXNJMkO32",
      "https://drive.google.com/uc?export=download&id=14t9Jo8pv9_vuF7HAR380BX1yBZSmiwYs",
      "https://drive.google.com/uc?export=download&id=15-R7KwfimZi3ZGAGoD5BtOOlTMG1-fUe",
      "https://drive.google.com/uc?export=download&id=152WZB5GC6AeQ7R_9pRPRwt6J2iFv2u1P",
      "https://drive.google.com/uc?export=download&id=152kgyN8gj_1Cz4b9YLOkldwpYjF8WOO1",
      "https://drive.google.com/uc?export=download&id=15F_pYreJwToBPNw3uyzCDeAvwqXKlJdI",
      "https://drive.google.com/uc?export=download&id=155u2n994Hey-z7RqQUmwZw4B-KETmJHu",
      "https://drive.google.com/uc?export=download&id=15JXuBJjr1zVwFg2SlUq8TJIyv3X99a1B",
      "https://drive.google.com/uc?export=download&id=15Jp39BTmIG4Yu61seF7ehJf5c4lddZA0",
      "https://drive.google.com/uc?export=download&id=157cQkr_fVqC3ykj4vrKMEKw585XrysUO",
      "https://drive.google.com/uc?export=download&id=15O-DIvN9aXucwZ8ZgMLmNAeGj1evcByG",
      "https://drive.google.com/uc?export=download&id=15N2E5LK9IvNgt1f0TORM8cO2O3GnBr1S",
      "https://drive.google.com/uc?export=download&id=15PUzLdmPCQukBqt9uHSw6ShWzRT5CYlD",
//      "", Add more video links here
    ];

    const availableVideos = link.filter(video => !this.sentVideos.includes(video));

    if (availableVideos.length === 0) {
      this.sentVideos = [];
    }

    const randomIndex = Math.floor(Math.random() * availableVideos.length);
    const randomVideo = availableVideos[randomIndex];

    this.sentVideos.push(randomVideo);

    if (senderID !== null) {
      message.reply({
        body: 'إستمتع بالفيديو 😁 !',
        attachment: await global.utils.getStreamFromURL(randomVideo),
      });

      setTimeout(() => {
        api.unsendMessage(loadingMessage.messageID);
      }, 10000);
    }
  },
};