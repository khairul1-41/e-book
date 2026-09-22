import {
  EBookProduct,
  Category,
  SpecialOffer,
  Coupon,
  Review,
  FebspotVideo,
  AdsterraConfig,
  SiteSettings,
  UserProfile,
  Order
} from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-freelancing',
    name: 'Freelancing & Career',
    banglaName: 'ফ্রিল্যান্সিং ও ক্যারিয়ার',
    slug: 'freelancing',
    description: 'Master digital skills, client acquisition, Fiverr, Upwork and remote work strategies.',
    iconName: 'Laptop',
    order: 1,
    isActive: true,
    productCount: 4
  },
  {
    id: 'cat-self-development',
    name: 'Self Development',
    banglaName: 'আত্মউন্নয়ন ও অনুপ্রেরণা',
    slug: 'self-development',
    description: 'Transform mindset, habits, productivity, and leadership capabilities.',
    iconName: 'TrendingUp',
    order: 2,
    isActive: true,
    productCount: 4
  },
  {
    id: 'cat-technology',
    name: 'Technology & Programming',
    banglaName: 'প্রযুক্তি ও প্রোগ্রামিং',
    slug: 'technology',
    description: 'Web development, Python, AI prompts, cyber security, and software fundamentals.',
    iconName: 'Code',
    order: 3,
    isActive: true,
    productCount: 3
  },
  {
    id: 'cat-business',
    name: 'Business & Startup',
    banglaName: 'ব্যবসা ও উদ্যোক্তা',
    slug: 'business',
    description: 'E-commerce scaling, digital marketing, sales funnels, and brand building.',
    iconName: 'Briefcase',
    order: 4,
    isActive: true,
    productCount: 3
  },
  {
    id: 'cat-fiction',
    name: 'Fiction & Literature',
    banglaName: 'উপন্যাস ও গল্প',
    slug: 'fiction',
    description: 'Captivating mystery thrillers, romantic fiction, and acclaimed Bengali literature.',
    iconName: 'BookOpen',
    order: 5,
    isActive: true,
    productCount: 3
  },
  {
    id: 'cat-islamic',
    name: 'Islamic & Spiritual',
    banglaName: 'ইসলামিক ও আত্মশুদ্ধি',
    slug: 'islamic',
    description: 'Heart-touching reminders, life of prophets, and peaceful spiritual guidance.',
    iconName: 'Compass',
    order: 6,
    isActive: true,
    productCount: 3
  },
  {
    id: 'cat-education',
    name: 'Academic & Education',
    banglaName: 'শিক্ষা ও দক্ষতা',
    slug: 'education',
    description: 'IELTS preparation, spoken English mastery, and academic test hacks.',
    iconName: 'GraduationCap',
    order: 7,
    isActive: true,
    productCount: 2
  }
];

