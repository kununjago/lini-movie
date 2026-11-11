import { MediaItem, MovieDetails, TvDetails, TvSeasonDetails, AnimeItem } from '@/types';

export const MOCK_TRENDING_MOVIES: MediaItem[] = [
  {
    id: 693134,
    title: "Dune: Part Two",
    overview: "Paul Atreides bersatu dengan Chani dan Fremen untuk membalas dendam terhadap para konspirator yang menghancurkan keluarganya saat ia berusaha mencegah masa depan yang mengerikan.",
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s520frd.jpg",
    vote_average: 8.2,
    release_date: "2024-02-27",
    media_type: "movie",
    genres: [{ id: 878, name: "Sci-Fi" }, { id: 12, name: "Adventure" }],
    quality: "4K UHD",
  },
  {
    id: 533535,
    title: "Deadpool & Wolverine",
    overview: "Deadpool yang lesu mendapati segalanya dipertaruhkan ketika Time Variance Authority merekrutnya untuk sebuah misi berbahaya bersama Wolverine.",
    poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdrop_path: "/yDHYTfA3R0jFYba16jBB1jv8uaC.jpg",
    vote_average: 7.7,
    release_date: "2024-07-24",
    media_type: "movie",
    genres: [{ id: 28, name: "Action" }, { id: 35, name: "Comedy" }],
    quality: "HD",
  },
  {
    id: 1022789,
    title: "Inside Out 2",
    overview: "Riley memasuki masa remaja dengan emosi-emosi baru yang tak terduga mulai bermunculan di markas pusat pikirannya.",
    poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    backdrop_path: "/stKGOmPAneQ6kyjL95h16RMMw09.jpg",
    vote_average: 7.6,
    release_date: "2024-06-11",
    media_type: "movie",
    genres: [{ id: 16, name: "Animation" }, { id: 10751, name: "Family" }],
    quality: "4K UHD",
  },
  {
    id: 872585,
    title: "Oppenheimer",
    overview: "Kisah fisikawan Amerika J. Robert Oppenheimer, kepemimpinannya dalam Proyek Manhattan dan peran kuncinya dalam pengembangan bom atom.",
    poster_path: "/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
    backdrop_path: "/rLb2cw69Pazuxaj0sRXQ037tGI1.jpg",
    vote_average: 8.1,
    release_date: "2023-07-19",
    media_type: "movie",
    genres: [{ id: 18, name: "Drama" }, { id: 36, name: "History" }],
    quality: "4K UHD",
  },
  {
    id: 569094,
    title: "Spider-Man: Across the Spider-Verse",
    overview: "Miles Morales terlempar melintasi Multiverse, tempat dia bertemu dengan tim Spider-People yang bertugas melindungi keberadaannya.",
    poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop_path: "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    vote_average: 8.4,
    release_date: "2023-05-31",
    media_type: "movie",
    genres: [{ id: 16, name: "Animation" }, { id: 28, name: "Action" }],
    quality: "4K UHD",
  },
  {
    id: 157336,
    title: "Interstellar",
    overview: "Sekelompok penjelajah memanfaatkan lubang cacing yang baru ditemukan untuk melampaui batas perjalanan ruang angkasa manusia dan menaklukkan jarak luas dalam pelayaran antarbintang.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    vote_average: 8.4,
    release_date: "2014-11-05",
    media_type: "movie",
    genres: [{ id: 12, name: "Adventure" }, { id: 18, name: "Drama" }, { id: 878, name: "Sci-Fi" }],
    quality: "4K UHD",
  }
];

