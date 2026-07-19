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
    description: 'I saw Vidushi for the first time in the Supreme Court cafeteria. I walked in, looked to my left, and there she was sitting on the third row—looking like a dream, a total manifestation. I couldn\'t pull my eyes away, and I saw her looking back at me as well. My heart was full just looking at her. We left after a while, but as I walked out, I realized: if I don\'t say HI, it\'s going to be a lifetime waste. I went back, peeped inside, and saw she was looking for me too. I waved, and she waved back with a smile that could cure the deadliest diseases in the world. BAM! It was done. It made my day.',
    date: 'May 25, 2026 • 4:00 PM',
    iconName: 'coffee',
  },
  {
    id: '2',
    title: 'Stammering Hearts & Commutes 🚇',
    description: 'I arrived at the Supreme Court cafeteria a bit late, hoping against hope of seeing her. But what were the chances? Why would she still be there, and even if she was, why would she wait for me? Is it possible, or am I dreaming too much? With all these questions in my mind and a pounding heart, I stepped inside and looked to the right. There she was, looking back at me. Our eyes locked and we smiled. Even as I sat with my colleagues, we spoke a thousand words just through our eyes; her beautiful smile was melting me slowly. When it was time to leave, I left early but rushed back to talk to her. Just at the gate, we bumped right into each other. We both stopped, but a beautiful story started. I was anxious and stammering, she was beautiful; I was lost in my head, she was still beautiful. I learned her name was Vidushi, and it was the most beautiful name I had ever heard. I found out she stayed in Karol Bagh, which just happened to fall directly on my route. (Secretly, even if she stayed on the opposite side of the world, it would still fall on my path because this girl was my destination). We met at the metro station, and as we talked, I couldn\'t hear a thing; her eyes were too deep, and I felt like drowning in them. As she got down, I watched her walk away. Was it all a dream? If it was, why was I already planning to see her again tomorrow?',
    date: 'May 26, 2026 • 4:50 PM',
    iconName: 'flight',
  },
  {
    id: '3',
    title: 'Our First Kiss under CP Stars 💋',
    description: 'It has been a few days, and it proved to be a beautiful reality, not a dream. This gorgeous girl is still with me, and we went to Connaught Place (CP) for dinner. We sat at the street-side seating area, talking, and then we shared our very first kiss. She came close, I came close, and our lips touched. It was magic. Her lips felt as soft as a cloud. We kissed twice more, yet it felt like the kiss had only just begun and would last a lifetime. As the evening flew by, I got to know she loved Chinese food just like I do. Was she privately curated in heaven and sent to me? I don\'t even know how the food tasted—everything felt perfect being with her. She was so incredibly beautiful. I dropped her back to her PG, and she looked stunning. When I came back home, all I could think of was her—sweet lord, she is so beautiful.',
    date: 'May 31, 2026',
    iconName: 'heart',
  },
  {
    id: '4',
    title: 'The Second Floor Becomes Home 🏡',
    description: 'She came into my life, officially as my girlfriend now—how did I get so lucky? My mother had left the day before, so my home was empty. She came to stay with me over the weekend; I was a mix of nervous and excited as she stepped onto the second floor of the Prajapati residence and made it hers. It was always meant to be hers; the place finally felt like a Home. Over the next two to three days, so much happened—things flew, we shared meals, soft touches, intimate moments, not-so-lonely showers, and shared laughter. She was completely mine, and I wanted to scream it to the entire world.',
    date: 'June 05, 2026',
    iconName: 'heart',
  },
  {
    id: '5',
    title: 'First Movie Date & Pani Puri 🎬',
    description: 'Our first movie date watching \'Obsession\'—a horror movie, but everything is pure joy and fun with her. After the movie, we came back home and created two beautiful videos together on my phone. They were absolutely beautiful—a core memory created. We sat and talked, then I went out to get her favorite Pani Puri just the way she likes it. She waited at home, and seeing her enjoy the food made everything worth it. She deserves the absolute best, she is beautiful and she is mine. Watching her eat made my day; I would die for her, but more than anything, I want to live for her and build a life with her. Cheers to many more dates.',
    date: 'June 20, 2026',
    iconName: 'camera',
  },
  {
    id: '6',
    title: 'My Permanent Choice 💍',
    description: 'She was leaving for Rewa today on the 10:05 PM train. We spent the day pretending that it wasn\'t breaking us. We ate and watched \'Tamasha\' together; she was so lovely to sit and enjoy my favorite film with me. She was leaving, but I already had plans—I wrote a special piece, ordered a ring, and planned to give her the Golden Elephant key so she would never feel alone. Around 6:00 PM, I sent her the email. She sat at the corner of the bed, reading it and crying. Ring in hand, I hugged her, and as she cried, I proposed and asked her to be my permanent. She said YES. She was my permanent choice. I gave her the Golden Elephant. I cried my heart out, already missing her terribly. We had Chinese—our absolute favorite—at Himalaya Sagar, and then headed to Anand Vihar. We had a blast in the metro, laughing so much, and that was the day she spoke to my mother for the first time. I remember how happy she was. My Vidushi, I love her. I waved until her train cleared the platform, and she waved back. Our parting smiles carried a deep confidence in our bond that nothing could shake. As the distance grew, my love for her only multiplied. We are moving into a long-distance phase, and we are ready. :)',
    date: 'June 28, 2026',
    iconName: 'star',
  },
  {
    id: '7',
    title: 'The Long Journey Back 🎒',
    description: 'She was moving from Rewa back to Hyderabad today, heading back to college. She had a lot of luggage with her—five bags, to be precise. Yes, her brother would be there to help, but only until Nagpur. After that, she would have to manage all of it completely on her own, traveling from Nagpur to Secunderabad and then onwards to Mamidipalli. I know she can do it; she has always been strong and independent, and she doesn\'t need anyone to rescue her. Yet, my heart asks: why does she have to carry it all alone? She deserves to be treated like the queen of my world. Sitting here in my office, I felt so helpless, worried, and found myself praying to the gods to protect her and help her along the way. Why does she make me feel so protective and concerned? My love for her has grown in folds. Now she is even further away—from 600 kms to 1600 kms. It is no longer possible for me to just board an overnight train and reach her; this distance demands planning. But the beautiful part is that nothing has changed. The yearning has only intensified, and my love configures new heights. She is the apple of my eye, and I finally truly understand the Bengali proverb \'Chokkhe harano\'—the fear of losing sight of someone so precious. Wherever she goes, she will have me; the mode of communication will change, but our love will only increase. We are moving into a new phase: me in my office, her in her hostel and college. I am so ready for it, and I love her so much.',
    date: 'July 14, 2026',
    iconName: 'flight',
  },
  {
    id: '8',
    title: 'A Safe Haven in the Screen 📱',
    description: 'She is still in college, and I have moved to Kolkata for three to four days. But why doesn\'t it feel like home? Why does it not feel like a homecoming? Why does my heart scream for Hyderabad? I guess home was never a physical place; it was always a person. I have finally found my Home, and yet I am away from her—my Vidushi, my home. I wasn\'t feeling well the entire day, and the heavy burden of responsibilities came crashing down on me the moment I reached. I was either cooped up in my room or running around to get chores done. But she sensed it. She saw I was struggling, and she chose not to leave my side over video call, not even for a single moment. I felt safe, and that gave me the energy to carry on. I asked her if she could stay on video call with me the entire night because I needed her. She agreed immediately when I asked. What have I done to deserve such care from a lovely lady like her? She stayed on the call all night. I woke up multiple times, only to find her sleeping peacefully right next to me on the screen. When I woke up the next morning, she was still there. I love her so much, and I pray to God to protect this precious, beautiful lady from everything. She is so precious to me. Here is to many more nights of sleeping together virtually, until we can finally sleep next to each other in person again. My Vidushi. My love.',
    date: 'July 17, 2026',
    iconName: 'heart',
  },
];