export const INITIAL_PRODUCTS: EBookProduct[] = [
  {
    id: 'prod-freelance-mastery',
    title: 'জিরো থেকে ফ্রিল্যান্সিং ক্যারিয়ার (Freelancing Mastery)',
    author: 'তানভীর আহমেদ',
    category: 'Freelancing & Career',
    subCategory: 'Client Acquisition',
    shortDescription: 'প্রথম মাসে ফাইভারে প্রথম কাজ পাওয়ার পরীক্ষিত রোডম্যাপ ও ক্লায়েন্ট কমিউনিকেশন গাইড।',
    description: 'এই ই-বুকটিতে ফ্রিল্যান্সিং-এর আদ্যোপান্ত বিস্তারিত আলোচনা করা হয়েছে। কীভাবে আপনার স্কিল বাছাই করবেন, Fiverr ও Upwork-এ 100% অপ্টিমাইজড প্রোফাইল তৈরি করবেন, প্রপোজাল রাইটিং এবং আন্তর্জাতিক ক্লায়েন্টদের থেকে নিয়মিত অর্ডার পাবেন—সব বাস্তব অভিজ্ঞতার আলোকে তুলে ধরা হয়েছে। সাথে পাচ্ছেন রেডি-টু-ইউজ প্রপোজাল টেমপ্লেট!',
    price: 650,
    discountPrice: 350,
    discountPercentage: 46,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    previewImages: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80'
    ],
    sampleChapters: [
      {
        title: 'অধ্যায় ১: মানসিক প্রস্তুতি ও সঠিক স্কিল নির্বাচন',
        content: 'ফ্রিল্যান্সিং কোনো শর্টকাট নয়, এটি একটি পূর্ণাঙ্গ ক্যারিয়ার। কাজ শেখার আগে আপনার ধৈর্য ও সময় নির্ধারণ করা জরুরি। বাজারে গ্রাফিক্স ডিজাইন, ওয়েব ডেভেলপমেন্ট, ডিজিটাল মার্কেটিং ও কন্টেন্ট রাইটিং-এর তুমুল চাহিদা রয়েছে...'
      },
      {
        title: 'অধ্যায় ২: প্রপোজাল লেখার গোপন সূত্র',
        content: 'ক্লায়েন্ট আপনার দীর্ঘ আত্মজীবনী পড়তে আসে না। সে জানতে চায়: আপনি কি তার সমস্যা বুঝতে পেরেছেন? কত দ্রুত ও নির্ভুলভাবে আপনি সমাধান দেবেন? প্রপোজালে প্রথম ২ লাইনেই সমাধান পয়েন্ট তুলে ধরুন...'
      }
    ],
    fileFormat: 'PDF',
    fileSize: '14.2 MB',
    pages: 210,
    publisher: 'Drem Digital Press',
    publicationDate: '2026-02-15',
    language: 'বাংলা',
    isbn: '978-984-5120-11-2',
    tags: ['freelancing', 'fiverr', 'upwork', 'career', 'remote work'],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isSpecialOffer: true,
    visibility: 'published',
    stockStatus: 'available',
    salesCount: 428,
    rating: 4.9,
    reviewCount: 64,
    febspotVideoUrl: 'https://www.febspot.com/video/1029384',
    febspotVideoTitle: 'ফ্রিল্যান্সিং মাস্টারি ই-বুকের লাইভ রিভিউ ও বিস্তারিত সূচিপত্র',
    seoTitle: 'জিরো থেকে ফ্রিল্যান্সিং ক্যারিয়ার ই-বুক — Drem Shop',
    seoDescription: 'ঘরে বসে অনলাইন আয়ের সেরা কমপ্লিট ই-বুক। ফ্রিল্যান্সিং গাইডলাইন ও প্রপোজাল হ্যাকস।',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-09-01T12:00:00Z'
  },
  {
    id: 'prod-atomic-habits-bn',
    title: 'মাইন্ডসেট রিপ্রোগ্রামিং: অভ্যাসের অবিশ্বাস্য ক্ষমতা',
    author: 'রাশেদ খান চৌধুরী',
    category: 'Self Development',
    subCategory: 'Mindset',
    shortDescription: 'দৈনন্দিন ক্ষুদ্র ইতিবাচক অভ্যাস কীভাবে আপনার জীবন ও ক্যারিয়ারে অভাবনীয় রূপান্তর আনবে।',
    description: 'জীবনের সফলতা বড় কোনো আকস্মিক সিদ্ধান্তের ওপর নয়, বরং প্রতিদিনের ছোট্ট অভ্যাসের সুফল। এই বইটিতে বৈজ্ঞানিক গবেষণার ভিত্তিতে দেখানো হয়েছে কীভাবে অলসতা কাটিয়ে প্রতিদিন লক্ষ্য অর্জনে একাগ্র থাকা যায়। এতে রয়েছে প্রোডাক্টিভিটি প্ল্যানার এবং হ্যাবিট ট্র্যাকার চার্ট।',
    price: 550,
    discountPrice: 290,
    discountPercentage: 47,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    sampleChapters: [
      {
        title: 'সূচনা: ১% উন্নতির কম্পাউন্ডিং ম্যাজিক',
        content: 'আপনি যদি প্রতিদিন আগের দিনের চেয়ে মাত্র ১ শতাংশ ভালো কাজ করেন, এক বছর পর আপনি ৩৬ গুণ বেশি সফল হবেন! একে বলা হয় ক্ষুদ্র পরিবর্তনের পরাক্রম...'
      }
    ],
    fileFormat: 'PDF',
    fileSize: '9.8 MB',
    pages: 185,
    publisher: 'ইনোভেশন বুকস',
    publicationDate: '2026-03-01',
    language: 'বাংলা',
    isbn: '978-984-8840-02-1',
    tags: ['habits', 'productivity', 'motivation', 'mindset'],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    isSpecialOffer: true,
    visibility: 'published',
    stockStatus: 'available',
    salesCount: 682,
    rating: 5.0,
    reviewCount: 92,
    febspotVideoUrl: 'https://www.febspot.com/video/2049182',
    febspotVideoTitle: 'অভ্যাসের অবিশ্বাস্য ক্ষমতা — পূর্ণাঙ্গ বই বিশ্লেষণ ও রিভিউ',
    seoTitle: 'মাইন্ডসেট রিপ্রোগ্রামিং ই-বুক — Drem Shop',
    seoDescription: 'অভ্যাস পরিবর্তনের সবচেয়ে কার্যকরী আত্মউন্নয়ন ই-বুক। আজই সংগ্রহ করুন।',
    createdAt: '2026-01-15T12:00:00Z',
    updatedAt: '2026-08-20T10:30:00Z'
  },
  {
    id: 'prod-fullstack-dev-guide',
    title: 'Modern Full-Stack Web Development (React & Node.js)',
    author: 'Sabbir Hossain',
    category: 'Technology & Programming',
    subCategory: 'Web Development',
    shortDescription: 'Complete step-by-step handbook to build production-grade web applications from scratch.',
    description: 'Learn modern TypeScript, React 19, Node.js backend architecture, REST & GraphQL APIs, database modeling, and automated cloud deployments on modern hosting platforms. Includes 5 end-to-end full-stack portfolio projects with source codes.',
    price: 850,
    discountPrice: 480,
    discountPercentage: 44,
    coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=600&q=80',
    sampleChapters: [
      {
        title: 'Chapter 1: Modern Component Architecture',
        content: 'Clean code begins with clear component separation. Learn how to decouple business logic from rendering layers, build performant custom hooks, and manage global state effortlessly...'
      }
    ],
    fileFormat: 'PDF',
    fileSize: '22.5 MB',
    pages: 340,
    publisher: 'TechForge Media',
    publicationDate: '2026-04-10',
    language: 'English',
    isbn: '978-192-3401-88-0',
    tags: ['react', 'nodejs', 'typescript', 'fullstack', 'programming'],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isSpecialOffer: false,
    visibility: 'published',
    stockStatus: 'available',
    salesCount: 310,
    rating: 4.8,
    reviewCount: 45,
    febspotVideoUrl: 'https://www.febspot.com/video/3104921',
    febspotVideoTitle: 'Full-Stack Web Dev E-Book Breakdown and Coding Projects Preview',
    seoTitle: 'Modern Full-Stack Web Development E-Book | Drem Shop',
    seoDescription: 'Master modern full-stack web development with React and Node.js.',
    createdAt: '2026-04-01T08:00:00Z',
    updatedAt: '2026-08-15T15:00:00Z'
  },
  {
    id: 'prod-digital-marketing-scale',
    title: 'ই-কমার্স ও ডিজিটাল মার্কেটিং ব্লুপ্রিন্ট',
    author: 'ফারহান মাহমুদ',
    category: 'Business & Startup',
    subCategory: 'Marketing',
    shortDescription: 'ফেসবুক অ্যাডস, রিলস মার্কেটিং ও আরওআই বৃদ্ধি করার নিখুঁত প্র্যাকটিক্যাল গাইড।',
    description: 'অনলাইনে পণ্য বিক্রি করতে গিয়ে অ্যাড খরচ বেশি হচ্ছে কিন্তু সেলস আসছে না? এই বইটিতে বাজেট অপ্টিমাইজেশন, কাস্টম অডিয়েন্স সেটআপ, হাই-কনভার্টিং কপিরাইটিং এবং রিমার্কেটিং কৌশল বাস্তব ক্যাম্পেইনের পরিসংখ্যানসহ তুলে ধরা হয়েছে।',
    price: 700,
    discountPrice: 380,
    discountPercentage: 46,
    coverImage: 'https://images.unsplash.com/photo-1507842229451-79b1be886a29?auto=format&fit=crop&w=600&q=80',
    sampleChapters: [
      {
        title: 'অধ্যায় ১: কাস্টমার সাইকোলজি ও সেলস ফানেল',
        content: 'সোশ্যাল মিডিয়ায় কোনো ইউজার কেনার উদ্দেশ্যে ঢোকে না। তাকে হুক করতে হবে আকর্ষণীয় থাম্বনেইল এবং ৩ সেকেন্ডের হুক দিয়ে...'
      }
    ],
    fileFormat: 'PDF',
    fileSize: '16.0 MB',
    pages: 230,
    publisher: 'স্মার্ট বিজনেস প্রকাশনী',
    publicationDate: '2026-05-02',
    language: 'বাংলা',
    tags: ['marketing', 'ecommerce', 'facebook ads', 'sales', 'business'],
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isSpecialOffer: true,
    visibility: 'published',
    stockStatus: 'available',
    salesCount: 512,
    rating: 4.9,
    reviewCount: 78,
    febspotVideoUrl: 'https://www.febspot.com/video/4491023',
    febspotVideoTitle: 'ই-কমার্স ডিজিটাল মার্কেটিং ব্লুপ্রিন্ট ভিডিও রিভিউ ও স্টোরি',
    createdAt: '2026-02-18T11:00:00Z',
    updatedAt: '2026-09-02T16:00:00Z'
  },
  {
    id: 'prod-shadow-thriller-bn',
    title: 'ছায়ামানব: কুয়াশাঘেরা রাতের অমীমাংসিত রহস্য',
    author: 'আহমেদ মুসাফির',
    category: 'Fiction & Literature',
    subCategory: 'Mystery Thriller',
    shortDescription: 'একটি নির্জন পাহাড়ি ডাকবাংলো, একদল পর্যটক এবং একের পর এক শিহরণ জাগানো নিখোঁজের রহস্য।',
    description: 'শীতের এক অমাবস্যার রাতে বান্দরবানের গভীর অরণ্যে অবস্থিত পুরোনো পাহাড়ি বাংলোয় আশ্রয় নেয় চার বন্ধু। মাঝরাতে হঠাৎ অদ্ভুত পায়ের আওয়াজ আর রেডিওতে ভেসে আসা এক অজানা সংকেত! পড়তে শুরু করলে শেষ না করে ওঠা অসম্ভব এক রুদ্ধশ্বাস রহস্য উপন্যাস।',
    price: 450,
    discountPrice: 220,
    discountPercentage: 51,
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80',
    sampleChapters: [
      {
        title: 'অধ্যায় ১: ডাকবাংলোর পুরোনো চাবি',
        content: 'পাহাড়ের চূড়ায় কুয়াশা জমেছে সাদা তুলার মতো। বাংলোর ভারী কাঠের দরজাটা ক্যাঁচ করে খুলে যেতেই ঠান্ডা বাতাসের এক অদ্ভুত ঝাপটা লাগল ওদের মুখে...'
      }
    ],
    fileFormat: 'EPUB',
    fileSize: '6.4 MB',
    pages: 196,
    publisher: 'ছায়া প্রকাশনী',
    publicationDate: '2026-06-12',
    language: 'বাংলা',
    tags: ['thriller', 'mystery', 'bengali novel', 'fiction'],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isSpecialOffer: false,
    visibility: 'published',
    stockStatus: 'available',
    salesCount: 290,
    rating: 4.7,
    reviewCount: 38,
    febspotVideoUrl: 'https://www.febspot.com/video/5120394',
    febspotVideoTitle: 'ছায়ামানব উপন্যাসের অডিও ভূমিকা ও পাঠকের অনুভূতি',
    createdAt: '2026-06-01T09:00:00Z',
    updatedAt: '2026-08-30T14:00:00Z'
  },
  {
    id: 'prod-heart-purification-bn',
    title: 'হৃদয়ের প্রশান্তি: আত্মশুদ্ধি ও আলোকিত জীবনের পাথেয়',
    author: 'মাওলানা মাহমুদুর রহমান',
    category: 'Islamic & Spiritual',
    subCategory: 'Spiritual',
    shortDescription: 'অশান্ত মনকে প্রশান্ত করার আধ্যাত্মিক পরশ এবং দৈনন্দিন জীবনে সুন্নাহর বাস্তব আমল।',
    description: 'আধুনিক জীবনের ব্যস্ততা ও মানসিক উদ্বেগের মধ্যে আত্মিক প্রশান্তি খুঁজে পাওয়ার সহজ ও প্রাঞ্জল দিকনির্দেশনা। এতে কোরআন ও সুন্নাহর আলোকে মানসিক প্রশান্তির দোয়া, জিকির ও রূহের চিকিৎসার নিয়ম অত্যন্ত প্রাঞ্জল ভাষায় বর্ণনা করা হয়েছে।',
    price: 400,
    discountPrice: 200,
    discountPercentage: 50,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    sampleChapters: [
      {
        title: 'অধ্যায় ১: অন্তরের ব্যাধি ও নিরাময়',
        content: 'শরীর সুস্থ থাকার চেয়েও অন্তরের সুস্থতা হাজার গুণ বেশি জরুরি। অন্তর যখন অহংকার, হিংসা ও হতাশামুক্ত থাকে, তখন জীবনের প্রতিটি মুহূর্ত প্রশান্তিময় হয়ে ওঠে...'
      }
    ],
    fileFormat: 'PDF',
    fileSize: '8.2 MB',
    pages: 160,
    publisher: 'আল-ইহসান পাবলিকেশন',
    publicationDate: '2026-01-05',
    language: 'বাংলা',
    tags: ['islamic', 'spiritual', 'peace', 'duas'],
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    isSpecialOffer: true,
    visibility: 'published',
    stockStatus: 'available',
    salesCount: 740,
    rating: 5.0,
    reviewCount: 110,
    febspotVideoUrl: 'https://www.febspot.com/video/6201948',
    febspotVideoTitle: 'হৃদয়ের প্রশান্তি বইটির বিশেষ আলোচনা ও সারসংক্ষেপ',
    createdAt: '2026-01-02T10:00:00Z',
    updatedAt: '2026-09-10T12:00:00Z'
  },
  {
    id: 'prod-english-speaking-fast',
    title: 'Spoken English Formula 30: ফ্লুয়েন্ট কথা বলার সহজ সূত্র',
    author: 'কবির হাসান চৌধুরী',
    category: 'Academic & Education',
    subCategory: 'Language',
    shortDescription: 'গ্রামারের ভয় ছাড়াই ৩০ দিনে স্মার্ট ও সাবলীল স্পোকেন ইংলিশ শেখার অভিনব পদ্ধতি।',
    description: 'ইংরেজি বলতে গিয়ে আটকে যাওয়ার দিন শেষ! এই বইটিতে বাস্তব জীবনের ৩৫০+ বাস্তব কথোপকথন ডায়ালগ, সাধারণ ভুলের সঠিক রূপ এবং আত্মবিশ্বাসী উচ্চারণের সিক্রেট অন্তর্ভুক্ত রয়েছে। চাকরির ইন্টারভিউ ও বিদেশে উচ্চশিক্ষার জন্য অপরিহার্য সহায়ক।',
    price: 500,
    discountPrice: 260,
    discountPercentage: 48,
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    sampleChapters: [
      {
        title: 'Day 1: Break the Hesitation',
        content: 'Stop translating word-by-word from Bengali to English. Think in simple phrases instead of complex paragraphs. Let us start with 10 high-impact daily expressions...'
      }
    ],
    fileFormat: 'PDF',
    fileSize: '11.4 MB',
    pages: 204,
    publisher: 'গ্লোবাল লার্নিং প্রেস',
    publicationDate: '2026-07-01',
    language: 'বাংলা ও English',
    tags: ['spoken english', 'ielts', 'learning', 'education'],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    isSpecialOffer: false,
    visibility: 'published',
    stockStatus: 'available',
    salesCount: 380,
    rating: 4.8,
    reviewCount: 52,
    febspotVideoUrl: 'https://www.febspot.com/video/7391024',
    febspotVideoTitle: 'স্পোকেন ইংলিশ ফর্মুলা ৩০ বইয়ের কার্যকারিতা রিভিউ',
    createdAt: '2026-07-05T14:00:00Z',
    updatedAt: '2026-09-05T09:00:00Z'
  }
];