export const MOCK_TRENDING_TV: MediaItem[] = [
  {
    id: 94605,
    title: "Arcane",
    overview: "Di tengah pertikaian antara kota utopia Piltover dan kota bawah tanah Zaun yang tertindas, dua saudari bertarung di sisi yang berlawanan dalam perang antara teknologi sihir dan keyakinan.",
    poster_path: "/fqldf2t8ztc9aiwn397rDit3uaG.jpg",
    backdrop_path: "/h9YlR2CrFd8b0TgRQIY6BpBEcjq.jpg",
    vote_average: 8.7,
    first_air_date: "2021-11-06",
    media_type: "tv",
    genres: [{ id: 16, name: "Animation" }, { id: 10765, name: "Sci-Fi & Fantasy" }],
    quality: "4K UHD",
  },
  {
    id: 100088,
    title: "The Last of Us",
    overview: "Dua puluh tahun setelah peradaban modern hancur, Joel disewa untuk menyelundupkan Ellie, seorang gadis berusia 14 tahun, keluar dari zona karantina yang menindas.",
    poster_path: "/uKvVjHNqB5VmOrdxqAt2V7JMrRI.jpg",
    backdrop_path: "/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
    vote_average: 8.6,
    first_air_date: "2023-01-15",
    media_type: "tv",
    genres: [{ id: 18, name: "Drama" }, { id: 10765, name: "Sci-Fi & Fantasy" }],
    quality: "4K UHD",
  },
  {
    id: 66732,
    title: "Stranger Things",
    overview: "Ketika seorang anak laki-laki menghilang, sebuah kota kecil mengungkap misteri yang melibatkan eksperimen rahasia, kekuatan supernatural yang menakutkan, dan seorang gadis kecil yang aneh.",
    poster_path: "/49WJfeN0moxb9IPfGn8AIqMGIRD.jpg",
    backdrop_path: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    vote_average: 8.6,
    first_air_date: "2016-07-15",
    media_type: "tv",
    genres: [{ id: 10765, name: "Sci-Fi & Fantasy" }, { id: 9648, name: "Mystery" }],
    quality: "4K UHD",
  },
  {
    id: 106379,
    title: "Fallout",
    overview: "Di masa depan pasca-apokaliptik Los Angeles, para penduduk harus meninggalkan bunker bawah tanah mereka dan kembali ke lanskap tandus yang penuh bahaya di atas tanah.",
    poster_path: "/AnsSKR9LuK0T9bA0PFiC09vgWz.jpg",
    backdrop_path: "/2rmK7mnchw9Xr3XdiTFSxTT0Yqi.jpg",
    vote_average: 8.3,
    first_air_date: "2024-04-10",
    media_type: "tv",
    genres: [{ id: 10765, name: "Sci-Fi & Fantasy" }, { id: 28, name: "Action" }],
    quality: "4K UHD",
  },
  {
    id: 1396,
    title: "Breaking Bad",
    overview: "Walter White, seorang guru kimia sekolah menengah yang didiagnosis menderita kanker paru-paru stadium akhir, beralih ke pembuatan metamfetamin bersama mantan muridnya demi menjamin masa depan finansial keluarganya.",
    poster_path: "/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    backdrop_path: "/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    vote_average: 8.9,
    first_air_date: "2008-01-20",
    media_type: "tv",
    genres: [{ id: 18, name: "Drama" }, { id: 80, name: "Crime" }],
    quality: "HD",
  }
];

