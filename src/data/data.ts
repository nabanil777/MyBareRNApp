import { LOCAL_IMAGES } from './localImages';

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  imageSource?: any;
  videoUrl?: string;
  type: 'image' | 'video';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  iconName: 'heart' | 'star' | 'coffee' | 'camera' | 'flight';
}

export const ANNIVERSARY_DATE = '2026-05-31T00:00:00'; // 31-05-2026 12 AM (Midnight)

export const LOVE_QUOTES = [
  "In your smile, I see something more beautiful than the stars.",
  "Every step we take has brought us exactly where we were meant to be: together.",
  "You are my today, my tomorrow, and my forever.",
  "Loved you yesterday, love you still, always have, always will.",
  "The best thing to hold onto in life is each other.",
  "I love you not only for what you are, but for what I am when I am with you.",
  "If I know what love is, it is because of you.",
  "Every love story is beautiful, but ours is my favorite.",
];

const MEMORY_TITLES = [
  "A Whisper of Spring", "Golden Hour Echoes", "Warm Coffee & Laughs", 
  "Under the Canopy of Stars", "Chasing Sunsets Together", "Strolling in the Rain",
  "A Cozy Afternoon Reading", "Seaside Dreams", "Autumn Leaf Walk",
  "Warm Fireplace Smiles", "Laughter in the Kitchen", "Midnight Road Trips",
  "The Magic of Your Smile", "Hand in Hand Always", "Secret Picnic Spot",
  "Vintage Film Moments", "A Stolen Kiss", "Dreaming of the Future",
  "Your Joyful Echo", "Soft Evening Chills", "The Sound of Your Voice",
  "Quiet Morning Tea", "A Promise of Together", "Splashes in the Waves",
  "Through the Forest Pathways", "Dappled Sunbeams on You", "Shared Umbrella Chats",
  "The Warmth of Coffee Mugs", "Shadows on the Sand", "Our Secret Hideaway",
  "Stargazing in Midsummer", "A Winter Hug", "Vintage Love Notes",
  "Dancing in the Living Room", "Reflections in the Puddle", "Drawn to Your Eyes",
  "Candlelit Conversations", "Sweet Dreamy Mornings", "A Breath of Fresh Air",
  "Holding Your Hand Tight", "Windswept Hair & Laughter", "Sunset Over the Hills",
  "Baking Sweet Delights", "Quiet Cuddles at Dawn", "Under the Neon Lights",
  "A Picture-Perfect Memory", "Our Endless Story"
];

const MEMORY_DESCRIPTIONS = [
  "Capturing these beautiful moments in motion. A short snippet of happiness, laughter, and your eyes.",
  "We sat together for hours, talking about everything and absolutely nothing.",
  "Walking hand in hand through the streets, laughing at silly stories and sharing silent smiles.",
  "The sunset fading behind the hills as we count our stars in the stillness.",
  "Every simple second with you becomes a treasured memory saved in my heart.",
  "The way you look when you're laughing is my absolute favorite sight in the world.",
  "Warm mugs, soft blankets, and your voice making the cold day feel like midsummer."
];

export const STORIES_timeline: Memory[] = Object.keys(LOCAL_IMAGES).map((key) => {
  const num = parseInt(key, 10);
  const title = MEMORY_TITLES[(num - 1) % MEMORY_TITLES.length];
  const description = MEMORY_DESCRIPTIONS[(num - 1) % MEMORY_DESCRIPTIONS.length];
  
  // Generate dates starting June 01, 2026, separated by 2 days each
  const dateObj = new Date('2026-06-01');
  dateObj.setDate(dateObj.getDate() + (num - 1) * 2);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });

  return {
    id: String(num),
    title: title,
    description: description,
    date: formattedDate,
    imageSource: LOCAL_IMAGES[num],
    type: 'image',
  };
});