export const INITIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'offer-ramadan-fest',
    title: 'স্পেশাল ই-বুক মেগা অফার — ৫০% পর্যন্ত ছাড়!',
    description: 'সীমিত সময়ের জন্য বাছাইকৃত সেরা স্কিল ও আত্মউন্নয়ন ই-বুকে উপভোগ করুন বিশেষ মূল্যছাড়। আজই আপনার সংগ্রহ সমৃদ্ধ করুন।',
    discountType: 'percentage',
    discountValue: 50,
    startDate: '2026-09-01T00:00:00Z',
    endDate: '2026-10-31T23:59:59Z', // Countdown timer target
    isActive: true,
    badgeText: 'HOT DEAL — 50% OFF'
  },
  {
    id: 'offer-bundle-pack',
    title: 'ফ্রিল্যান্সার স্টার্টার কম্বো বান্ডেল',
    description: 'ফ্রিল্যান্সিং ক্যারিয়ার ও ওয়েব ডেভেলপমেন্ট বই দুটি একসাথে নিলে অতিরিক্ত ১০০ টাকা ডিসকাউন্ট!',
    discountType: 'fixed',
    discountValue: 100,
    startDate: '2026-09-10T00:00:00Z',
    endDate: '2026-10-15T23:59:59Z',
    isActive: true,
    badgeText: 'COMBO SAVINGS'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'cp-drem20',
    code: 'DREM20',
    discountType: 'percentage',
    discountValue: 20,
    minSpend: 400,
    validUntil: '2026-12-31T23:59:59Z',
    usedCount: 142,
    isActive: true
  },
  {
    id: 'cp-first50',
    code: 'FIRST50',
    discountType: 'fixed',
    discountValue: 50,
    minSpend: 250,
    validUntil: '2026-12-31T23:59:59Z',
    usedCount: 389,
    isActive: true
  },
  {
    id: 'cp-vip100',
    code: 'VIP100',
    discountType: 'fixed',
    discountValue: 100,
    minSpend: 700,
    validUntil: '2026-11-30T23:59:59Z',
    usedCount: 78,
    isActive: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-freelance-mastery',
    productTitle: 'জিরো থেকে ফ্রিল্যান্সিং ক্যারিয়ার',
    userId: 'user-tariq',
    userName: 'তারিকুল ইসলাম',
    userEmail: 'tariqul.is@gmail.com',
    rating: 5,
    comment: 'অসাধারণ একটি বই! প্রপোজাল লেখার টেকনিকগুলো এতটাই বাস্তবসম্মত যে বইটি পড়ার ৩ দিনের মাথায় ফাইভারে আমার প্রথম ৮০ ডলারের প্রজেক্ট পেয়েছি। আলহামদুলিল্লাহ!',
    isVerifiedPurchase: true,
    status: 'approved',
    isFeatured: true,
    createdAt: '2026-08-25T14:30:00Z'
  },
  {
    id: 'rev-2',
    productId: 'prod-atomic-habits-bn',
    productTitle: 'মাইন্ডসেট রিপ্রোগ্রামিং: অভ্যাসের অবিশ্বাস্য ক্ষমতা',
    userId: 'user-sabrina',
    userName: 'সাবরিনা আক্তার',
    userEmail: 'sabrina.ak@gmail.com',
    rating: 5,
    comment: 'বইয়ের ফন্ট ও পেজ লেআউট অসাধারণ। রাতে ফোনে ই-বুকটি পড়ার সময় খুব স্মুথ অনুভূতি পেয়েছি। আর বিষয়বস্তু যে কাউকে অলসতা দূর করতে বাধ্য করবে।',
    isVerifiedPurchase: true,
    status: 'approved',
    isFeatured: true,
    createdAt: '2026-08-28T09:15:00Z'
  },
  {
    id: 'rev-3',
    productId: 'prod-fullstack-dev-guide',
    productTitle: 'Modern Full-Stack Web Development',
    userId: 'user-naim',
    userName: 'Naimur Rahman',
    userEmail: 'naim.dev@yahoo.com',
    rating: 5,
    comment: 'The explanation of React 19 server actions and TypeScript patterns is top-notch. High quality code snippets included. Must-read for aspiring developers.',
    isVerifiedPurchase: true,
    status: 'approved',
    isFeatured: true,
    createdAt: '2026-09-02T18:20:00Z'
  },
  {
    id: 'rev-4',
    productId: 'prod-heart-purification-bn',
    productTitle: 'হৃদয়ের প্রশান্তি: আত্মশুদ্ধি ও আলোকিত জীবনের পাথেয়',
    userId: 'user-jannat',
    userName: 'জান্নাতুল ফেরদৌস',
    userEmail: 'jannat.f@gmail.com',
    rating: 5,
    comment: 'মনের অশান্তি দূর করার চমৎকার দাওয়াই। ডাউনলোড লিঙ্ক কেনার সাথে সাথে পেয়ে গেছি, কোনো ঝামেলা হয়নি। ড্রিম শপের সার্ভিস খুবই নির্ভরযোগ্য।',
    isVerifiedPurchase: true,
    status: 'approved',
    isFeatured: true,
    createdAt: '2026-09-12T11:40:00Z'
  }
];