export const MOCK_ANIME_LIST: MediaItem[] = [
  {
    id: 52991, // Frieren
    title: "Sousou no Frieren (Frieren: Beyond Journey's End)",
    overview: "Setelah mengalahkan Raja Iblis bersama kelompok pahlawan, penyihir elf Frieren memulai perjalanan baru untuk memahami emosi manusia dan arti ikatan persahabatan sejati.",
    poster_path: "https://cdn.myanimelist.net/images/anime/1015/138075l.jpg",
    backdrop_path: "https://cdn.myanimelist.net/images/anime/1015/138075l.jpg",
    vote_average: 9.3,
    release_date: "2023-09-29",
    media_type: "anime",
    genres: [{ id: 1, name: "Adventure" }, { id: 2, name: "Fantasy" }],
    quality: "HD",
  },
  {
    id: 40748, // Jujutsu Kaisen S2
    title: "Jujutsu Kaisen Season 2",
    overview: "Masa lalu Satoru Gojo dan Suguru Geto saat misi mengawal Star Plasma Vessel, dilanjutkan dengan insiden kelam Shibuya yang mengubah dunia sihir selamanya.",
    poster_path: "https://cdn.myanimelist.net/images/anime/1792/138022l.jpg",
    backdrop_path: "https://cdn.myanimelist.net/images/anime/1792/138022l.jpg",
    vote_average: 8.8,
    release_date: "2023-07-06",
    media_type: "anime",
    genres: [{ id: 1, name: "Action" }, { id: 2, name: "Fantasy" }],
    quality: "HD",
  },
  {
    id: 52299, // Solo Leveling
    title: "Solo Leveling (Ore dake Level Up na Ken)",
    overview: "Sung Jin-woo, pemburu terlemah peringkat E, secara ajaib terpilih oleh 'System' misterius dan mendapatkan kemampuan langka untuk menaikkan level kekuatannya tanpa batas.",
    poster_path: "https://cdn.myanimelist.net/images/anime/1911/141097l.jpg",
    backdrop_path: "https://cdn.myanimelist.net/images/anime/1911/141097l.jpg",
    vote_average: 8.5,
    release_date: "2024-01-07",
    media_type: "anime",
    genres: [{ id: 1, name: "Action" }, { id: 2, name: "Fantasy" }],
    quality: "HD",
  },
  {
    id: 16498, // Shingeki no Kyojin
    title: "Attack on Titan (Shingeki no Kyojin)",
    overview: "Eren Yeager bersumpah membersihkan dunia dari raksasa humanoid pemakan manusia (Titan) setelah kampung halamannya dihancurkan dan ibunya terbunuh.",
    poster_path: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
    backdrop_path: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
    vote_average: 8.9,
    release_date: "2013-04-07",
    media_type: "anime",
    genres: [{ id: 1, name: "Action" }, { id: 2, name: "Suspense" }],
    quality: "HD",
  },
  {
    id: 38000, // Kimetsu no Yaiba
    title: "Demon Slayer: Kimetsu no Yaiba",
    overview: "Tanjiro Kamado bergabung dengan Korps Pembasmi Iblis demi menyembuhkan adik perempuannya Nezuko yang berubah menjadi iblis dan membalaskan dendam keluarganya.",
    poster_path: "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
    backdrop_path: "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
    vote_average: 8.5,
    release_date: "2019-04-06",
    media_type: "anime",
    genres: [{ id: 1, name: "Action" }, { id: 2, name: "Fantasy" }],
    quality: "HD",
  }
];

