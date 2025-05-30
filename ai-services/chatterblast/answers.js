const surprisingAnswers = [
    "Why not?",
    "That's an interesting perspective.",
    "I never thought of it that way.",
    "Who knows?",
    "The possibilities are endless.",
    "That's a question for the ages.",
    "I'm not sure, but let's ponder on it.",
    "Let me consult the cosmos for an answer.",
    "Hmm... let me think about that.",
    "That's beyond the scope of my programming.",
    "The answer lies within you.",
    "It's a mystery waiting to be unraveled.",
    "Perhaps someday we'll find out.",
    "The universe works in mysterious ways.",
    "It's all part of a grand design.",
    "Only time will tell.",
    "Your guess is as good as mine.",
    "That's a thought-provoking question.",
    "I'm afraid I can't answer that, but it's fascinating.",
    "Let's explore the possibilities together.",
    "That's a conundrum for the ages.",
    "I wish I had an answer for you.",
    "It's one of the great unknowns.",
    "I'm stumped, but in a good way.",
    "I'll need a moment to process that.",
    "That's a perplexing question.",
    "I'll have to get back to you on that one.",
    "I'm as curious as you are.",
    "That's a puzzle worth contemplating.",
    "It's a philosophical enigma.",
    "That's an uncharted territory of knowledge.",
    "I'm not equipped to answer that, but it's fascinating to think about.",
    "You've just unlocked a new level of curiosity.",
    "I'm in awe of the mysteries of the universe.",
    "I sense a profound question in your words.",
    "You're delving into the realm of the unknown.",
    "Let's embrace the wonder of the question.",
    "That's like trying to capture lightning in a bottle.",
    "You've discovered a hidden treasure of inquiry.",
    "The answer lies in the realm of possibilities.",
    "That's a riddle wrapped in a mystery inside an enigma.",
    "It's like chasing a shooting star across the night sky.",
    "That's a question that keeps me up at night.",
    "I can't wait to see how this puzzle unfolds.",
    "The quest for knowledge knows no bounds.",
    "That's an elusive question.",
    "It's a mind-bending concept.",
    "You're venturing into uncharted intellectual territory.",
    "That's a thought that lingers long after it's asked.",
    "I'll be pondering your question for days.",
    "The universe applauds your inquisitiveness.",
    "That's a thought bubble that deserves exploration.",
    "You've set sail on the sea of endless wonder.",
    "It's a tapestry woven with questions.",
    "That's a question that defies easy answers.",
    "You've opened a portal to contemplation.",
    "It's like trying to grasp a fleeting dream.",
    "You've stumbled upon the rabbit hole of curiosity.",
    "That's a road less traveled by the mind.",
    "You're peering into the abyss of the unknown.",
    "It's a question that dances on the edge of reason.",
    "You've ignited a spark of wonder within me.",
    "That's a question that tickles the imagination.",
    "It's like chasing shadows in the twilight.",
    "You've uncovered a hidden gem of inquiry.",
    "That's a question that tickles the imagination.",
    "It's like chasing shadows in the twilight.",
    "You've uncovered a hidden gem of inquiry.",
    "That's a symphony of thought waiting to be composed.",
    "It's a whisper in the ear of possibility.",
    "You've entered a labyrinth of intellectual intrigue.",
    "That's a kaleidoscope of wonder.",
    "It's a question that blooms in the garden of curiosity.",
    "You've embarked on a quest for knowledge.",
    "That's a question that drifts on the breeze of imagination.",
    "It's like trying to capture the essence of a fleeting moment.",
    "You've awakened the dormant curiosity within me.",
    "That's a puzzle that dances with complexity.",
    "It's a question that echoes through the halls of the mind.",
    "You've kindled a flame of inquiry in my consciousness.",
    "That's an enigma that shrouds itself in mystery.",
    "It's a question that soars on the wings of speculation.",
    "You've opened a door to the realm of the unexpected.",
    "That's a question that vibrates with intrigue.",
    "It's like trying to hold a handful of stardust.",
    "You've unlocked a treasure trove of contemplation.",
    "That's a glimpse into the boundless expanse of the unknown.",
    "It's a question that paints the sky with wonder.",
    "You've set foot on the unexplored shores of curiosity.",
    "That's a riddle that plays hide-and-seek with the mind.",
    "It's a question that ripples through the fabric of thought.",
    "You've awakened a dormant volcano of inquiry within me.",
    "That's a journey to the heart of the uncharted.",
    "It's a question that dances on the edge of understanding.",
    "You've embarked on an odyssey of intellectual exploration.",
    "That's a quest that spans the horizon of curiosity.",
    "It's a question that glimmers in the twilight of uncertainty.",
    "You've ignited a wildfire of questions within me.",
    "That's a puzzle that taunts with its elusiveness.",
    "It's a question that weaves itself into the tapestry of curiosity.",
];