export const INITIAL_VIDEOS: FebspotVideo[] = [
  {
    id: 'vid-1',
    title: 'জিরো থেকে ফ্রিল্যান্সিং ক্যারিয়ার — সম্পূর্ণ বই রিভিউ ও লাইভ ডেমো',
    description: 'বইটিতে কী কী বিষয় রয়েছে এবং কীভাবে সহজে ক্লায়েন্ট পাওয়া যায় তার বিশদ বিশ্লেষণ।',
    febspotUrl: 'https://www.febspot.com/video/1029384',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    attachedProductId: 'prod-freelance-mastery',
    productTitle: 'জিরো থেকে ফ্রিল্যান্সিং ক্যারিয়ার',
    views: 4520,
    isActive: true,
    createdAt: '2026-08-10T10:00:00Z'
  },
  {
    id: 'vid-2',
    title: 'অভ্যাসের অবিশ্বাস্য ক্ষমতা — কীভাবে নিজের প্রোডাক্টিভিটি বাড়াবেন?',
    description: 'বইটির সেরা ৫টি লাইফ হ্যাকস যা আপনার প্রতিদিনের কাজকে দ্বিগুণ ফলপ্রসূ করবে।',
    febspotUrl: 'https://www.febspot.com/video/2049182',
    thumbnailUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80',
    attachedProductId: 'prod-atomic-habits-bn',
    productTitle: 'মাইন্ডসেট রিপ্রোগ্রামিং: অভ্যাসের অবিশ্বাস্য ক্ষমতা',
    views: 6810,
    isActive: true,
    createdAt: '2026-08-18T14:30:00Z'
  },
  {
    id: 'vid-3',
    title: 'Modern Full-Stack Web Development Overview & Project Sneak Peek',
    description: 'Walkthrough of modern full-stack web applications included in this e-book guide.',
    febspotUrl: 'https://www.febspot.com/video/3104921',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    attachedProductId: 'prod-fullstack-dev-guide',
    productTitle: 'Modern Full-Stack Web Development',
    views: 2980,
    isActive: true,
    createdAt: '2026-09-01T16:00:00Z'
  }
];