export const MILESTONES: Milestone[] = [
  {
    id: '1',
    title: 'A Dream in the Cafe ☕',
    description: 'I saw Vidushi for the first time in the Supreme Court cafeteria. I walked in, looked to my left, and there she was sitting on the third row—looking like a dream, a total manifestation. I couldn\'t pull my eyes away, and I saw her looking back at me; my heart was full just gazing at her. We left after a while, but as I walked out, I realized: if I don\'t say HI, it\'s going to be a lifetime waste. I went back, peeped inside, and saw she was looking for me too. I waved, and she waved back with a smile that could cure the deadliest diseases in the world. BAM! It was done. It made my day.',
    date: 'May 25, 2026 • 4:00 PM',
    iconName: 'coffee',
  },
  {
    id: '2',
    title: 'Stammering Hearts & Commutes 🚇',
    description: 'I arrived at the Supreme Court cafeteria a bit late, hoping against hope of seeing her. With a pounding heart, I walked in and looked to the right. There she was. Our eyes locked, and we smiled. Even as I sat with my colleagues, we spoke a thousand words just through our eyes. Rushing back to talk to her later, we bumped right into each other at the gate. I was stammering, she was beautiful; I was lost in my head, she was still beautiful. I learned her name was Vidushi and that she stayed in Karol Bagh, directly on my route. (Secretly, even if she stayed on the opposite side of the world, it would still fall in my route only, because this girl was my destination). We met at the metro station, her deep eyes drowning me so completely that I couldn\'t hear anything. When she got down, I watched her walk away, planning on seeing her again tomorrow.',
    date: 'May 26, 2026 • 4:50 PM',
    iconName: 'flight',
  },
  {
    id: '3',
    title: 'Our First Kiss under CP Stars 💋',
    description: 'It has been a few days, and this beautiful person is still in my life—a reality, not a dream. We went to Connaught Place (CP) for dinner and sat outside. As we talked, she came close, I came close, and our lips touched for the first time. It was magic. Her lips felt as soft as a cloud. We kissed twice more, knowing it was just the beginning of a lifetime together. Over Chinese food (which we both love), I wondered if she was privately curated and sent from heaven just for me. Dropping her back to her PG, my heart sang of her beauty.',
    date: 'May 31, 2026',
    iconName: 'heart',
  },
  {
    id: '4',
    title: 'The Second Floor Becomes Home 🏡',
    description: 'She was officially my girlfriend now—how did I get so lucky? She came to stay for the weekend. When she walked onto the second floor of the Prajapati residence, she made the space hers. It was always meant to be hers; the house finally felt like a Home. We shared the next few days in our own beautiful world—unconditional warmth, quiet showers, shared meals, and the absolute realization that she was mine. I wanted to scream it to the entire world.',
    date: 'June 05, 2026',
    iconName: 'heart',
  },
  {
    id: '5',
    title: 'First Movie Date & Pani Puri 🎬',
    description: 'Our first movie date watching \'Obsession\'. It was a horror flick, but with her, everything was pure joy. We came home and recorded two beautiful videos together—a core memory created. Later, I ran out to get her favorite Pani Puri. Seeing her enjoy it made everything worth it. I would die for her, but more than anything, I want to live for her, with her. Cheers to many more dates.',
    date: 'June 20, 2026',
    iconName: 'camera',
  },
  {
    id: '6',
    title: 'My Permanent Choice 💍',
    description: 'She was leaving for Rewa at 10.05 PM. We spent the day pretending our hearts weren\'t breaking. We watched \'Tamasha\' (my favorite film, and she sat and loved it with me). I had sent her a letter at 6 PM, and as she read it at the corner of the bed, tears in her eyes, I proposed to her with a ring. She said YES. She was my permanent. I gave her the Golden Elephant key so she would never feel alone. We shared happy tears, had Chinese at Himalaya Sagar, and took the metro to Anand Vihar. She spoke to my mother for the first time, radiating pure joy. As her train pulled away, our waves and smiles carried an unshakeable confidence in us. The distance only grows our love. Long distance, we are ready.',
    date: 'June 28, 2026',
    iconName: 'star',
  },
];