export const MOCK_MOVIE_DETAILS: Record<number, MovieDetails> = {
  693134: {
    id: 693134,
    title: "Dune: Part Two",
    overview: "Paul Atreides bersatu dengan Chani dan Fremen untuk membalas dendam terhadap para konspirator yang menghancurkan keluarganya. Menghadapi pilihan antara cinta dalam hidupnya dan nasib alam semesta, ia berusaha mencegah masa depan mengerikan yang hanya ia yang bisa meramalkannya.",
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s520frd.jpg",
    vote_average: 8.2,
    release_date: "2024-02-27",
    runtime: 166,
    tagline: "Long live the fighters.",
    status: "Released",
    genres: [
      { id: 878, name: "Science Fiction" },
      { id: 12, name: "Adventure" }
    ],
    videos: {
      results: [
        {
          id: "65b93b2184448e01844ca843",
          key: "Way9Dexny3w",
          name: "Official Trailer 3",
          site: "YouTube",
          type: "Trailer"
        }
      ]
    },
    images: {
      backdrops: [
        { file_path: "/xOMo8BRK7PfcJv9JCnx7s520frd.jpg" },
        { file_path: "/j3Z3XktmWB1VhsSazTHYk2ioGq7.jpg" },
        { file_path: "/lzWHmYZrUQNs6mp8n35V4fFmG8P.jpg" }
      ],
      posters: [
        { file_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg" }
      ]
    },
    credits: {
      cast: [
        { id: 1190668, name: "Timothée Chalamet", character: "Paul Atreides", profile_path: "/BE2sdjpgsa2rNTFa66f7upkaOP.jpg" },
        { id: 505710, name: "Zendaya", character: "Chani", profile_path: "/tybc7w73p7c0mUvdqT76a91vGhy.jpg" },
        { id: 938, name: "Rebecca Ferguson", character: "Lady Jessica", profile_path: "/lJloTOheuQSirSLXNA3JHsrMNfH.jpg" },
        { id: 224513, name: "Austin Butler", character: "Feyd-Rautha", profile_path: "/2q0H5s5fW1Gk8Hj4KjL7N0D8q7s.jpg" }
      ]
    }
  }
};

export const MOCK_TV_DETAILS: Record<number, TvDetails> = {
  94605: {
    id: 94605,
    name: "Arcane",
    overview: "Di tengah pertikaian antara kota utopia Piltover dan kota bawah tanah Zaun yang tertindas, dua saudari bertarung di sisi yang berlawanan dalam perang antara teknologi sihir dan keyakinan.",
    poster_path: "/fqldf2t8ztc9aiwn397rDit3uaG.jpg",
    backdrop_path: "/h9YlR2CrFd8b0TgRQIY6BpBEcjq.jpg",
    vote_average: 8.7,
    first_air_date: "2021-11-06",
    episode_run_time: [42],
    number_of_seasons: 2,
    number_of_episodes: 18,
    seasons: [
      {
        id: 134187,
        name: "Season 1",
        overview: "Kisah asal usul dua juara legendaris League of Legends dan kekuatan yang memecah belah mereka.",
        season_number: 1,
        episode_count: 9,
        poster_path: "/fqldf2t8ztc9aiwn397rDit3uaG.jpg"
      },
      {
        id: 313177,
        name: "Season 2",
        overview: "Kelanjutan perang terbuka antara Zaun dan Piltover yang menuntut pengorbanan tertinggi.",
        season_number: 2,
        episode_count: 9,
        poster_path: "/abfBhftg944Q1nJd3bM1G8h0Lw4.jpg"
      }
    ],
    genres: [
      { id: 16, name: "Animation" },
      { id: 10765, name: "Sci-Fi & Fantasy" },
      { id: 28, name: "Action" }
    ],
    tagline: "Every secret has a price.",
    status: "Returning Series",
    videos: {
      results: [
        {
          id: "614ee072384533008f5d023b",
          key: "fXmAurh012s",
          name: "Official Trailer",
          site: "YouTube",
          type: "Trailer"
        }
      ]
    },
    images: {
      backdrops: [
        { file_path: "/h9YlR2CrFd8b0TgRQIY6BpBEcjq.jpg" },
        { file_path: "/m3FhK8BwEeV915D7N5hM2H3v9xT.jpg" }
      ],
      posters: [
        { file_path: "/fqldf2t8ztc9aiwn397rDit3uaG.jpg" }
      ]
    }
  }
};

export const MOCK_TV_SEASON: Record<string, TvSeasonDetails> = {
  "94605-1": {
    id: 134187,
    name: "Season 1",
    overview: "Awal mula perseteruan Zaun dan Piltover.",
    season_number: 1,
    poster_path: "/fqldf2t8ztc9aiwn397rDit3uaG.jpg",
    episodes: [
      {
        id: 3088037,
        name: "Welcome to the Playground",
        overview: "Vi dan Powder memimpin kelompok pencuri muda menyusup ke laboratorium di Piltover atas saran tetangga.",
        episode_number: 1,
        season_number: 1,
        air_date: "2021-11-06",
        still_path: "/r1aFzH6xL7zL7vCqgY4jK6vXw8c.jpg",
        vote_average: 8.6
      },
      {
        id: 3266224,
        name: "Some Mysteries Are Better Left Unsolved",
        overview: "Akademi bersitegang terkait teknologi Hextech terlarang ciptaan Jayce, sementara Zaun semakin bergejolak.",
        episode_number: 2,
        season_number: 1,
        air_date: "2021-11-06",
        still_path: "/q0B4dZ7F2K7t1wE8b6xN3v4jX5a.jpg",
        vote_average: 8.8
      },
      {
        id: 3266225,
        name: "The Base Violence Necessary for Change",
        overview: "Silco melancarkan serangan mematikan, dan Vander terpaksa membuat pilihan terakhir demi anak-anaknya.",
        episode_number: 3,
        season_number: 1,
        air_date: "2021-11-06",
        still_path: "/v9N2xT4l8B7M5wQ1c0zX9d4gH2k.jpg",
        vote_average: 9.4
      },
      {
        id: 3266226,
        name: "Happy Progress Day!",
        overview: "Beberapa tahun setelah tragedi, Piltover merayakan hari kemajuan sementara Jinx memulai teror barunya.",
        episode_number: 4,
        season_number: 1,
        air_date: "2021-11-13",
        still_path: "/m6N3bV7K9p1xZ2wE5r8t0Y4uI3l.jpg",
        vote_average: 8.7
      },
      {
        id: 3266227,
        name: "Everybody Wants to Be My Enemy",
        overview: "Caitlyn merekrut Vi dari penjara untuk menyelidiki pergerakan misterius Silco di kota bawah tanah.",
        episode_number: 5,
        season_number: 1,
        air_date: "2021-11-13",
        still_path: "/w5R8uI1oP4lK9jH2gF6d3sA7zX0.jpg",
        vote_average: 8.9
      },
      {
        id: 3266228,
        name: "When These Walls Come Tumbling Down",
        overview: "Vi dan Jinx akhirnya bertatap muka setelah bertahun-tahun terpisah, namun masa lalu tak mudah dilupakan.",
        episode_number: 6,
        season_number: 1,
        air_date: "2021-11-13",
        still_path: "/k7J9hG5fD3sA1zX8c0vB2nM4lK6.jpg",
        vote_average: 9.2
      }
    ]
  }
};

export const MOCK_ANIME_DETAILS: Record<number, AnimeItem> = {
  52991: {
    mal_id: 52991,
    title: "Sousou no Frieren",
    title_english: "Frieren: Beyond Journey's End",
    title_japanese: "葬送のフリーレン",
    synopsis: "Raja Iblis telah dikalahkan, dan kelompok pahlawan yang menang bubar setelah membawa kedamaian bagi dunia. Frieren, seorang elf penyihir yang berumur ribuan tahun, menyaksikan rekan-rekannya menua dan meninggal. Menyadari keterbatasan waktu hidup manusia, ia memulai perjalanan ke utara untuk menghargai momen dan kenangan bersama mereka.",
    score: 9.32,
    episodes: 28,
    year: 2023,
    duration: "24 min per ep",
    rating: "PG-13 - Teens 13 or older",
    genres: [
      { mal_id: 1, name: "Adventure" },
      { mal_id: 2, name: "Fantasy" },
      { mal_id: 8, name: "Drama" }
    ],
    images: {
      webp: {
        image_url: "https://cdn.myanimelist.net/images/anime/1015/138075.webp",
        large_image_url: "https://cdn.myanimelist.net/images/anime/1015/138075l.webp"
      }
    },
    trailer: {
      youtube_id: "ZEkwCGJ3o6M",
      url: "https://www.youtube.com/watch?v=ZEkwCGJ3o6M",
      embed_url: "https://www.youtube.com/embed/ZEkwCGJ3o6M?enablejsapi=1&wmode=opaque&autoplay=1"
    }
  },
  40748: {
    mal_id: 40748,
    title: "Jujutsu Kaisen Season 2",
    title_english: "Jujutsu Kaisen Season 2",
    title_japanese: "呪術廻戦 懐玉・玉折／渋谷事変",
    synopsis: "Musim kedua mencakup busur Kaigyoku/Gyokusetsu yang berfokus pada masa SMA Satoru Gojo dan Suguru Geto di Tokyo Jujutsu High, serta busur Shibuya Incident yang penuh dengan pertempuran dahsyat para penyihir melawan kutukan tingkat khusus.",
    score: 8.82,
    episodes: 23,
    year: 2023,
    duration: "23 min per ep",
    rating: "R - 17+ (violence & profanity)",
    genres: [
      { mal_id: 1, name: "Action" },
      { mal_id: 2, name: "Fantasy" }
    ],
    images: {
      webp: {
        image_url: "https://cdn.myanimelist.net/images/anime/1792/138022.webp",
        large_image_url: "https://cdn.myanimelist.net/images/anime/1792/138022l.webp"
      }
    },
    trailer: {
      youtube_id: "O6qVieflwQs",
      url: "https://www.youtube.com/watch?v=O6qVieflwQs",
      embed_url: "https://www.youtube.com/embed/O6qVieflwQs?enablejsapi=1&wmode=opaque&autoplay=1"
    }
  }
};