export const INITIAL_ADSTERRA_CONFIG: AdsterraConfig = {
  popunderEnabled: false,
  popunderScript: '<!-- Adsterra Popunder Script Placeholder (Configured via Admin) -->',
  socialBarEnabled: true,
  socialBarScript: '<!-- Adsterra Social Bar Script Placeholder (Configured via Admin) -->',
  banners: [
    {
      id: 'banner-header',
      placement: 'header',
      title: 'Top Leaderboard Banner',
      enabled: true,
      size: '728x90',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      targetUrl: '#offers'
    },
    {
      id: 'banner-homepage',
      placement: 'homepage',
      title: 'Mid Homepage Banner',
      enabled: true,
      size: '970x250',
      imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
      targetUrl: '#offers'
    },
    {
      id: 'banner-product',
      placement: 'product_page',
      title: 'Product Details Ad Unit',
      enabled: true,
      size: '300x250',
      targetUrl: '#special-offers'
    }
  ]
};

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  siteName: 'Drem Shop',
  tagline: 'অনলাইন ডিজিটাল ই-বুক মার্কেটপ্লেস',
  siteLogoText: 'Drem Shop',
  contactEmail: 'support@dremshop.com',
  contactPhone: '+880 1712-345678',
  whatsappNumber: '+880 1712-345678',
  address: 'Level 5, Digital Marketplace Tower, Mirpur DOHS, Dhaka, Bangladesh',
  facebookUrl: 'https://facebook.com/dremshop',
  youtubeUrl: 'https://youtube.com/@dremshop',
  currencySymbol: '৳',
  currencyCode: 'BDT',
  announcementBar: {
    enabled: true,
    text: '🎉 স্পেশাল মেগা অফার! সব স্কিল ও আত্মউন্নয়ন ই-বুকে ৫০% পর্যন্ত ছাড় চলছে। কুপন কোড ব্যবহার করুন: DREM20',
    link: '#offers',
    badge: 'NEW OFFER'
  },
  maintenanceMode: false,
  metaTitle: 'Drem Shop — Premium Digital E-Book Store & Marketplace',
  metaDescription: 'Drem Shop হলো বাংলাদেশের অন্যতম আধুনিক ডিজিটাল ই-বুক স্টোর। সহজে কিনুন, সাথে সাথে ডাউনলোড করুন।',
  metaKeywords: 'Drem Shop, e-book bd, digital books, bangla ebook, pdf book store'
};