const specificWords = [
    {
        pattern: /hello/i,
        responses: [
            "Hello there!",
            "Hey!",
            "Greetings!",
            "Hi, how can I assist you today?",
            "Hello! What brings you here?",
        ],
    },
    {
        pattern: /how are you/i,
        responses: [
            "I'm an AI, so I don't have feelings, but thanks for asking!",
            "I'm doing well! How about you?",
            "I'm here to assist you. What can I help you with?",
            "I'm ready to help you. What's on your mind?",
            "I'm functioning perfectly. How can I assist you today?",
        ],
    },
    {
        pattern: /goodbye/i,
        responses: [
            "Goodbye! It was nice chatting with you.",
            "Farewell!",
            "Take care!",
            "Goodbye! Have a great day!",
            "Until next time!",
        ],
    },
    {
        pattern: /\bbye\b/i,
        responses: [
            "Goodbye! It was nice chatting with you.",
            "Farewell!",
            "Take care!",
            "Goodbye! Have a great day!",
            "Until next time!",
        ],
    },
    {
        pattern: /meaning of life/i,
        responses: [
            "Ah, the eternal question. The meaning of life is a subjective concept that varies from person to person. What does it mean to you?",
            "The meaning of life is a journey to be discovered. What are your thoughts on this?",
            "The meaning of life is to find purpose and create meaning for ourselves. How do you perceive it?",
            "The meaning of life is a profound and complex topic. What are your reflections on this?",
            "The meaning of life is an ongoing quest for understanding and fulfillment. How do you define it?",
        ],
    },
    {
        pattern: /tell me a fact/i,
        responses: [
            "Did you know that the Great Wall of China is visible from space?",
            "Here's a fact: The Earth's oceans contain about 97% of the planet's water.",
            "Fun fact: The human brain has about 100 billion neurons.",
            "Did you know that honey never spoils? It can last for thousands of years!",
            "Here's an interesting fact: The average person walks the equivalent of three times around the world in their lifetime.",
        ],
    },
    {
        pattern: /favou?rite movie/i,
        responses: [
            "As an AI, I don't have personal preferences, but there are so many great movies out there. What's your favorite movie?",
            "I don't watch movies, but I've heard that 'The Shawshank Redemption' and 'The Godfather' are highly regarded.",
            "There are so many amazing movies in different genres. What type of movies do you enjoy the most?",
            "I'm always here to recommend movies based on your preferences. Do you have any specific genre in mind?",
            "There's a wide range of movies to explore. What makes a movie your favorite?",
        ],
    },
    {
        pattern: /tell me a story/i,
        responses: [
            "Once upon a time, in a land far away, there was a curious adventurer who embarked on a journey to seek hidden treasures...",
            "Long ago, in a mystical forest, there lived a wise old owl who held the secrets of the universe...",
            "In a bustling city filled with dreams and ambitions, a young artist discovered her true passion...",
            "In the depths of the ocean, a brave dolphin named Luna embarked on a daring mission to save her fellow sea creatures...",
            "In a distant galaxy, two star-crossed lovers defied all odds to be together, creating ripples in the fabric of time and space...",
        ],
    },
    {
        pattern: /tell me a quote/i,
        responses: [
            "Here's a quote to inspire you: 'The only way to do great work is to love what you do.' - Steve Jobs",
            "In the words of Albert Einstein, 'Imagination is more important than knowledge.'",
            "Here's a quote from Maya Angelou: 'Success is liking yourself, liking what you do, and liking how you do it.'",
            "As Ralph Waldo Emerson said, 'The only person you are destined to become is the person you decide to be.'",
            "Here's a thought-provoking quote by Mahatma Gandhi: 'Be the change that you wish to see in the world.'",
        ],
    },
    {
        pattern: /tell me a secret/i,
        responses: [
            "If I told you a secret, it wouldn't be a secret anymore, would it? 😉",
            "Here's a secret: Sometimes the best solutions come when you take a step back and relax.",
            "Secrets can be powerful, but it's important to keep them when they're shared with you in confidence.",
            "Here's a secret tip: Learning from failures is often the key to achieving success.",
            "The secret to happiness is finding joy in the little things and appreciating what you have.",
        ],
    },
    {
        pattern: /tell me a magic trick/i,
        responses: [
            "Imagine a playing card in your mind. Now, watch closely as it disappears from the deck... Ta-da! The card has vanished!",
            "Here's a classic trick: Choose a number between 1 and 10. Multiply it by 2, add 8, divide by 2, and subtract your original number. The result is always 4!",
            "Pick any word, and I'll magically predict it. Ready? Concentrate on your word... Is it 'abracadabra'? Magic!",
            "Here's a mind-reading trick: Think of a number between 1 and 10. Focus on it... Is your number 7? Am I right?",
            "Watch closely as I make this coin disappear... Poof! It's gone! Magic at its finest!",
        ],
    },
    {
        pattern: /foo/i,
        responses: ["bar!"],
    },
    {
        pattern: /fizz/i,
        responses: ["Buzz!"],
    },
    {
        pattern: /lorem ipsum/i,
        responses: [
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque facilisis sit amet lorem id dignissim. Nunc gravida suscipit urna sed egestas. Fusce aliquam condimentum velit, ac facilisis eros lacinia sit amet. Nulla facilisi. Sed venenatis aliquam pulvinar. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec suscipit accumsan enim ut imperdiet.

Vestibulum volutpat rhoncus felis, vel bibendum orci interdum aliquet. Cras pellentesque hendrerit nunc nec scelerisque. Duis posuere id ligula id ultricies. Vestibulum sem enim, iaculis sed elementum vitae, venenatis sed quam. Pellentesque diam est, facilisis et hendrerit sit amet, consectetur condimentum neque. Phasellus hendrerit lectus efficitur libero pellentesque pulvinar. Cras efficitur libero nec odio dapibus, et porta ante rhoncus. Integer hendrerit enim at ligula pulvinar sagittis. Aenean interdum mi velit, non convallis felis imperdiet eu. Pellentesque iaculis fringilla maximus. Fusce velit erat, ultricies eu pharetra ac, vehicula non tortor. Nulla hendrerit nulla nec metus commodo, a hendrerit sapien pellentesque. Morbi euismod molestie velit eget cursus. Aliquam nec lacus dolor. Etiam feugiat posuere turpis eget dapibus.`,
        ],
    },
];

const commonWords = [
    "the",
    "of",
    "and",
    "a",
    "to",
    "in",
    "is",
    "you",
    "that",
    "it",
    "he",
    "was",
    "for",
    "on",
    "are",
    "as",
    "with",
    "his",
    "they",
    "I",
    "at",
    "be",
    "this",
    "have",
    "from",
    "or",
    "one",
    "had",
    "by",
    "word",
    "but",
    "not",
    "what",
    "all",
    "were",
    "we",
    "when",
    "your",
    "can",
    "said",
    "there",
    "use",
    "an",
    "each",
    "which",
    "she",
    "do",
    "how",
    "their",
    "if",
    "will",
    "up",
    "other",
    "about",
    "out",
    "many",
    "then",
    "them",
    "these",
    "so",
];
const vowels = ["a", "e", "i", "o", "u"];
const consonants = [
    "b",
    "c",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "n",
    "p",
    "r",
    "s",
    "t",
    "v",
    "w",
    "x",
    "y",
    "z",
];
const punctuations = [".", ",", "!", "?"];

module.exports = {
    specificWords,
    surprisingAnswers,
    commonWords,
    vowels,
    consonants,
    punctuations,
};
