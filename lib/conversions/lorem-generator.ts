/**
 * Lorem Ipsum Generator Logic
 * Feature: 001-dev-tools-suite / User Story 7
 */

// Traditional Lorem Ipsum corpus
const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'et', 'aut', 'unde',
  'omnis', 'iste', 'natus', 'error', 'accusantium', 'doloremque', 'laudantium',
  'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore',
  'veritatis', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'explicabo',
  'nemo', 'ipsam', 'quia', 'voluptas', 'aspernatur', 'odit', 'fugit', 'sed',
  'quia', 'consequuntur', 'magni', 'dolores', 'eos', 'qui', 'ratione', 'sequi',
  'nesciunt', 'neque', 'porro', 'quisquam', 'dolorem', 'adipisci', 'numquam',
  'eius', 'modi', 'tempora', 'incidunt', 'magnam', 'quam', 'nihil', 'molestiae'
];

export type LoremUnit = 'words' | 'sentences' | 'paragraphs';

/**
 * Generate Lorem Ipsum text by words
 */
export function generateWords(count: number): string {
  if (count < 1 || count > 10000) {
    throw new Error('Word count must be between 1 and 10,000');
  }

  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    const word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
    // Capitalize first word
    words.push(i === 0 ? capitalize(word) : word);
  }

  return words.join(' ') + '.';
}

/**
 * Generate Lorem Ipsum text by sentences
 */
export function generateSentences(count: number): string {
  if (count < 1 || count > 1000) {
    throw new Error('Sentence count must be between 1 and 1,000');
  }

  const sentences: string[] = [];
  for (let i = 0; i < count; i++) {
    // Each sentence: 8-15 words
    const wordCount = Math.floor(Math.random() * 8) + 8;
    const words: string[] = [];
    
    for (let j = 0; j < wordCount; j++) {
      const word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
      words.push(j === 0 ? capitalize(word) : word);
    }
    
    sentences.push(words.join(' ') + '.');
  }

  return sentences.join(' ');
}

/**
 * Generate Lorem Ipsum text by paragraphs
 */
export function generateParagraphs(count: number): string {
  if (count < 1 || count > 100) {
    throw new Error('Paragraph count must be between 1 and 100');
  }

  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    // Each paragraph: 4-8 sentences
    const sentenceCount = Math.floor(Math.random() * 5) + 4;
    const sentences: string[] = [];
    
    for (let j = 0; j < sentenceCount; j++) {
      const wordCount = Math.floor(Math.random() * 8) + 8;
      const words: string[] = [];
      
      for (let k = 0; k < wordCount; k++) {
        const word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
        words.push(k === 0 ? capitalize(word) : word);
      }
      
      sentences.push(words.join(' ') + '.');
    }
    
    paragraphs.push(sentences.join(' '));
  }

  return paragraphs.join('\n\n');
}

/**
 * Generate Lorem Ipsum based on unit type
 */
export function generateLorem(count: number, unit: LoremUnit): string {
  switch (unit) {
    case 'words':
      return generateWords(count);
    case 'sentences':
      return generateSentences(count);
    case 'paragraphs':
      return generateParagraphs(count);
    default:
      throw new Error(`Unsupported unit: ${unit}`);
  }
}

/**
 * Capitalize first letter of a word
 */
function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