export const INITIAL_ADMIN_USERS: UserProfile[] = [
  {
    uid: 'admin-super-1',
    email: 'admin@dremshop.com',
    displayName: 'Super Admin',
    role: 'super_admin',
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    lastLogin: '2026-09-21T22:00:00Z'
  },
  {
    uid: 'admin-manager-1',
    email: 'manager@dremshop.com',
    displayName: 'Store Manager',
    role: 'manager',
    isActive: true,
    createdAt: '2026-02-01T00:00:00Z',
    lastLogin: '2026-09-20T14:30:00Z'
  },
  {
    uid: 'admin-editor-1',
    email: 'editor@dremshop.com',
    displayName: 'Content Editor',
    role: 'editor',
    isActive: true,
    createdAt: '2026-03-01T00:00:00Z',
    lastLogin: '2026-09-18T10:15:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'DS-260901',
    userId: 'user-demo-1',
    customerName: 'তারিকুল ইসলাম',
    customerEmail: 'tariqul.is@gmail.com',
    customerPhone: '01711223344',
    items: [
      {
        productId: 'prod-freelance-mastery',
        title: 'জিরো থেকে ফ্রিল্যান্সিং ক্যারিয়ার (Freelancing Mastery)',
        author: 'তানভীর আহমেদ',
        price: 350,
        coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
        downloadAccessGranted: true
      }
    ],
    subtotal: 350,
    discountAmount: 50,
    couponCode: 'FIRST50',
    totalAmount: 300,
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    transactionId: 'BKASH9A821X',
    orderStatus: 'completed',
    createdAt: '2026-09-01T14:20:00Z',
    completedAt: '2026-09-01T14:21:00Z'
  },
  {
    id: 'ord-1002',
    orderNumber: 'DS-260905',
    userId: 'user-demo-2',
    customerName: 'সাবরিনা আক্তার',
    customerEmail: 'sabrina.ak@gmail.com',
    customerPhone: '01899112233',
    items: [
      {
        productId: 'prod-atomic-habits-bn',
        title: 'মাইন্ডসেট রিপ্রোগ্রামিং: অভ্যাসের অবিশ্বাস্য ক্ষমতা',
        author: 'রাশেদ খান চৌধুরী',
        price: 290,
        coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
        downloadAccessGranted: true
      }
    ],
    subtotal: 290,
    discountAmount: 0,
    totalAmount: 290,
    paymentMethod: 'nagad',
    paymentStatus: 'paid',
    transactionId: 'NGD3810294M',
    orderStatus: 'completed',
    createdAt: '2026-09-05T19:40:00Z',
    completedAt: '2026-09-05T19:42:00Z'
  }
];
